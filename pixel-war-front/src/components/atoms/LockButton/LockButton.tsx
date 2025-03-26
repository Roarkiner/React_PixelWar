import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '../Button/Button';
import { useState } from 'react';

interface LockButtonProps {
	isLocked: boolean;
	setIsLocked: (value: boolean) => void;
}

const LockButton: React.FC<LockButtonProps> = ({ isLocked, setIsLocked }) => {
	const [isHovered, setIsHovered] = useState(false);

	const icon = isHovered 
	  ? (isLocked ? <LockOpenIcon /> : <LockIcon />)
	  : (isLocked ? <LockIcon /> : <LockOpenIcon />);

	return (<Button
		variant='contained'
		color='primary'
		onClick={() => setIsLocked(!isLocked)}
		onMouseEnter={() => setIsHovered(true)}
      	onMouseLeave={() => setIsHovered(false)}
		style={{
			border: 'none',
			borderRadius: '20px',
			padding: '10px',
			cursor: 'pointer',
			zIndex: 1000,
			display: 'flex',
			alignItems: 'center',
			gap: '5px'
		}}
	>
		{icon}
		{isLocked ? 'Pose de pixel verrouillé' : ''}
	</Button>);
}

export default LockButton;