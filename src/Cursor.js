import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CustomCursor = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: ${props => props.blendMode || 'difference'};
  transform: translate(-50%, -50%);
  transition: 
    transform 0.1s ease-out, 
    width 0.3s ease, 
    height 0.3s ease, 
    opacity 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    inset: ${props => props.size * 0.25}px;
    border-radius: 50%;
    background: ${props => props.color || 'white'};
    opacity: ${props => props.opacity || 0.8};
  }
`;

const Cursor = ({
  size = 40,
  color = 'white',
  opacity = 0.8,
  blendMode = 'difference',
  hoverSize = 80,
  hoverText = null,
  hoverTextColor = 'black',
  hoverTextSize = 12
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);
  
  return (
    <>
      <CustomCursor
        ref={cursorRef}
        size={isHovering ? hoverSize : size}
        color={color}
        opacity={opacity}
        blendMode={blendMode}
      >
        {hoverText && isHovering && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: hoverTextColor,
            fontWeight: 'bold',
            fontSize: `${hoverTextSize}px`,
            mixBlendMode: 'difference',
            zIndex: 10,
          }}>
            {hoverText}
          </div>
        )}
      </CustomCursor>
    </>
  );
};

export default Cursor;