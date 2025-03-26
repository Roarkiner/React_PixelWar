import React, { useRef, useState, useEffect } from 'react';
import { CanvaPixel } from '../../../typings/Pixel';
import { GridBar } from '../../molecules';
import axiosService from '../../../services/AxiosService';
import { useAuth } from '../../../contexts/AuthContext';

interface GridProps {
	canvaPixels: CanvaPixel[];
	userColors: string[];
	setUserColors: (value: React.SetStateAction<string[]>) => void;
}

const MAX_ZOOM = 5;
const MIN_ZOOM = 0.1;
const ZOOM_SENSITIVITY = 0.005;

const Grid: React.FC<GridProps> = ({ canvaPixels, userColors, setUserColors }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [zoom, setZoom] = useState(1);
	const gridSize = { x: 100, y: 100 };
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [hoveredPixel, setHoveredPixel] = useState<{ x: number; y: number } | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isLocked, setIsLocked] = useState(true);
	const [currentColor, setCurrentColor] = useState(userColors[0] || "#FFFFFF");
	const { isConnected } = useAuth();

	const [pixelData, setPixelData] = useState<CanvaPixel[]>(() => {
		return canvaPixels.map(pixel => ({ ...pixel }));
	});

	const recenterGrid = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const newZoom = MIN_ZOOM;
		const pixelSize = 50 * newZoom;
		const gridWidth = gridSize.x * pixelSize;
		const gridHeight = gridSize.y * pixelSize;
		const newOffsetX = (canvas.width - gridWidth) / 2;
		const newOffsetY = (canvas.height - gridHeight) / 2;
		setZoom(newZoom);
		setOffset({ x: newOffsetX, y: newOffsetY });
	};

	const updateCanvasSize = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	const drawGrid = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const pixelSize = 50 * zoom;

		for (let y = 0; y < gridSize.y; y++) {
			for (let x = 0; x < gridSize.x; x++) {
				let color = "#FFF";
				const pixel = pixelData.find(pixel => pixel.positionX === x && pixel.positionY === y);
				if (pixel)
					color = pixel.color;
				ctx.fillStyle = color;
				ctx.fillRect(
					x * pixelSize + offset.x,
					y * pixelSize + offset.y,
					pixelSize,
					pixelSize
				);

				if (hoveredPixel && hoveredPixel.x === x && hoveredPixel.y === y) {
					ctx.strokeStyle = 'black';
					ctx.lineWidth = 2;
					ctx.strokeRect(
						x * pixelSize + offset.x,
						y * pixelSize + offset.y,
						pixelSize,
						pixelSize
					);
				}
			}
		}
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.strokeRect(
			offset.x,
			offset.y,
			gridSize.x * pixelSize,
			gridSize.y * pixelSize
		);
	};

	useEffect(() => {
		if (userColors.length > 0) {
			setCurrentColor(userColors[0]);
		}
	}, [userColors]);

	useEffect(() => {
		recenterGrid();
	}, []);

	useEffect(() => {
		setPixelData(canvaPixels.map(pixel => ({ ...pixel })));
	}, [canvaPixels]);

	useEffect(() => {
		updateCanvasSize();
		window.addEventListener('resize', updateCanvasSize);
		return () => window.removeEventListener('resize', updateCanvasSize);
	}, []);

	useEffect(() => {
		drawGrid();
	}, [zoom, offset, hoveredPixel, pixelData]);

	const handleMouseDown = () => {
		if (!isLocked) return;
		setIsDragging(true);
	};

	const handleMouseUp = () => {
		if (!isLocked) return;
		setIsDragging(false);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging) {
			const deltaX = e.movementX;
			const deltaY = e.movementY;
			setOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
		} else {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;
			const pixelSize = 50 * zoom;
			const x = Math.floor((mouseX - offset.x) / pixelSize);
			const y = Math.floor((mouseY - offset.y) / pixelSize);
			if (x >= 0 && x < gridSize.x && y >= 0 && y < gridSize.y) {
				setHoveredPixel({ x, y });
			} else {
				setHoveredPixel(null);
			}
		}
	};

	const handleClick = async (e: React.MouseEvent) => {
		if (isLocked || !isConnected()) return;

		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const pixelSize = 50 * zoom;
		const x = Math.floor((mouseX - offset.x) / pixelSize);
		const y = Math.floor((mouseY - offset.y) / pixelSize);
		if (x >= 0 && x < gridSize.x && y >= 0 && y < gridSize.y) {
			const previousPixel = pixelData.find(
				(pixel) => pixel.positionX === x && pixel.positionY === y
			);

			setPixelData((prevData) => {
				const index = prevData.findIndex(
					(pixel) => pixel.positionX === x && pixel.positionY === y
				);
				if (index !== -1) {
					const newData = [...prevData];
					newData[index] = { ...newData[index], color: currentColor };
					return newData;
				} else {
					return [...prevData, { positionX: x, positionY: y, color: currentColor }];
				}
			});

			setUserColors(prevColors => {
				const index = prevColors.findIndex(c => c.toLowerCase() === currentColor.toLowerCase());
				let newColors = [...prevColors];
				if (index !== -1) {
					newColors.splice(index, 1);
				}
				newColors.unshift(currentColor);
				if (newColors.length > 10) {
					newColors = newColors.slice(0, 10);
				}
				return newColors;
			});

			try {
				await axiosService.post('/api/pixel', {
					positionX: x,
					positionY: y,
					color: currentColor
				});
			} catch (error) {
				setPixelData(prevData => {
					const index = prevData.findIndex(
						(pixel) => pixel.positionX === x && pixel.positionY === y
					);
					if (index !== -1) {
						if (previousPixel) {
							const newData = [...prevData];
							newData[index] = previousPixel;
							return newData;
						} else {
							return prevData.filter(
								(pixel) => !(pixel.positionX === x && pixel.positionY === y)
							);
						}
					}
					return prevData;
				});
			}
		}
	};

	const handleMouseWheel = (e: React.WheelEvent) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const newZoom = Math.max(MIN_ZOOM, Math.min(zoom - e.deltaY * ZOOM_SENSITIVITY, MAX_ZOOM));
		if (newZoom === zoom) return;
		const scaleFactor = newZoom / zoom;
		const offsetX = mouseX - offset.x;
		const offsetY = mouseY - offset.y;
		const newOffsetX = mouseX - offsetX * scaleFactor;
		const newOffsetY = mouseY - offsetY * scaleFactor;
		setZoom(newZoom);
		setOffset({ x: newOffsetX, y: newOffsetY });
	};

	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '100vh',
				overflow: 'hidden',
				cursor: (isLocked || !isConnected()) ? "move" : "auto",
			}}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onClick={handleClick}
			onWheel={handleMouseWheel}
		>
			<canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
			<GridBar
				coordinates={hoveredPixel}
				isLocked={isLocked}
				setIsLocked={setIsLocked}
				recenterCallback={recenterGrid}
				currentColor={currentColor}
				recentColors={userColors}
				onColorChange={setCurrentColor}
				shouldDisplayPixelControls={isConnected()} />
		</div>
	);
};

export default Grid;