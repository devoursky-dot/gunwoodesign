import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import ApartmentBlueprint from './assets/apartment.svg';

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [driveImages, setDriveImages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 0. 화면 크기 변경 감지 (반응형)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- [중요] 병우님의 구글 설정값 입력 ---
  const API_KEY = "AIzaSyCiVnPpyg9xkhkiacbFmkE05tjy4Z7omko";
  const FOLDER_ID = "19-1jVm3B6FD7TXOFu156H-b92uGZqU5g";

  // 1. 구글 폴더 내 이미지 파일 목록 자동 가져오기
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&orderBy=name&fields=files(id,name,thumbnailLink,description)&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.files) setDriveImages(data.files);
      } catch (err) {
        console.error("이미지 로드 실패:", err);
      }
    };
    fetchImages();
  }, [API_KEY, FOLDER_ID]);

  // 2. 마우스 시선 반응 애니메이션
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isGalleryOpen) return;
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isGalleryOpen]);

  // 3. 스크롤 반응 애니메이션
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 600], [0, -150]);
  const opacityRange = useTransform(scrollY, [0, 400], [0.5, 0.05]);
  const smoothY = useSpring(yRange, { stiffness: 100, damping: 30 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        body { 
          margin: 0; padding: 0; background-color: #000; color: #fff; 
          font-family: 'Helvetica Neue', sans-serif; overflow-x: hidden;
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #444; }
      `}</style>

      <div style={containerStyle}>
        {/* A. 배경 레이어 (설계도) */}
        <motion.div 
          style={{
            ...backgroundStyle,
            backgroundImage: `url(${ApartmentBlueprint})`,
            y: smoothY,
            opacity: isGalleryOpen ? 0.2 : opacityRange,
            x: mousePos.x * 40,
            rotateX: mousePos.y * -10,
            rotateY: mousePos.x * 10,
            filter: 'invert(1) brightness(1.5)', 
          }}
        />

        {/* B. 메인 타이틀 섹션 (갤러리가 닫혀있을 때만 표시) */}
        <AnimatePresence>
          {!isGalleryOpen && (
            <motion.div 
              style={overlayStyle}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <span style={{
                ...subTitleStyle,
                letterSpacing: isMobile ? '2px' : '10px', // 모바일에서는 자간 축소
                fontSize: isMobile ? '10px' : '11px'
              }}>ORIGINAL ARCHITECTURAL DESIGN</span>
              <h1 style={mainTitleStyle}>GUNWOO DESIGN</h1>
              <div style={lineStyle} />
              <motion.button 
                onClick={() => setIsGalleryOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
                style={{ ...buttonStyle, padding: isMobile ? '12px 30px' : '14px 45px' }}
              >
                EXPLORE MODEL ({driveImages.length})
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* C. 자동 스크롤 필름 갤러리 오버레이 */}
        <AnimatePresence>
          {isGalleryOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                ...galleryWrapperStyle,
                width: isMobile ? '100%' : '60%', // 모바일은 전체 너비
                left: isMobile ? '0' : '20%',     // 모바일은 중앙 정렬 오프셋 제거
                borderLeft: isMobile ? 'none' : galleryWrapperStyle.borderLeft,
                borderRight: isMobile ? 'none' : galleryWrapperStyle.borderRight
              }}
            >
              <button onClick={() => setIsGalleryOpen(false)} style={closeButtonStyle}>
                CLOSE [X]
              </button>

              <div style={scrollContainerStyle}>
              <div style={{
                ...filmTrackStyle,
                columnCount: isMobile ? 1 : 2, // Grid 대신 컬럼 레이아웃 사용 (Masonry 효과)
                columnGap: isMobile ? '10px' : '20px',
              }}>
                {driveImages.map((file, index) => (
                  <motion.div 
                    key={file.id}
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }} // 스크롤 시 등장 효과
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                      ...filmFrameStyle,
                      breakInside: 'avoid', // 이미지가 컬럼 사이에서 잘리지 않도록 설정
                      marginBottom: isMobile ? '30px' : '60px', // 아이템 간 세로 간격
                      display: 'inline-block', // 컬럼 레이아웃 배치 최적화
                      width: '100%'
                    }}
                  >
                    <div style={frameLabelStyle}>PROJECT_SOURCE: {file.name}</div>
                    <img 
                      src={file.thumbnailLink ? file.thumbnailLink.replace('=s220', '=s1600') : `https://drive.google.com/uc?export=view&id=${file.id}`}
                      alt={file.name}
                      style={imageStyle}
                      referrerPolicy="no-referrer"
                    />
                    {file.description && (
                      <div style={captionStyle}>
                        {file.description}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={cornerDecoration}>SCALE 1:100 / CUSTOM SVG RENDER</div>
      </div>

      {!isGalleryOpen && <div style={scrollContentStyle} />}
    </>
  );
};

// --- 스타일링 정의 ---

const containerStyle = {
  height: '100vh', width: '100vw', position: 'fixed',
  top: 0, left: 0, display: 'flex', alignItems: 'center',
  justifyContent: 'center', zIndex: 1, perspective: '1000px',
};

const backgroundStyle = {
  position: 'absolute', width: '120%', height: '120%',
  backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center', zIndex: 1,
};

const overlayStyle = { position: 'relative', zIndex: 2, textAlign: 'center' };

const mainTitleStyle = {
  fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 12vw, 15rem)',
  textTransform: 'uppercase', margin: '0 0 40px 0', lineHeight: '1',
  whiteSpace: 'nowrap', color: '#ffffff',
  textShadow: `0 1px 0 #d9d9d9, 0 5px 0 #bfbfbf, 0 10px 20px rgba(0,0,0,0.4)`
};

const galleryWrapperStyle = {
  position: 'absolute', top: 0, left: '20%', width: '60%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 10, overflow: 'hidden',
  backdropFilter: 'blur(5px)',
  borderLeft: '1px solid rgba(255,255,255,0.1)',
  borderRight: '1px solid rgba(255,255,255,0.1)'
};

const filmTrackStyle = {
  width: '100%', margin: '0 auto', padding: '0 10px'
};

const filmFrameStyle = { borderLeft: '1px solid #333', paddingLeft: '15px' };

const imageStyle = {
  width: '100%', height: 'auto', display: 'block',
  filter: 'contrast(1.1) grayscale(10%)', borderRadius: '2px'
};

const captionStyle = {
  marginTop: '20px', fontSize: '13px', color: '#ccc',
  lineHeight: '1.6', whiteSpace: 'pre-wrap',
  fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '300'
};

const frameLabelStyle = {
  fontSize: '10px', color: '#555', letterSpacing: '2px', 
  marginBottom: '15px', fontFamily: 'monospace'
};

const closeButtonStyle = {
  position: 'absolute', top: '30px', right: '30px', background: 'none',
  border: 'none', color: '#fff', fontSize: '12px', letterSpacing: '3px',
  cursor: 'pointer', zIndex: 11
};

const subTitleStyle = { fontSize: '11px', letterSpacing: '10px', color: '#888', marginBottom: '20px', display: 'block' };
const lineStyle = { width: '80px', height: '1px', backgroundColor: '#444', margin: '0 auto 50px' };
const buttonStyle = { padding: '14px 45px', fontSize: '12px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #444', cursor: 'pointer', letterSpacing: '4px' };
const cornerDecoration = { position: 'absolute', bottom: '40px', right: '40px', fontSize: '10px', color: '#444', letterSpacing: '2px' };
const scrollContentStyle = { height: '200vh' };
const scrollContainerStyle = { height: '100%', overflowY: 'auto', padding: '120px 0', width: '100%' };

export default App;