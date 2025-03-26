import React from 'react';
import { Button } from '../../atoms';

interface RecenterButtonProps {
	recenterCallback: () => void;
}

const RecenterButton: React.FC<RecenterButtonProps> = ({ recenterCallback }) => {
	return (
		<Button
			variant="contained"
			color="secondary"
			onClick={recenterCallback}
		>
			Recentrer la grille
		</Button>
	);
};

export default RecenterButton;