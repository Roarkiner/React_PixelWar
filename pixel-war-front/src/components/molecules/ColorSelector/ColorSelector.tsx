import React, { useState, useEffect } from 'react';
import { Box, IconButton, Popover, TextField } from '@mui/material';
import { HexColorPicker } from 'react-colorful';

interface ColorSelectorProps {
	currentColor: string;
	recentColors: string[];
	onColorChange: (value: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ currentColor, recentColors, onColorChange }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [inputValue, setInputValue] = useState(currentColor);

	useEffect(() => {
		setInputValue(currentColor);
	}, [currentColor]);

	const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClosePicker = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'color-picker-popover' : undefined;

	const handleColorPickerChange = (newColor: string) => {
		onColorChange(newColor);
	};

	const handleRecentColorClick = (color: string) => {
		onColorChange(color);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputBlur = () => {
		const hexRegex = /^#[0-9A-Fa-f]{6}$/;
		if (hexRegex.test(inputValue)) {
			onColorChange(inputValue);
		} else {
			setInputValue(currentColor);
		}
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
					'&:hover': {
						backgroundColor: currentColor,
						boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
					}
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
					<HexColorPicker color={currentColor} onChange={handleColorPickerChange} />
				</Box>
			</Popover>
			<TextField
				value={inputValue}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				variant="outlined"
				size="small"
				sx={{ marginLeft: 2, width: '120px', backgroundColor: 'white' }}
			/>
			{recentColors.length > 0 && (
				<Box
					display="flex"
					alignItems="center"
					marginLeft={2}
					padding="2px"
					border={1}
					borderRadius={10}
					sx={{ backgroundColor: 'lightgrey' }}
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
								'&:hover': {
									backgroundColor: color,
									boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
								}
							}}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};

export default ColorSelector;