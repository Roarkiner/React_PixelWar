import { CircularProgress, Container } from "@mui/material";
import { Button, TextField, Typography } from "../../atoms";
import { ChangeEvent, FC, useState } from "react";
import { LoginRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxiosService";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "@mui/material/styles";

const LoginForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState('');
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const theme = useTheme();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const data: LoginRequestModel = {
			email: email,
			password: password
		}

		try {
			const response = await axiosService.post("/auth/login", data);
			const reponseData = response?.data;
			if (reponseData?.user == null || reponseData?.user == null)
				throw new Error();

			login(reponseData.user, reponseData.token, () => {
				window.location.href = '/';
			});
		} catch (error) {
			setErrors('Une erreur à été retournée, veuillez-rééssayer.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="sm" style={{ marginTop: '50px' }}>
			<Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
				Connexion
			</Typography>
			<form onSubmit={handleSubmit}>
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
				{!!errors && (
					<Typography variant="body1" type={'error'} style={{ marginTop: '16px' }}>
						{errors}
					</Typography>
				)}
			</form>
		</Container>
	)
}

export default LoginForm;