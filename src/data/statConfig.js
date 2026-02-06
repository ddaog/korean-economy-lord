// Stat configuration for the Bank of Korea Governor game
// Defines the 4 core economic indicators

export const STATS = {
    INFL: 'infl',
    GROWTH: 'growth',
    STABILITY: 'stability',
    TRUST: 'trust'
};

export const STAT_CONFIG = {
    [STATS.INFL]: {
        name: '물가',
        icon: '📈',
        description: '인플레이션율 - 낮을수록 좋음',
        goodThreshold: 40, // Below this is good
        badThreshold: 60,  // Above this is bad
        invertColors: true, // Red when high, green when low
        color: {
            low: '#10b981',    // Green (good)
            mid: '#f59e0b',    // Amber (neutral)
            high: '#ef4444'    // Red (bad)
        }
    },
    [STATS.GROWTH]: {
        name: '성장',
        icon: '💹',
        description: '경제성장률 - 높을수록 좋음',
        goodThreshold: 60,
        badThreshold: 40,
        invertColors: false,
        color: {
            low: '#ef4444',    // Red (bad)
            mid: '#f59e0b',    // Amber (neutral)
            high: '#10b981'    // Green (good)
        }
    },
    [STATS.STABILITY]: {
        name: '안정',
        icon: '🏦',
        description: '금융안정성 - 높을수록 좋음',
        goodThreshold: 60,
        badThreshold: 40,
        invertColors: false,
        color: {
            low: '#ef4444',
            mid: '#f59e0b',
            high: '#10b981'
        }
    },
    [STATS.TRUST]: {
        name: '신뢰',
        icon: '🤝',
        description: '정책신뢰도 - 높을수록 좋음',
        goodThreshold: 60,
        badThreshold: 40,
        invertColors: false,
        color: {
            low: '#ef4444',
            mid: '#f59e0b',
            high: '#10b981'
        }
    }
};

export const INITIAL_STATS = {
    [STATS.INFL]: 50,
    [STATS.GROWTH]: 50,
    [STATS.STABILITY]: 50,
    [STATS.TRUST]: 50
};

// Helper function to get stat color based on value
export function getStatColor(statKey, value) {
    const config = STAT_CONFIG[statKey];
    if (!config) return config.color.mid;

    if (config.invertColors) {
        // For INFL: low is good, high is bad
        if (value < config.goodThreshold) return config.color.low;
        if (value > config.badThreshold) return config.color.high;
        return config.color.mid;
    } else {
        // For GROWTH, STABILITY, TRUST: high is good, low is bad
        if (value > config.goodThreshold) return config.color.high;
        if (value < config.badThreshold) return config.color.low;
        return config.color.mid;
    }
}

// Helper to check if game is over
export function checkGameOver(stats) {
    for (const [key, value] of Object.entries(stats)) {
        if (value <= 0 || value >= 100) {
            return {
                isOver: true,
                reason: key,
                value: value
            };
        }
    }
    return { isOver: false };
}
