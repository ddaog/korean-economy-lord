
import React, { useState, useEffect } from 'react';
import StatBar from './components/StatBar';
import SwipeCard from './components/SwipeCard';
import GameOverScreen from './components/GameOverScreen';
import StartScreen from './components/StartScreen';
import { EVENTS, EVENT_TYPES } from './data/events';
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
  const [history, setHistory] = useState([]);
  const [futureEventQueue, setFutureEventQueue] = useState([]);

  // Initialize first card
  useEffect(() => {
    pickNewCard();
  }, []);

  // Determine current Act based on Year
  const currentAct = year <= 2026 ? 1 : year <= 2028 ? 2 : 3;

  // BOK Schedule: MPC months vs FSM months
  const BOK_SCHEDULE = {
    MPC: [1, 2, 4, 5, 7, 8, 10, 11], // Interest Rates etc.
    FSM: [3, 6, 9, 12]               // Financial Stability
  };

  const pickNewCard = (currentHistory = history, currentFutureQueue = futureEventQueue, currentMonth = month, currentYear = year) => {
    // 1. Check Future/Chained Events
    const dueEventIndex = currentFutureQueue.findIndex(item => item.dueYear === currentYear && item.dueMonth === currentMonth);

    if (dueEventIndex !== -1) {
      const dueEvent = currentFutureQueue[dueEventIndex];
      const eventData = EVENTS.find(e => e.id === dueEvent.eventId);

      if (eventData) {
        // Remove from queue
        const newQueue = [...currentFutureQueue];
        newQueue.splice(dueEventIndex, 1);
        setFutureEventQueue(newQueue);

        setCurrentCard({ ...eventData, key: Math.random() });
        return;
      }
    }

    // 2. Identify Target Type based on Month
    let targetType = EVENT_TYPES.GENERAL;
    if (BOK_SCHEDULE.MPC.includes(currentMonth)) targetType = EVENT_TYPES.MPC;
    else if (BOK_SCHEDULE.FSM.includes(currentMonth)) targetType = EVENT_TYPES.FSM;

    // 3. Filter by Act & Type
    // Try to find events matching current schedule type first
    let candidates = EVENTS.filter(e =>
      (!e.act || e.act === currentAct) &&
      (e.type === targetType)
    );

    // If no specific schedule event found (or empty), fallback to GENERAL or any allowed
    if (candidates.length === 0) {
      candidates = EVENTS.filter(e =>
        (!e.act || e.act === currentAct) &&
        (e.type === EVENT_TYPES.GENERAL || !e.type)
      );
    }

    // 4. Filter out recently used cards (Cooldown: 12 months)
    const available = candidates.filter(e => !currentHistory.includes(e.id));
    if (available.length > 0) {
      candidates = available;
    } else if (candidates.length === 0) {
      // Absolute fallback if everything is cooled down or missing
      candidates = EVENTS.filter(e => !e.act || e.act === currentAct);
    }

    const randomCard = candidates[Math.floor(Math.random() * candidates.length)];

    if (randomCard) {
      setCurrentCard({ ...randomCard, key: Math.random() }); // Force re-render

      // Update history
      const newHistory = [...currentHistory, randomCard.id];
      if (newHistory.length > 12) newHistory.shift(); // Keep last 12
      setHistory(newHistory);
    }
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
      // Advance time (1 Month per turn for realistic schedule)
      let newMonth = month + 1;
      let newYear = year;
      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }
      setMonth(newMonth);
      setYear(newYear);

      // Handle Chained Events
      let nextFutureQueue = [...futureEventQueue];
      if (choice.chains) {
        choice.chains.forEach(chain => {
          // Calculate due date
          let dueMonth = newMonth + chain.delay; // Delay relative to NEXT month
          let dueYear = newYear;
          while (dueMonth > 12) {
            dueMonth -= 12;
            dueYear++;
          }
          nextFutureQueue.push({ eventId: chain.eventId, dueYear, dueMonth });
        });
        setFutureEventQueue(nextFutureQueue);
      }

      // History updates
      const updatedHistory = [...history, currentCard.id];
      if (updatedHistory.length > 12) updatedHistory.shift();
      setHistory(updatedHistory);

      setTimeout(() => pickNewCard(updatedHistory, nextFutureQueue, newMonth, newYear), 200);
    }

    setPreviewDeltas({});
  };

  const restartGame = () => {
    setStats(INITIAL_STATS);
    setYear(2025);
    setMonth(1);
    setGameOver(null);
    setHistory([]);
    setFutureEventQueue([]);
    // Reset call needs empty history
    pickNewCard([], [], 1, 2025);
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

      <div style={{ position: 'absolute', top: '110px', width: '100%', textAlign: 'center', zIndex: 10, color: '#636e72' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0', padding: '8px 24px', display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{year}년 {month}월</h2>
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
