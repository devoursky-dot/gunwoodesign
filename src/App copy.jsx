import React from 'react';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <>
      {/* 1. 기본 브라우저 여백 제거를 위한 스타일 */}
      <style>{`
        body { margin: 0; padding: 0; overflow: hidden; background-color: #050505; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={containerStyle}>
        {/* 2. 배경 레이어: 인터넷에서 가져온 정교한 벡터/기하학 패턴 */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          style={vectorBackgroundStyle}
        />

        {/* 3. 메인 콘텐츠 레이어 */}
        <div style={overlayStyle}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <span style={subTitleStyle}>STRUCTURAL AESTHETICS</span>
            <h1 style={mainTitleStyle}>GunWoo Design</h1>
            <div style={lineStyle} />
            <p style={descStyle}>공간의 본질을 데이터와 벡터로 재해석하다.</p>
            
            <motion.div style={{ display: 'flex', gap: '20px' }}>
              <motion.button 
                whileHover={{ backgroundColor: '#fff', color: '#000' }}
                style={buttonStyle}
              >
                VIEW DRAWINGS
              </motion.button>
              <motion.button 
                whileHover={{ border: '1px solid #777', color: '#777' }}
                style={{ ...buttonStyle, border: '1px solid #333' }}
              >
                CONTACT
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* 4. 화면 모서리 장식 (건축 도면 느낌) */}
        <div style={cornerDecoration}>[ 35.1235° N, 129.0234° E ]</div>
      </div>
    </>
  );
};

// --- 스타일링 (건축적 미니멀리즘) ---
const containerStyle = {
  height: '100vh',
  width: '100vw',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontFamily: '"Helvetica Neue", Arial, sans-serif'
};

const vectorBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  // 인터넷에서 가져온 정교한 선형 벡터 데이터 이미지
  backgroundImage: 'url("https://images.unsplash.com/photo-1507738911741-9491060965e6?q=80&w=2070")', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 1
};

const overlayStyle = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  padding: '0 20px'
};

const subTitleStyle = {
  fontSize: '12px',
  letterSpacing: '8px',
  color: '#888',
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '20px'
};

const mainTitleStyle = {
  fontSize: 'clamp(3rem, 10vw, 7rem)',
  fontWeight: '200',
  margin: '0',
  textTransform: 'uppercase',
  lineHeight: 1
};

const lineStyle = {
  width: '100px',
  height: '1px',
  backgroundColor: '#555',
  margin: '40px auto'
};

const descStyle = {
  fontSize: '16px',
  color: '#aaa',
  maxWidth: '500px',
  margin: '0 auto 50px',
  lineHeight: '1.8',
  fontWeight: '300'
};

const buttonStyle = {
  padding: '12px 30px',
  fontSize: '12px',
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid #fff',
  cursor: 'pointer',
  transition: '0.4s',
  letterSpacing: '2px'
};

const cornerDecoration = {
  position: 'absolute',
  bottom: '30px',
  right: '30px',
  fontSize: '11px',
  color: '#444',
  letterSpacing: '1px',
  zIndex: 2
};

export default App;