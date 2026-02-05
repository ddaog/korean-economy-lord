
import React from 'react';
import { TrendingUp } from 'lucide-react';

const StartScreen = ({ onStart }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f3f4f6',
            color: '#1f2937',
            padding: '20px',
            textAlign: 'center'
        }}>
            <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <TrendingUp size={64} color="#2563eb" />
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: '800' }}>한국은행 총재<br />생존기</h1>

            <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: '300px', marginBottom: '40px', lineHeight: '1.6' }}>
                2025년, 당신은 한국은행 총재로 임명되었습니다.<br />
                코스피, 부동산, 지지율, 유동성...<br />
                이 위태로운 균형을 지켜낼 수 있을까요?
            </p>

            <button
                onClick={onStart}
                style={{
                    padding: '18px 60px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
                    transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
                임기 시작
            </button>

            <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#9ca3af' }}>
                Swipe 좌/우로 결정하세요
            </p>
        </div>
    );
};

export default StartScreen;
