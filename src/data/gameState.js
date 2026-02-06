// Game State Manager
// Centralized state tracking for metrics, flags, turn count, and card history

export class GameState {
    constructor(initialMetrics = null) {
        this.metrics = initialMetrics || {
            infl: 50,
            growth: 50,
            stability: 50,
            trust: 50
        };
        this.flags = new Set();
        this.turn = 0;
        this.recentCards = [];  // Last 10 card IDs
        this.activeSubDecks = new Map();  // deckId -> expiresAt
        this.cardHistory = new Map();  // cardId -> lastSeenTurn
    }

    // Flag management
    addFlag(flag) {
        this.flags.add(flag);
    }

    removeFlag(flag) {
        this.flags.delete(flag);
    }

    hasFlag(flag) {
        return this.flags.has(flag);
    }

    hasAnyFlag(flags) {
        return flags.some(f => this.flags.has(f));
    }

    hasAllFlags(flags) {
        return flags.every(f => this.flags.has(f));
    }

    // Sub-deck management
    openSubDeck(deckId, duration = 5) {
        this.activeSubDecks.set(deckId, this.turn + duration);
    }

    closeSubDeck(deckId) {
        this.activeSubDecks.delete(deckId);
    }

    isSubDeckActive(deckId) {
        const expiresAt = this.activeSubDecks.get(deckId);
        if (!expiresAt) return false;
        if (this.turn >= expiresAt) {
            this.activeSubDecks.delete(deckId);
            return false;
        }
        return true;
    }

    getActiveSubDecks() {
        // Clean up expired sub-decks
        for (const [deckId, expiresAt] of this.activeSubDecks.entries()) {
            if (this.turn >= expiresAt) {
                this.activeSubDecks.delete(deckId);
            }
        }
        return Array.from(this.activeSubDecks.keys());
    }

    // Card history management
    recordCard(cardId) {
        this.recentCards.push(cardId);
        if (this.recentCards.length > 10) {
            this.recentCards.shift();
        }
        this.cardHistory.set(cardId, this.turn);
    }

    getCardLastSeen(cardId) {
        return this.cardHistory.get(cardId);
    }

    wasCardSeenRecently(cardId, withinTurns = 6) {
        const lastSeen = this.cardHistory.get(cardId);
        if (!lastSeen) return false;
        return (this.turn - lastSeen) < withinTurns;
    }

    // Turn management
    incrementTurn() {
        this.turn++;
    }

    // Metrics management
    updateMetrics(diff) {
        for (const [key, value] of Object.entries(diff)) {
            if (this.metrics.hasOwnProperty(key)) {
                this.metrics[key] = Math.max(0, Math.min(100, this.metrics[key] + value));
            }
        }
    }

    // Check if game over
    checkGameOver() {
        for (const [key, value] of Object.entries(this.metrics)) {
            if (value <= 0 || value >= 100) {
                return { isOver: true, reason: key, value };
            }
        }
        return { isOver: false };
    }

    // Serialization for save/load
    toJSON() {
        return {
            metrics: this.metrics,
            flags: Array.from(this.flags),
            turn: this.turn,
            recentCards: this.recentCards,
            activeSubDecks: Array.from(this.activeSubDecks.entries()),
            cardHistory: Array.from(this.cardHistory.entries())
        };
    }

    static fromJSON(data) {
        const state = new GameState(data.metrics);
        state.flags = new Set(data.flags || []);
        state.turn = data.turn || 0;
        state.recentCards = data.recentCards || [];
        state.activeSubDecks = new Map(data.activeSubDecks || []);
        state.cardHistory = new Map(data.cardHistory || []);
        return state;
    }
}
