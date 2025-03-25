import { LoginForm } from "../../molecules"
import { LinkButton } from "../../atoms";
import { Box } from "@mui/material";
import { FC } from "react";
import { useTheme } from "@mui/material/styles";

const Login: FC = () => {
	const theme = useTheme();

	return (<>
		<LoginForm />
		<Box display="flex" justifyContent="center">
			<LinkButton to="/auth/register" color="secondary" variant="outlined" size="small"
				style={{ padding: '0.5rem 1rem', marginTop: '1rem', width: '25%', backgroundColor: theme.palette.secondary.main }}>
				Créer un compte
			</LinkButton>
		</Box>
	</>)
}

export default Login;