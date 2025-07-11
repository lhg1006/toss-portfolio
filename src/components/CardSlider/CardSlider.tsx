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
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 220px;
  }
`;

const SliderTrack = styled.div<{ offset: number; isDragging?: boolean }>`
  display: flex;
  height: 100%;
  transform: translateX(${props => props.offset}px);
  transition: ${props => props.isDragging ? 'none' : 'transform 0.3s ease-out'};
  will-change: transform;
`;

const SlideItem = styled.div`
  flex: 0 0 auto;
  padding: 0 ${theme.spacing.sm};
  box-sizing: border-box;
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    width: calc(100% / 3);
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: ${theme.breakpoints.desktop}) {
    width: calc(100% / 2);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 ${theme.spacing.xs};
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

// 스켈레톤 UI
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

export const CardSlider: React.FC<CardSliderProps> = ({ children, showIndicators = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate cards per view
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  const [cardsPerView, setCardsPerView] = useState(1); // 초기값을 1로 고정
  const maxIndex = Math.max(0, children.length - cardsPerView);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    const handleResize = () => {
      const newCardsPerView = getCardsPerView();
      setCardsPerView(newCardsPerView);
      const containerWidth = sliderRef.current?.offsetWidth || 0;
      const cardWidth = containerWidth / newCardsPerView;
      setOffset(-currentIndex * cardWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, isMounted]);

  const updateSliderPosition = (index: number) => {
    const containerWidth = sliderRef.current?.offsetWidth || 0;
    const cardWidth = containerWidth / cardsPerView;
    setOffset(-index * cardWidth);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      updateSliderPosition(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      updateSliderPosition(currentIndex + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(offset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft || 0);
    const walk = x - startX;
    setOffset(scrollLeft + walk);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const containerWidth = sliderRef.current?.offsetWidth || 0;
    const cardWidth = containerWidth / cardsPerView;
    const draggedCards = Math.round(-offset / cardWidth);
    const newIndex = Math.max(0, Math.min(maxIndex, draggedCards));
    updateSliderPosition(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(offset);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (trackRef.current?.offsetLeft || 0);
    const walk = x - startX;
    setOffset(scrollLeft + walk);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  if (!isMounted || !isLoaded) {
    return (
      <SliderContainer>
        <SliderWrapper>
          <SliderTrack offset={0} isDragging={false}>
            {Array.from({ length: 1 }, (_, i) => (
              <SlideItem key={`skeleton-${i}`}>
                <SkeletonCard>
                  <SkeletonElement height="24px" width="70%" borderRadius="8px" />
                  <SkeletonElement height="16px" width="50%" borderRadius="6px" />
                  <div style={{ marginTop: '24px' }}>
                    <SkeletonElement height="40px" width="90%" borderRadius="12px" />
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <SkeletonElement height="32px" width="60%" borderRadius="16px" />
                  </div>
                </SkeletonCard>
              </SlideItem>
            ))}
          </SliderTrack>
        </SliderWrapper>
      </SliderContainer>
    );
  }

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
        <SliderTrack ref={trackRef} offset={offset} isDragging={isDragging}>
          {children.map((child, index) => (
            <SlideItem key={index}>{child}</SlideItem>
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
      
      {showIndicators && maxIndex > 0 && (
        <Indicators>
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => updateSliderPosition(index)}
            />
          ))}
        </Indicators>
      )}
    </SliderContainer>
  );
};