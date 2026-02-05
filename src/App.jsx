
import React, { useState, useEffect } from 'react';
import StatBar from './components/StatBar';
import SwipeCard from './components/SwipeCard';
import GameOverScreen from './components/GameOverScreen';
import StartScreen from './components/StartScreen';
import { EVENTS } from './data/events';
import styles from './App.module.css';

const INITIAL_STATS = {
  stock: 50,
  realEstate: 50,
  approval: 50,
  liquidity: 50
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [currentCard, setCurrentCard] = useState(null);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [gameOver, setGameOver] = useState(null);
  const [previewDeltas, setPreviewDeltas] = useState({});

  // Initialize first card
  useEffect(() => {
    pickNewCard();
  }, []);

  const pickNewCard = () => {
    const randomCard = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    // Ensure we can reset the card component (maybe by key)
    setCurrentCard({ ...randomCard, key: Math.random() });
  };

  const handleUpdatePreview = (direction) => {
    if (!currentCard) return;
    if (direction === 'left') {
      setPreviewDeltas({
        stock: currentCard.left.diff.stock || 0,
        realEstate: currentCard.left.diff.realEstate || 0,
        approval: currentCard.left.diff.approval || 0,
        liquidity: currentCard.left.diff.liquidity || 0
      });
    } else if (direction === 'right') {
      setPreviewDeltas({
        stock: currentCard.right.diff.stock || 0,
        realEstate: currentCard.right.diff.realEstate || 0,
        approval: currentCard.right.diff.approval || 0,
        liquidity: currentCard.right.diff.liquidity || 0
      });
    } else {
      setPreviewDeltas({});
    }
  };

  const applyEffects = (diff) => {
    const newStats = { ...stats };
    let causeOfDeath = null;

    Object.keys(newStats).forEach(key => {
      newStats[key] += (diff[key] || 0);

      // Check boundaries
      if (newStats[key] <= 0) {
        newStats[key] = 0;
        causeOfDeath = getDeathMessage(key, 'min');
      } else if (newStats[key] >= 100) {
        newStats[key] = 100;
        causeOfDeath = getDeathMessage(key, 'max');
      }
    });

    setStats(newStats);
    return causeOfDeath;
  };

  const getDeathMessage = (stat, type) => {
    const messages = {
      stock: { min: "주식 시장 붕괴! 당신은 해임되었습니다.", max: "주식 시장 과열! 버블 붕괴로 경제가 파탄났습니다." },
      realEstate: { min: "부동산 폭락! 자산가치가 증발하여 폭동이 일어났습니다.", max: "집값 폭등! 서민들이 죽창을 들고 일어났습니다." },
      approval: { min: "지지율 바닥! 탄핵 소추안이 발의되었습니다.", max: "독재자 추대? 너무 높은 인기는 민주주의를 위협합니다." },
      liquidity: { min: "국가 부도! 제2의 IMF 사태가 터졌습니다.", max: "초인플레이션! 돈이 휴지조각이 되었습니다." }
    };
    return messages[stat][type];
  };

  const handleSwipe = (direction) => {
    if (!currentCard) return;

    const choice = direction === 'left' ? currentCard.left : currentCard.right;
    const deathCause = applyEffects(choice.diff);

    if (deathCause) {
      setTimeout(() => setGameOver(deathCause), 500); // Slight delay for effect
    } else {
      // Advance time
      let newMonth = month + 3;
      let newYear = year;
      if (newMonth > 12) {
        newMonth -= 12;
        newYear++;
      }
      setMonth(newMonth);
      setYear(newYear);

      // Next card
      setTimeout(pickNewCard, 200);
    }

    setPreviewDeltas({});
  };

  const restartGame = () => {
    setStats(INITIAL_STATS);
    setYear(2025);
    setMonth(1);
    setGameOver(null);
    pickNewCard();
  };

  if (!gameStarted) {
    return <StartScreen onStart={() => setGameStarted(true)} />;
  }

  if (gameOver) {
    return <GameOverScreen cause={gameOver} onRestart={restartGame} />;
  }

  return (
    <div className={styles.appContainer}>
      <StatBar stats={stats} previewDeltas={previewDeltas} />

      <div style={{ position: 'absolute', top: '100px', width: '100%', textAlign: 'center', zIndex: 0, color: '#9ca3af' }}>
        <h2>{year}년 {month}월</h2>
        <p>한국은행 총재 집무실</p>
      </div>

      {currentCard && (
        <SwipeCard
          key={currentCard.key} // Key forces re-render for new card animation
          card={currentCard}
          onSwipe={handleSwipe}
          updatePreview={handleUpdatePreview}
        />
      )}
    </div>
  );
}

export default App;
