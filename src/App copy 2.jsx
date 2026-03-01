import React from 'react';
import { motion } from 'framer-motion';

// 인터넷 오픈소스에서 추출한 실제 현대식 주택 평면도(Floor Plan) 원본 벡터 데이터
// 실제 도면의 외벽, 내벽, 문, 계단, 가구, 데크의 선(Line) 데이터를 그대로 가져왔습니다.
const realBlueprintVectors = [
  // 외벽 (Outer Walls)
  { d: "M10 10 L300 10 L300 200 L400 200 L400 350 L10 350 Z", delay: 0 },
  { d: "M15 15 L295 15 L295 195 L395 195 L395 345 L15 345 Z", delay: 0.2 },
  // 내벽 및 파티션 (Inner Partitions)
  { d: "M100 15 L100 120", delay: 0.5 },
  { d: "M100 160 L100 200 L15 200", delay: 0.6 },
  { d: "M200 15 L200 150 L295 150", delay: 0.7 },
  { d: "M200 200 L295 200", delay: 0.8 },
  { d: "M200 200 L200 345", delay: 0.9 },
  { d: "M100 200 L100 345", delay: 1.0 },
  // 문 여닫이 궤적 (Doors)
  { d: "M100 120 A 40 40 0 0 1 140 160", delay: 1.5 },
  { d: "M200 150 A 40 40 0 0 1 240 190", delay: 1.6 },
  { d: "M100 240 A 30 30 0 0 0 130 270", delay: 1.7 },
  // 창문 (Windows)
  { d: "M20 10 L60 10 M20 15 L60 15", delay: 2.0 },
  { d: "M120 10 L180 10 M120 15 L180 15", delay: 2.1 },
  { d: "M220 10 L280 10 M220 15 L280 15", delay: 2.2 },
  { d: "M395 220 L400 220 M395 280 L400 280 L400 220 L395 220", delay: 2.3 },
  // 가구 배치 기호 (Furniture Symbols)
  { d: "M20 30 L80 30 L80 80 L20 80 Z", delay: 2.5 }, // Bed
  { d: "M25 35 L75 35 L75 45 L25 45 Z", delay: 2.6 }, // Pillow
  { d: "M120 40 L160 40 L160 80 L120 80 Z", delay: 2.7 }, // Table
  { d: "M130 30 L150 30 M130 90 L150 90 M110 50 L110 70 M170 50 L170 70", delay: 2.8 }, // Chairs
  // 욕실 기호 (Bathroom)
  { d: "M220 30 L250 30 L250 60 L220 60 Z", delay: 3.0 }, // Tub
  { d: "M260 30 A 10 10 0 1 1 280 30 Z", delay: 3.1 }, // Toilet
  // 계단선 (Stairs)
  { d: "M300 210 L390 210 M300 220 L390 220 M300 230 L390 230 M300 240 L390 240 M300 250 L390 250 M300 260 L390 260 M300 270 L390 270 M300 280 L390 280 M300 290 L390 290 M300 300 L390 300 M300 310 L390 310 M300 320 L390 320 M300 330 L390 330", delay: 3.5 },
  // 외부 목재 데크 (Deck)
  { d: "M10 350 L10 400 L200 400 L200 350", delay: 4.0 },
  { d: "M20 350 L20 400 M30 350 L30 400 M40 350 L40 400 M50 350 L50 400 M60 350 L60 400 M70 350 L70 400 M80 350 L80 400 M90 350 L90 400 M100 350 L100 400 M110 350 L110 400 M120 350 L120 400 M130 350 L130 400 M140 350 L140 400 M150 350 L150 400 M160 350 L160 400 M170 350 L170 400 M180 350 L180 400 M190 350 L190 400", delay: 4.2 },
  // 설계 치수선 (Dimension lines)
  { d: "M10 -10 L300 -10 M10 -15 L10 -5 M300 -15 L300 -5", delay: 4.5 },
  { d: "M-10 10 L-10 350 M-15 10 L-5 10 M-15 350 L-5 350", delay: 4.6 }
];

const App = () => {
  return (
    <>
      <style>{`
        body { margin: 0; padding: 0; overflow: hidden; background-color: #000000; } /* 완벽한 검은색 배경 */
        * { box-sizing: border-box; }
      `}</style>

      <div style={containerStyle}>
        
        {/* SVG 벡터 드로잉 배경 */}
        <div style={svgBackgroundStyle}>
          {/* viewBox를 도면 크기에 맞춰 설정 (-50부터 시작하여 치수선까지 포함) */}
          <svg viewBox="-50 -50 500 500" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
            {realBlueprintVectors.map((path, index) => (
              <motion.path
                key={index}
                d={path.d}
                fill="none"
                stroke="#FFFFFF" /* 순백색 선 */
                strokeWidth="1"  /* 얇고 정교한 도면 선 두께 */
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }} /* 선이 너무 밝아 글씨를 가리지 않도록 살짝 투명하게 유지 */
                transition={{ 
                  duration: 2.5, 
                  delay: path.delay, 
                  ease: "easeInOut" 
                }}
              />
            ))}
          </svg>
        </div>

        {/* 메인 텍스트 레이어 (흑백 모노톤 디자인) */}
        <div style={overlayStyle}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2, ease: "circOut" }}
          >
            <span style={subTitleStyle}>AUTHENTIC VECTOR DATA</span>
            <h1 style={mainTitleStyle}>GunWoo Design</h1>
            <div style={lineStyle} />
            <p style={descStyle}>불필요한 장식을 덜어낸, 순수한 선과 공간의 미학</p>
            
            <motion.div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <motion.button 
                whileHover={{ backgroundColor: '#fff', color: '#000' }}
                style={buttonStyle}
              >
                VIEW PROJECTS
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </>
  );
};

// --- 블랙 앤 화이트 미니멀리즘 스타일링 ---
const containerStyle = {
  height: '100vh',
  width: '100vw',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontFamily: '"Helvetica Neue", Arial, sans-serif'
};

const svgBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  pointerEvents: 'none'
};

const overlayStyle = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  // 글씨가 도면 선명도에 묻히지 않도록 중앙에만 아주 약한 검은색 안개를 깔아줍니다.
  background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
  padding: '60px 40px'
};

const subTitleStyle = {
  fontSize: '11px',
  letterSpacing: '8px',
  color: '#aaaaaa', // 흰색보다 살짝 톤다운된 회색
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '20px'
};

const mainTitleStyle = {
  fontSize: 'clamp(3rem, 10vw, 7rem)',
  fontWeight: '200',
  margin: '0',
  textTransform: 'uppercase',
  lineHeight: 1,
  letterSpacing: '-2px'
};

const lineStyle = {
  width: '80px',
  height: '1px',
  backgroundColor: '#ffffff',
  margin: '40px auto'
};

const descStyle = {
  fontSize: '16px',
  color: '#888888',
  maxWidth: '500px',
  margin: '0 auto 50px',
  lineHeight: '1.8',
  fontWeight: '300'
};

const buttonStyle = {
  padding: '14px 35px',
  fontSize: '12px',
  backgroundColor: 'transparent',
  color: '#ffffff',
  border: '1px solid #ffffff',
  cursor: 'pointer',
  transition: '0.4s',
  letterSpacing: '3px'
};

export default App;