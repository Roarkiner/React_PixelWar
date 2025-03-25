import React from 'react';
import { Button } from '../../atoms';

interface RecenterButtonProps {
	recenterCallback: () => void;
}

const RecenterButton: React.FC<RecenterButtonProps> = ({ recenterCallback }) => {
	return (
		<Button
			variant="contained"
			color="primary"
			onClick={recenterCallback}
			style={{
				position: 'fixed',
				bottom: '20px',
				left: '20px',
			}}
		>
			Retrouver la grille
		</Button>
	);
};

export default RecenterButton;