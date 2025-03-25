import React from 'react';

interface GridBarProps {
  coordinates: { x: number; y: number } | null;
}

const GridBar: React.FC<GridBarProps> = ({ coordinates }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '25px',
        fontSize: '14px',
        display: coordinates ? 'block' : 'none',
      }}
    >
      {coordinates ? `${coordinates.x}, ${coordinates.y}` : ''}
    </div>
  );
};

export default GridBar;