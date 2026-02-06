// Smart Card Selection Algorithm
// State-driven filtering + weighted randomization

/**
 * Main card selection function
 * @param {GameState} gameState - Current game state
 * @param {Array} allCards - All available cards
 * @returns {Object} Selected card
 */
export function selectNextCard(gameState, allCards) {
    // STEP 1: Determine Active Decks
    const activeDecks = getActiveDecks(gameState);

    // STEP 2: Filter Candidates
    const candidates = allCards.filter(card =>
        isCardEligible(card, gameState, activeDecks)
    );

    if (candidates.length === 0) {
        console.warn('⚠️ No eligible cards! Falling back to first CORE card');
        const fallback = allCards.find(c => c.deck === 'CORE');
        return fallback || allCards[0];
    }

    // STEP 3: Calculate Weights
    const weightedCards = candidates.map(card => ({
        card,
        weight: calculateFinalWeight(card, gameState, allCards)
    }));

    // STEP 4: Weighted Random Selection
    const selected = weightedRandomPick(weightedCards);

    console.log(`📊 Card Selection: ${candidates.length} candidates, picked ${selected.id}`);

    return selected;
}

/**
 * Determine which decks are currently active
 */
function getActiveDecks(gameState) {
    const decks = new Set(['CORE', 'DAILY', 'PLOT']);

    // Crisis conditions
    const { infl, growth, stability, trust } = gameState.metrics;

    if (infl > 85 || stability < 25 || trust < 20 || growth < 20) {
        decks.add('CRISIS');
    }

    // Add active sub-decks
    const activeSubDecks = gameState.getActiveSubDecks();
    activeSubDecks.forEach(deckId => decks.add(deckId));

    return decks;
}

/**
 * Check if a card is eligible to appear
 */
function isCardEligible(card, gameState, activeDecks) {
    // Must have metadata
    if (!card.deck) return true; // Legacy cards without metadata are always eligible

    // Deck check
    if (!activeDecks.has(card.deck)) return false;

    // Cooldown check
    if (card.cooldown && gameState.wasCardSeenRecently(card.id, card.cooldown)) {
        return false;
    }

    // Conditions check
    if (card.conditions) {
        return checkConditions(card.conditions, gameState);
    }

    return true;
}

/**
 * Check if card conditions are met
 */
function checkConditions(conditions, gameState) {
    // Metrics range check
    if (conditions.metrics) {
        for (const [metric, range] of Object.entries(conditions.metrics)) {
            if (!range) continue;
            const [min, max] = range;
            const value = gameState.metrics[metric];
            if (value < min || value > max) return false;
        }
    }

    // Turn range check
    if (conditions.turn) {
        if (conditions.turn.min && gameState.turn < conditions.turn.min) return false;
        if (conditions.turn.max && gameState.turn > conditions.turn.max) return false;
    }

    // Flags check - must have ALL
    if (conditions.flagsAll && conditions.flagsAll.length > 0) {
        if (!gameState.hasAllFlags(conditions.flagsAll)) return false;
    }

    // Flags check - must have ANY
    if (conditions.flagsAny && conditions.flagsAny.length > 0) {
        if (!gameState.hasAnyFlag(conditions.flagsAny)) return false;
    }

    // Flags check - must NOT have
    if (conditions.notFlags && conditions.notFlags.length > 0) {
        if (gameState.hasAnyFlag(conditions.notFlags)) return false;
    }

    return true;
}

/**
 * Calculate final weight for a card based on game state
 */
function calculateFinalWeight(card, gameState, allCards) {
    let weight = card.weight || 50; // Default weight

    // State-based weight modifiers
    const { infl, growth, stability, trust } = gameState.metrics;

    if (card.tags) {
        if (card.tags.includes('inflation') && infl > 70) weight *= 1.5;
        if (card.tags.includes('growth') && growth < 30) weight *= 1.5;
        if (card.tags.includes('stability') && stability < 30) weight *= 1.5;
        if (card.tags.includes('trust') && trust < 30) weight *= 1.5;
        if (card.tags.includes('crisis') && (infl > 80 || stability < 25)) weight *= 2.0;
    }

    // Diversity penalty - avoid same speaker
    if (card.character && gameState.recentCards.length > 0) {
        const recentSpeakers = gameState.recentCards
            .slice(-3)
            .map(id => {
                const recentCard = allCards.find(c => c.id === id);
                return recentCard?.character;
            })
            .filter(Boolean);

        if (recentSpeakers.includes(card.character)) {
            weight *= 0.6;  // Same speaker recently
        }
    }

    // Diversity penalty - avoid same tags
    if (card.tags && gameState.recentCards.length > 0) {
        const recentTags = gameState.recentCards
            .slice(-5)
            .flatMap(id => {
                const recentCard = allCards.find(c => c.id === id);
                return recentCard?.tags || [];
            });

        const hasRecentTag = card.tags.some(tag => recentTags.includes(tag));
        if (hasRecentTag) {
            weight *= 0.7;  // Same topic recently
        }
    }

    return Math.max(1, weight); // Ensure positive weight
}

/**
 * Weighted random selection
 */
function weightedRandomPick(weightedCards) {
    const totalWeight = weightedCards.reduce((sum, wc) => sum + wc.weight, 0);
    let random = Math.random() * totalWeight;

    for (const { card, weight } of weightedCards) {
        random -= weight;
        if (random <= 0) return card;
    }

    // Fallback to first card
    return weightedCards[0].card;
}

/**
 * Apply choice effects to game state
 */
export function applyChoiceEffects(choice, gameState) {
    if (!choice.effects) return;

    const { effects } = choice;

    // Set flags
    if (effects.setFlags) {
        effects.setFlags.forEach(flag => gameState.addFlag(flag));
    }

    // Remove flags
    if (effects.removeFlags) {
        effects.removeFlags.forEach(flag => gameState.removeFlag(flag));
    }

    // Open sub-decks
    if (effects.openSubDecks) {
        effects.openSubDecks.forEach(({ id, duration }) => {
            gameState.openSubDeck(id, duration);
        });
    }

    // Close sub-decks
    if (effects.closeSubDecks) {
        effects.closeSubDecks.forEach(deckId => {
            gameState.closeSubDeck(deckId);
        });
    }
}
