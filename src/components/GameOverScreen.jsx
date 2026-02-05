
import React from 'react';

const GameOverScreen = ({ cause, onRestart }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#111',
            color: 'white',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>GAME OVER</h1>
            <h2 style={{ color: '#f87171' }}>{cause}</h2>
            <p>당신의 임기는 여기까지입니다.</p>

            <button
                onClick={onRestart}
                style={{
                    marginTop: '40px',
                    padding: '15px 40px',
                    fontSize: '1.5rem',
                    backgroundColor: 'white',
                    color: '#111',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer'
                }}
            >
                새로운 임기 시작
            </button>
        </div>
    );
};

export default GameOverScreen;
