import { Button, CircularProgress, Container } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { TextField, Typography } from "../../atoms";
import { RegisterRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxiosService";
import { useAuth } from "../../../contexts/AuthContext";
import {useTheme} from "@mui/material/styles";

const RegisterForm: FC = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({
		password: '',
		confirmPassword: '',
		general: ''
	});
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const theme = useTheme();

	const validateForm = (): boolean => {
		return validatePassword() && validateConfirmPassword();
	};

	const validatePassword = (): boolean => {
		const isPasswordValid = password.length >= 8;
		setErrors(prevErrors => ({
			...prevErrors,
			password: isPasswordValid ? '' : 'Le mot de passe doit contenir au moins 8 caractères.'
		}));
		return isPasswordValid;
	};

	const validateConfirmPassword = (): boolean => {
		const arePasswordsIdentical = password === confirmPassword;
		setErrors(prevErrors => ({
			...prevErrors,
			confirmPassword: arePasswordsIdentical ? '' : 'La confirmation doit être identique au mot de passe'
		}));
		return arePasswordsIdentical;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		setErrors({ password: '', confirmPassword: '', general: '' });

		if (!validateForm()) {
			setLoading(false);
			return;
		}

		const data: RegisterRequestModel = { username, email, password };

		try {
			const response = await axiosService.post("/auth/signup", data);
			console.log(response)
			const responseData = response?.data;
			if (!responseData?.user || !responseData?.token) throw new Error();

			login(responseData.user, responseData.token, () => {
				window.location.href = '/grid';
			});
		} catch (error) {
			console.error('Erreur inconnue:', error);
			setErrors(prevErrors => ({
				...prevErrors,
				general: 'Une erreur à été retournée, veuillez-rééssayer.'
			}));
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setConfirmPassword(value);
		if (value === password && errors.confirmPassword) {
			setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
		}
	};

	return (
		<Container maxWidth="sm" style={{ marginTop: '50px' }}>
			<Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
				Créer mon compte
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Nom"
					variant="outlined"
					fullWidth
					margin="normal"
					type="text"
					value={username}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					required
					disabled={loading}
				/>
				<TextField
					label="Email"
					variant="outlined"
					fullWidth
					margin="normal"
					type="email"
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					required
					disabled={loading}
				/>
				<TextField
					label="Mot de passe"
					variant="outlined"
					fullWidth
					margin="normal"
					type="password"
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					required
					errorText={errors.password}
					disabled={loading}
				/>
				<TextField
					label="Confirmation du mot de passe"
					variant="outlined"
					fullWidth
					margin="normal"
					type="password"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					required
					errorText={errors.confirmPassword}
					disabled={loading}
				/>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					fullWidth
					sx={{ marginTop: '20px' }}
					disabled={loading}
				>
					{loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
				</Button>
				{errors.general && (
					<Typography variant="body1" style={{ marginTop: '16px', color: 'red' }}>
						{errors.general}
					</Typography>
				)}
			</form>
		</Container>
	);
};

export default RegisterForm;