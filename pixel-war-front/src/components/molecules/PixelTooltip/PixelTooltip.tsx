import React, { useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PixelInfo } from '../../../typings/Pixel';

interface PixelTooltipProps {
	info: PixelInfo;
	onClose: () => void;
}

const PixelTooltip: React.FC<PixelTooltipProps> = ({ info, onClose }) => {
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleDocumentClick = (e: MouseEvent) => {
			if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('click', handleDocumentClick);
		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [onClose]);

	return (
		<Box
			ref={tooltipRef}
			onClick={(e) => e.stopPropagation()}
			onMouseDown={(e) => e.stopPropagation()}
			onMouseUp={(e) => e.stopPropagation()}
			sx={{
				position: 'fixed',
				top: 100,
				left: 10,
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				color: 'white',
				p: 2,
				borderRadius: '4px',
				zIndex: 2000,
				minWidth: '200px',
				cursor: 'auto'
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Box sx={{ fontWeight: 'bold' }}>Infos du Pixel</Box>
				<IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Box>
			<Box>
				<div>Position: ({info.positionX}, {info.positionY})</div>
				<div>Couleur: {info.color}</div>
				<div>Posé le: {info.last_painted_at}</div>
				<div>Propriétaire: {info.owner}</div>
			</Box>
		</Box>
	);
};

export default PixelTooltip;