
import React from 'react';
import { TrendingUp, Building, Users, Coins } from 'lucide-react';
import styles from './StatBar.module.css';

const StatItem = ({ icon: Icon, value, label, previewDelta }) => {
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

    return (
        <div className={styles.statContainer}>
            <div className={styles.iconWrapper}>
                <Icon size={24} className={styles.icon} />
                {previewDelta !== 0 && (
                    <div className={`${styles.indicator} ${isPositive ? styles.up : styles.down}`} />
                )}
            </div>
            <div className={styles.barContainer}>
                <div
                    className={styles.barFill}
                    style={{ height: `${safeValue}%` }}
                />
                {previewDelta !== 0 && (
                    <div
                        className={styles.previewFill}
                        style={{
                            height: `${previewValue}%`,
                            opacity: 0.5,
                            backgroundColor: isPositive ? '#4ade80' : '#f87171' // Green or Red
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const StatBar = ({ stats, previewDeltas }) => {
    return (
        <div className={styles.topBar}>
            <StatItem
                icon={TrendingUp}
                value={stats.stock}
                label="KOSPI"
                previewDelta={previewDeltas?.stock || 0}
            />
            <StatItem
                icon={Building}
                value={stats.realEstate}
                label="부동산"
                previewDelta={previewDeltas?.realEstate || 0}
            />
            <StatItem
                icon={Users}
                value={stats.approval}
                label="지지율"
                previewDelta={previewDeltas?.approval || 0}
            />
            <StatItem
                icon={Coins}
                value={stats.liquidity}
                label="유동성"
                previewDelta={previewDeltas?.liquidity || 0}
            />
        </div>
    );
};

export default StatBar;
