'use client';

import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';

interface CardSliderProps {
  children: React.ReactNode[];
  showIndicators?: boolean;
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 220px;
  }
`;

const SliderTrack = styled.div<{ translateX: number; isDragging: boolean; totalWidth: number }>`
  display: flex;
  transform: translateX(${(props) => props.translateX}%);
  transition: ${(props) => props.isDragging ? 'none' : 'transform 0.3s ease-out'};
  user-select: none;
  height: 100%;
  width: ${(props) => props.totalWidth}%;
`;

const SlideItem = styled.div<{ cardWidth: number }>`
  flex: none;
  padding: ${theme.spacing.sm} ${theme.spacing.sm};
  box-sizing: border-box;
  width: ${(props) => props.cardWidth}%;
  min-width: 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm} ${theme.spacing.xs};
  }
`;

const NavigationButton = styled.button<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.white};
  border: none;
  box-shadow: ${theme.shadows.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  z-index: 10;
  transition: ${theme.effects.transition};
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: ${theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: translateY(-50%);
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.md};
`;

const Indicator = styled.button<{ active: boolean }>`
  width: ${(props) => props.active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${(props) => props.active ? theme.colors.toss.blue : theme.colors.gray[300]};
  cursor: pointer;
  transition: ${theme.effects.transition};
  
  &:hover {
    opacity: 0.8;
  }
`;

// 스켈레톤 UI 컴포넌트들
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonCard = styled.div`
  background: ${theme.colors.backgrounds.glassBlur};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  min-height: 200px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    background-size: 200px 100%;
    animation: ${shimmer} 1.5s infinite;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 180px;
    padding: ${theme.spacing.lg};
  }
`;

const SkeletonElement = styled.div<{ width?: string; height?: string; borderRadius?: string }>`
  background: rgba(255, 255, 255, 0.7);
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '16px'};
  border-radius: ${props => props.borderRadius || '8px'};
  margin-bottom: ${theme.spacing.sm};
  position: relative;
  z-index: 1;
`;

const SkeletonSlider = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    & > div:nth-of-type(n+4) {
      display: none;
    }
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: ${theme.breakpoints.desktop}) {
    & > div:nth-of-type(n+3) {
      display: none;
    }
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    & > div:nth-of-type(n+2) {
      display: none;
    }
  }
`;

export const CardSlider: React.FC<CardSliderProps> = ({ children, showIndicators = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Get cards per view based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3; // desktop
    if (width >= 768) return 2;  // tablet
    return 1; // mobile
  };

  useEffect(() => {
    // 초기 설정 즉시 적용
    const initialCardsPerView = getCardsPerView();
    setCardsPerView(initialCardsPerView);

    // 짧은 딜레이 후 로딩 완료 (레이아웃 안정화)
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    const handleResize = () => {
      const newCardsPerView = getCardsPerView();
      setCardsPerView(newCardsPerView);
      // 화면 크기 변경 시 인덱스 조정
      if (currentIndex > children.length - newCardsPerView) {
        setCurrentIndex(Math.max(0, children.length - newCardsPerView));
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, children.length]);

  const maxIndex = Math.max(0, children.length - cardsPerView);
  const cardWidth = 100 / cardsPerView;
  const totalTrackWidth = children.length * cardWidth;

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, index));
  };

  const animation = () => {
    if (sliderRef.current) {
      const track = sliderRef.current.querySelector('[data-slider-track]') as HTMLElement;
      if (track) {
        track.style.transform = `translateX(${currentTranslate}px)`;
      }
    }
    if (isDragging) {
      animationRef.current = requestAnimationFrame(animation);
    }
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    const currentTranslateX = -currentIndex * (sliderRef.current?.offsetWidth || 0) / cardsPerView;
    setCurrentTranslate(currentTranslateX);
    setPrevTranslate(currentTranslateX);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animation);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    const currentX = clientX;
    const diff = currentX - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const containerWidth = sliderRef.current?.offsetWidth || 0;
    const cardPixelWidth = containerWidth / cardsPerView;
    const moved = currentTranslate - prevTranslate;
    const threshold = cardPixelWidth / 4;
    
    if (moved < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (moved > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    
    setIsDragging(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // 일관된 translateX 계산
  const translateX = -(currentIndex * cardWidth);

  return (
    <SliderContainer>
      <SliderWrapper
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!isLoaded ? (
          <SkeletonSlider>
            {Array.from({ length: Math.min(children.length, cardsPerView) }, (_, index) => (
              <SkeletonCard key={`skeleton-${index}`}>
                <SkeletonElement height="24px" width="70%" borderRadius="8px" />
                <SkeletonElement height="16px" width="50%" borderRadius="6px" />
                <div style={{ marginTop: '24px' }}>
                  <SkeletonElement height="40px" width="90%" borderRadius="12px" />
                </div>
                <div style={{ marginTop: '16px' }}>
                  <SkeletonElement height="32px" width="60%" borderRadius="16px" />
                </div>
              </SkeletonCard>
            ))}
          </SkeletonSlider>
        ) : (
          <>
            <SliderTrack 
              data-slider-track
              translateX={translateX}
              isDragging={isDragging}
              totalWidth={totalTrackWidth}
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: isDragging ? 'none' : 'all 0.5s ease-out',
                transform: isDragging ? undefined : `translateX(${translateX}%)`
              }}
            >
              {children.map((child, index) => (
                <SlideItem key={index} cardWidth={cardWidth}>{child}</SlideItem>
              ))}
            </SliderTrack>
            
            <NavigationButton 
              direction="prev" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.2s'
              }}
            >
              ←
            </NavigationButton>
            
            <NavigationButton 
              direction="next" 
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.2s'
              }}
            >
              →
            </NavigationButton>
          </>
        )}
      </SliderWrapper>
      
      {showIndicators && maxIndex > 0 && isLoaded && (
        <Indicators
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.3s'
          }}
        >
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </Indicators>
      )}
    </SliderContainer>
  );
};