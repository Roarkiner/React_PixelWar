import React, { useRef, useState, useEffect } from 'react';
import { GridBar, RecenterButton } from '../../molecules';
import { CanvaPixel } from '../../../typings/Pixel';

interface GridProps {
	canvaPixels: CanvaPixel[];
}

const Grid: React.FC<GridProps> = ({ canvaPixels }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [zoom, setZoom] = useState(1);
	const gridSize = { x: 100, y: 100 };
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [hoveredPixel, setHoveredPixel] = useState<{ x: number; y: number } | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	// const [lastMousePos, setLastMousePos] = useState<{ x: number; y: number } | null>(null);

	const [pixelData, setPixelData] = useState<CanvaPixel[]>(() => {
		console.log(canvaPixels);
		return canvaPixels.map(pixel => ({ ...pixel }));
	});

	const recenterGrid = () => {
		setOffset({ x: 0, y: 0 });
	};

	useEffect(() => {
		setPixelData(canvaPixels.map(pixel => ({ ...pixel })));
	}, [canvaPixels]);

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
		updateCanvasSize();
		window.addEventListener('resize', updateCanvasSize);
		return () => window.removeEventListener('resize', updateCanvasSize);
	}, []);

	useEffect(() => {
		drawGrid();
	}, [zoom, offset, hoveredPixel, pixelData]);

	const handleMouseDown = () => {
		setIsDragging(true);
		// setLastMousePos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		// setLastMousePos(null);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging) {
			const deltaX = e.movementX;
			const deltaY = e.movementY;
			setOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
			// setLastMousePos({ x: e.clientX, y: e.clientY });
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

	const handleClick = (e: React.MouseEvent) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const pixelSize = 50 * zoom;
		const x = Math.floor((mouseX - offset.x) / pixelSize);
		const y = Math.floor((mouseY - offset.y) / pixelSize);
		if (x >= 0 && x < gridSize.x && y >= 0 && y < gridSize.y) {
			const pixelToReplace = pixelData.find(pixel => pixel.positionX === x && pixel.positionY === y);
			if (pixelToReplace) {

			} else {

			}
			setPixelData(prevData => {
				const index = prevData.findIndex(pixel => pixel.positionX === x && pixel.positionY === y);
				if (index !== -1) {
					const newData = [...prevData];
					newData[index] = { ...newData[index], color: 'red' };
					return newData;
				} else {
					return [...prevData, { positionX: x, positionY: y, color: 'red' }];
				}
			})
		}
	};

	const MAX_ZOOM = 5;
	const MIN_ZOOM = 0.1;
	const ZOOM_SENSITIVITY = 0.005;
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
				overflow: 'hidden'
			}}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onClick={handleClick}
			onWheel={handleMouseWheel}
		>
			<canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
			<RecenterButton recenterCallback={recenterGrid} />
			<GridBar coordinates={hoveredPixel} />
		</div>
	);
};

export default Grid;