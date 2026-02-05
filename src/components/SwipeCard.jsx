
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
    const leftOpacity = useTransform(x, [100, 150], [0, 1]); // Dragging RIGHT shows Left Option? No.
    // Wait.
    // Drag Right (>0) -> Choosing the RIGHT option provided in data.
    // Drag Left (<0) -> Choosing the LEFT option provided in data.
    // Why? "Swipe Right" usually means "Yes" or the "Right" choice visually.

    const rightTagOpacity = useTransform(x, [50, 150], [0, 1]); // Dragging Right -> Show Right Choice Tag
    const leftTagOpacity = useTransform(x, [-50, -150], [0, 1]); // Dragging Left -> Show Left Choice Tag

    // Background color change for feedback
    const boxColor = useTransform(x, [-150, 0, 150], ['#fca5a5', '#ffffff', '#86efac']);

    useEffect(() => {
        const unsubscribe = x.onChange((v) => {
            // Update preview stats in parent
            if (v > 50) {
                updatePreview('right'); // Dragging Right
            } else if (v < -50) {
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
                <div className={styles.characterContainer}>
                    <div className={styles.avatarPlaceholder}>
                        {card.character.slice(0, 1)}
                    </div>
                    <h3 className={styles.characterName}>{card.character}</h3>
                </div>

                <p className={styles.cardText}>"{card.text}"</p>

                {/* Overlays for choices */}
                <motion.div className={styles.choiceTag} style={{ opacity: rightTagOpacity, left: 20, transform: 'rotate(-10deg)', color: '#166534', borderColor: '#166534' }}>
                    {card.right.text}
                </motion.div>

                <motion.div className={styles.choiceTag} style={{ opacity: leftTagOpacity, right: 20, transform: 'rotate(10deg)', color: '#991b1b', borderColor: '#991b1b' }}>
                    {card.left.text}
                </motion.div>

            </motion.div>
        </div>
    );
};

export default SwipeCard;
