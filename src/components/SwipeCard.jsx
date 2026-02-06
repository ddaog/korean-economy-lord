
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import styles from './SwipeCard.module.css';

const SwipeCard = ({ card, onSwipe, updatePreview }) => {
    const x = useMotionValue(0);
    const controls = useAnimation();
    const cardRef = useRef(null);

    // Rotation based on x position
    const rotate = useTransform(x, [-200, 200], [-10, 10]);

    // Opacity of overlays
    // Wait.
    // Drag Right (>0) -> Choosing the RIGHT option provided in data.
    // Drag Left (<0) -> Choosing the LEFT option provided in data.
    // Why? "Swipe Right" usually means "Yes" or the "Right" choice visually.

    // Opacity: Instant feedback (starts at 10px, full at 60px)
    const rightTagOpacity = useTransform(x, [10, 60], [0, 1]);
    const leftTagOpacity = useTransform(x, [-10, -60], [0, 1]);

    // Scale: Pop effect (starts 0.8, pops to 1.1)
    const rightTagScale = useTransform(x, [10, 60], [0.8, 1.1]);
    const leftTagScale = useTransform(x, [-10, -60], [0.8, 1.1]);

    // Rotation: Slight tilt for dynamic feel
    const rightTagRotate = useTransform(x, [0, 100], [-5, 0]);
    const leftTagRotate = useTransform(x, [0, -100], [5, 0]);

    // Background color change for feedback
    const boxColor = useTransform(x, [-100, 0, 100], ['#ffeaa7', '#ffffff', '#55efc4']); // Softer pastel transition

    useEffect(() => {
        const unsubscribe = x.onChange((v) => {
            // Update preview stats in parent
            if (v > 10) {
                updatePreview('right'); // Dragging Right
            } else if (v < -10) {
                updatePreview('left'); // Dragging Left
            } else {
                updatePreview(null);
            }
        });
        return () => unsubscribe();
    }, [x, updatePreview]);

    const handleDragEnd = async (event, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            await controls.start({ x: 500, opacity: 0 });
            onSwipe('right');
        } else if (info.offset.x < -threshold) {
            await controls.start({ x: -500, opacity: 0 });
            onSwipe('left');
        } else {
            controls.start({ x: 0, opacity: 1 });
        }
    };

    return (
        <div className={styles.cardWrapper}>
            <motion.div
                className={styles.card}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x, rotate, backgroundColor: boxColor }}
                animate={controls}
                onDragEnd={handleDragEnd}
                ref={cardRef}
                whileTap={{ scale: 1.05 }}
            >
                {/* Meeting Type Badge */}
                {card.type && (
                    <div className={`${styles.meetingBadge} ${card.type === 'MPC' ? styles.badgeMPC :
                            card.type === 'FSM' ? styles.badgeFSM :
                                card.type === 'URGENT' ? styles.badgeURGENT :
                                    card.type === 'CHAIN' ? styles.badgeCHAIN :
                                        styles.badgeGENERAL
                        }`}>
                        {card.type === 'MPC' ? "통화정책 결정회의" :
                            card.type === 'FSM' ? "금융안정회의" :
                                card.type === 'URGENT' ? "긴급 현안" :
                                    card.type === 'CHAIN' ? "후속 보고" :
                                        "일상 보고"}
                    </div>
                )}

                <div className={styles.imageContainer}>
                    {card.image && (
                        <img
                            src={card.image}
                            alt={card.character}
                            className={styles.characterImage}
                            draggable="false"
                        />
                    )}
                </div>

                <div className={styles.textContainer}>
                    <h3 className={styles.characterName}>{card.character}</h3>
                    <p className={styles.cardText}>"{card.text}"</p>
                </div>

                {/* Overlays for choices */}
                <motion.div
                    className={`${styles.choiceTag} ${styles.choiceRight}`}
                    style={{ opacity: rightTagOpacity, scale: rightTagScale, rotate: rightTagRotate }}
                >
                    <span className={styles.emoji}>✅</span> {card.right.text}
                </motion.div>

                <motion.div
                    className={`${styles.choiceTag} ${styles.choiceLeft}`}
                    style={{ opacity: leftTagOpacity, scale: leftTagScale, rotate: leftTagRotate }}
                >
                    <span className={styles.emoji}>❌</span> {card.left.text}
                </motion.div>

            </motion.div>
        </div>
    );
};

export default SwipeCard;
