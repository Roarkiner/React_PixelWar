import { RegisterForm } from "../../molecules";
import { LinkButton } from "../../atoms";
import { Box } from "@mui/material";
import { FC } from "react";
import { useTheme } from "@mui/material/styles";

const Register: FC = () => {
	const theme = useTheme();

	return (<>
		<RegisterForm />
		<Box display="flex" justifyContent="center">
			<LinkButton to="/auth/login" color="secondary" variant="outlined" size="small"
				style={{ padding: '0.5rem 1rem', marginTop: '1rem', width: '25%', backgroundColor: theme.palette.secondary.main }}>
				Me connecter
			</LinkButton>
		</Box>
	</>)
}

export default Register;