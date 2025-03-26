import { Box } from "@mui/material";
import { CoordinatesDisplay, LockButton, RecenterButton } from "../../atoms";
import ColorSelector from "../ColorSelector/ColorSelector";

interface GridBarProps {
	coordinates: { x: number; y: number } | null;
	isLocked: boolean;
	setIsLocked: (value: boolean) => void;
	recenterCallback: () => void;
	currentColor: string;
	recentColors: string[];
	onColorChange: (value: string) => void;
	shouldDisplayPixelControls: boolean;
}

const GridBar: React.FC<GridBarProps> = ({ coordinates, isLocked, setIsLocked, recenterCallback, currentColor, recentColors, onColorChange, shouldDisplayPixelControls }) => {
	return (<Box
		display="flex"
		position="fixed"
		bottom={20}
		left={0}
		width="100vw"
		justifyContent="center"
		alignItems="end"
	>
		<Box
			onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
			sx={{ position: "absolute", left: "20px" }}
		>
			<RecenterButton recenterCallback={recenterCallback} />
		</Box>

		<Box
			display={shouldDisplayPixelControls ? "flex" : "none"}
			flexDirection="column"
			justifyContent="center"
			onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
			onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
		>
			<LockButton isLocked={isLocked} setIsLocked={setIsLocked} />
			{!isLocked &&
				<ColorSelector currentColor={currentColor} recentColors={recentColors} onColorChange={onColorChange} />
			}
		</Box>

		<Box sx={{ position: "absolute", right: "20px" }}>
			<CoordinatesDisplay coordinates={coordinates} />
		</Box>
	</Box>);
}

export default GridBar;