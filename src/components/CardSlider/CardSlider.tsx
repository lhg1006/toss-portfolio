'use client';

import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
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

export const CardSlider: React.FC<CardSliderProps> = ({ children, showIndicators = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Get cards per view based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3; // desktop
    if (width >= 768) return 2;  // tablet
    return 1; // mobile
  };

  useEffect(() => {
    setIsClient(true);
    setCardsPerView(getCardsPerView());

    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, children.length - cardsPerView);
  const cardWidth = 100 / children.length; // Each card takes equal space in track
  const totalTrackWidth = (children.length / cardsPerView) * 100; // Track width relative to container

  // 클라이언트에서만 렌더링되도록 보장
  if (!isClient) {
    return (
      <SliderContainer>
        <SliderWrapper>
          <SliderTrack translateX={0} isDragging={false} totalWidth={100}>
            {children.map((child, index) => (
              <SlideItem key={index} cardWidth={100 / children.length}>{child}</SlideItem>
            ))}
          </SliderTrack>
        </SliderWrapper>
      </SliderContainer>
    );
  }

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, index));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartTranslate(currentIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    const containerWidth = sliderRef.current?.offsetWidth || 0;
    const threshold = containerWidth / cardsPerView / 4; // 25% of card width
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsDragging(false);
      } else if (diff < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
        setIsDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartTranslate(currentIndex);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const diff = e.touches[0].clientX - startX;
    const containerWidth = sliderRef.current?.offsetWidth || 0;
    const threshold = containerWidth / cardsPerView / 4;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsDragging(false);
      } else if (diff < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
        setIsDragging(false);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const translateX = -(currentIndex * cardWidth * cardsPerView);

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
        <SliderTrack 
          translateX={translateX}
          isDragging={isDragging}
          totalWidth={totalTrackWidth}
        >
          {children.map((child, index) => (
            <SlideItem key={index} cardWidth={cardWidth}>{child}</SlideItem>
          ))}
        </SliderTrack>
        
        <NavigationButton 
          direction="prev" 
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ←
        </NavigationButton>
        
        <NavigationButton 
          direction="next" 
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
        >
          →
        </NavigationButton>
      </SliderWrapper>

      {showIndicators && (
        <Indicators>
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