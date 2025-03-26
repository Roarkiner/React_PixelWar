import React, { useState } from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import { HexColorPicker } from 'react-colorful';

interface ColorSelectorProps {
	currentColor: string;
	recentColors: string[];
	onColorChange: (value: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ currentColor, recentColors, onColorChange }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePicker = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'color-picker-popover' : undefined;

	const handleColorChange = (newColor: string) => {
		onColorChange(newColor);
	};

	const handleRecentColorClick = (color: string) => {
		onColorChange(color);
	};

	return (
		<Box display="flex" alignItems="center" justifyContent="center" marginTop={1}>
			<IconButton
				onClick={handleOpenPicker}
				sx={{
					width: 40,
					height: 40,
					backgroundColor: currentColor,
					borderRadius: '50%',
					border: '2px solid #000',
				}}
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={(event) => {
					if ('stopPropagation' in event && typeof event.stopPropagation === 'function') {
						event.stopPropagation();
					}
					handleClosePicker();
				}}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<Box
					padding={2}
					onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
					onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
					onMouseUp={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
				>
					<HexColorPicker color={currentColor} onChange={handleColorChange} />
				</Box>
			</Popover>
			{recentColors.length > 0 &&
				<Box
					display="flex"
					alignItems="center"
					marginLeft={2}
					padding="2px"
					border={1}
					borderRadius={10}
					sx={{
						backgroundColor: 'lightgrey'
					}}
				>
					{recentColors.map((color, index) => (
						<Box
							key={index}
							onClick={() => handleRecentColorClick(color)}
							sx={{
								width: 40,
								height: 40,
								backgroundColor: color,
								borderRadius: '50%',
								border: '2px solid #000',
								marginRight: index < recentColors.length - 1 ? '2px' : 0,
								cursor: 'pointer',
							}}
						/>
					))}
				</Box>
			}
		</Box>
	);
};

export default ColorSelector;
