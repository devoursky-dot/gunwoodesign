import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'; //
import ApartmentBlueprint from './assets/apartment.svg';

const App = () => {
  // 1. 마우스 시선 반응(Parallax)을 위한 좌표 계산
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // 마우스 좌표를 중앙 기준(-0.5 ~ 0.5)으로 정규화
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. 스크롤 반응(입체적 떠오름) 설정
  const { scrollY } = useScroll(); // 현재 스크롤 위치 감지
  
  // 스크롤에 따라 배경이 위로 떠오르고 투명해지는 변화값 설정
  const yRange = useTransform(scrollY, [0, 600], [0, -150]); 
  const opacityRange = useTransform(scrollY, [0, 400], [0.5, 0.05]); 
  
  // 끊김 없는 부드러운 움직임을 위한 스프링 효과 적용
  const smoothY = useSpring(yRange, { stiffness: 100, damping: 30 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        body { 
          margin: 0; 
          padding: 0; 
          background-color: #000000; 
          color: #ffffff; 
          font-family: 'Helvetica Neue', sans-serif;
          overflow-x: hidden;
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* 메인 컨테이너: 배경을 화면에 고정(Fixed) */}
      <div style={containerStyle}>
        
        {/* A. 배경 레이어: 병우님의 설계도 + 마우스 & 스크롤 상호작용 */}
        <motion.div 
          style={{
            ...backgroundStyle,
            backgroundImage: `url(${ApartmentBlueprint})`,
            y: smoothY, // 스크롤 시 위로 이동
            opacity: opacityRange, // 스크롤 시 투명해짐
            x: mousePos.x * 40, // 마우스 방향에 따른 미세 가로 이동
            rotateX: mousePos.y * -10, // 마우스 방향에 따른 입체 회전
            rotateY: mousePos.x * 10,
            filter: 'invert(1) brightness(1.5)', 
          }}
        />

        {/* B. 콘텐츠 레이어: 한 줄 3D 타이틀 */}
        <div style={overlayStyle}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span style={subTitleStyle}>ORIGINAL ARCHITECTURAL DESIGN</span>

            {/* 한 줄 배치 및 검증된 3D 텍스트 그림자 효과 */}
            <h1 style={mainTitleStyle}>
              GUNWOO DESIGN
            </h1>

            <div style={lineStyle} />
            
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000', borderColor: '#fff' }}
              whileTap={{ scale: 0.95 }}
              style={buttonStyle}
            >
              EXPLORE MODEL
            </motion.button>
          </motion.div>
        </div>

        {/* C. 하단 장식 요소 */}
        <div style={cornerDecoration}>SCALE 1:100 / CUSTOM SVG RENDER</div>
      </div>

      {/* 스크롤 테스트용 하단 공간 */}
      <div style={scrollContentStyle}>
        <p style={{ color: '#444' }}>SCROLL DOWN TO REVEAL MORE PROJECTS</p>
      </div>
    </>
  );
};

// --- 스타일 정의 ---

const containerStyle = {
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  perspective: '1000px', // 3D 회전 효과를 위한 원근감 설정
};

const backgroundStyle = {
  position: 'absolute',
  top: '-10%', // 마우스 움직임 여백을 위해 살짝 크게 설정
  left: '-10%',
  width: '120%',
  height: '120%',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: 1,
};

const overlayStyle = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  width: '100%',
  padding: '0 5%',
  background: 'radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)',
};

const subTitleStyle = {
  fontSize: '11px',
  letterSpacing: '10px',
  color: '#888',
  display: 'block',
  marginBottom: '20px'
};

const mainTitleStyle = {
  fontFamily: "'Anton', sans-serif", 
  fontSize: 'clamp(3rem, 12vw, 15rem)', // 한 줄 배치를 위한 최적 크기
  fontWeight: '400',
  textTransform: 'uppercase',
  margin: '0 0 40px 0',
  lineHeight: '1',
  letterSpacing: '2px',
  whiteSpace: 'nowrap',
  color: '#ffffff',
  // 인터넷에서 검증된 고해상도 3D 텍스트 강조 효과
  textShadow: `
    0 1px 0 #d9d9d9, 0 2px 0 #d2d2d2, 0 3px 0 #cccccc, 
    0 4px 0 #c6c6c6, 0 5px 0 #bfbfbf, 
    0 6px 1px rgba(0,0,0,0.1), 0 0 10px rgba(0,0,0,0.1), 
    0 2px 5px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.2), 
    0 10px 20px rgba(0,0,0,0.25), 0 20px 30px rgba(0,0,0,0.2)
  `
};

const lineStyle = {
  width: '80px',
  height: '1px',
  backgroundColor: '#444',
  margin: '0 auto 50px'
};

const buttonStyle = {
  padding: '14px 45px',
  fontSize: '12px',
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid #444',
  cursor: 'pointer',
  letterSpacing: '4px',
  transition: '0.4s',
  textTransform: 'uppercase'
};

const cornerDecoration = {
  position: 'absolute',
  bottom: '40px',
  right: '40px',
  fontSize: '10px',
  color: '#444',
  letterSpacing: '2px'
};

const scrollContentStyle = {
  height: '200vh',
  marginTop: '100vh',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '100px'
};

export default App;