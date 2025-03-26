import React from 'react';

interface CoordinatesDisplayProps {
	coordinates: { x: number; y: number } | null;
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({ coordinates }) => {
	return (
		<div
			style={{
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

export default CoordinatesDisplay;