import { TextField as MuiTextField, Typography } from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/system';
import { useTheme } from "@mui/material/styles";

interface CustomTextFieldProps {
	errorText?: string;

	[key: string]: any;
}

const StyledTextField = styled(MuiTextField)({
	marginBottom: '0px',
});

const TextField: FC<CustomTextFieldProps> = ({ errorText, ...other }) => {
	const theme = useTheme();

	return (
		<>
			<StyledTextField
				{...other}
				error={!!errorText}
				sx={{
					bgcolor: theme.palette.custom.input, // Fond personnalisé
					color: theme.palette.custom.inputText, // Couleur générale
					'& .MuiInputBase-input': {
						color: theme.palette.custom.inputText, // Texte de l'input
					},
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: theme.palette.custom.inputText, // Bordure normale
						},
						'&:hover fieldset': {
							borderColor: theme.palette.custom.inputText, // Bordure au survol
						},
						'&.Mui-focused fieldset': {
							borderColor: theme.palette.custom.inputText, // Bordure quand focus
						},
					},
					'& .MuiInputLabel-root': {
						color: theme.palette.custom.inputText, // Couleur du label au repos
					},
					'& .MuiInputLabel-root:hover': {
						color: theme.palette.custom.inputText, // Couleur du label au survol
					},
					'& .MuiInputLabel-root.Mui-focused': {
						color: theme.palette.custom.inputText, // Couleur du label quand focus
					},
				}}
			/>

			<Typography
				component="p"
				variant="body2"
				sx={{
					fontSize: '0.75rem',
					margin: '3px 14px 0',
					color: !!errorText ? '#d32f2f' : 'transparent',
					userSelect: 'none',
					height: '1em'
				}}
				dangerouslySetInnerHTML={{ __html: errorText || '' }}
			>
			</Typography>
		</>
	);
};

export default TextField;
