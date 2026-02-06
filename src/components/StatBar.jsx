
import React from 'react';
import { TrendingUp, TrendingDown, Activity, Shield } from 'lucide-react';
import { STAT_CONFIG, STATS, getStatColor } from '../data/statConfig';
import styles from './StatBar.module.css';

const StatItem = ({ statKey, value, previewDelta }) => {
    const config = STAT_CONFIG[statKey];

    // Safe calculation for visual width (0-100)
    const safeValue = Math.max(0, Math.min(100, value));

    // Calculate preview value if a choice is being hovered
    let previewValue = safeValue;
    let isPositive = false;
    let isNegative = false;

    if (previewDelta !== undefined && previewDelta !== 0) {
        previewValue = Math.max(0, Math.min(100, value + previewDelta));
        isPositive = previewDelta > 0;
        isNegative = previewDelta < 0;
    }

    // Get color based on value
    const barColor = getStatColor(statKey, safeValue);

    return (
        <div className={styles.statContainer}>
            <div className={styles.iconWrapper}>
                <span className={styles.iconEmoji}>{config.icon}</span>
                {previewDelta !== 0 && (
                    <div className={`${styles.indicator} ${isPositive ? styles.up : styles.down}`} />
                )}
            </div>
            <div className={styles.barContainer}>
                <div
                    className={styles.barFill}
                    style={{ height: `${safeValue}%`, backgroundColor: barColor }}
                />
                {previewDelta !== 0 && (
                    <div
                        className={styles.previewFill}
                        style={{
                            height: `${previewValue}%`,
                            opacity: 0.5,
                            backgroundColor: isPositive ? '#10b981' : '#ef4444' // Emerald or Red
                        }}
                    />
                )}
            </div>
            <div className={styles.statLabel}>{config.name}</div>
        </div>
    );
};

const StatBar = ({ stats, previewDeltas }) => {
    return (
        <div className={styles.topBar}>
            <StatItem
                statKey={STATS.INFL}
                value={stats.infl}
                previewDelta={previewDeltas?.infl || 0}
            />
            <StatItem
                statKey={STATS.GROWTH}
                value={stats.growth}
                previewDelta={previewDeltas?.growth || 0}
            />
            <StatItem
                statKey={STATS.STABILITY}
                value={stats.stability}
                previewDelta={previewDeltas?.stability || 0}
            />
            <StatItem
                statKey={STATS.TRUST}
                value={stats.trust}
                previewDelta={previewDeltas?.trust || 0}
            />
        </div>
    );
};

export default StatBar;
