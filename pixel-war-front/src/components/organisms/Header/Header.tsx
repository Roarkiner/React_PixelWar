import { Link } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";
import { Button } from "../../atoms";

const Header: FC = () => {
	const { isConnected, logout, user } = useAuth();

	const onLogout = () => {
		logout();
		window.location.href = '/';
	}

    return (
        <nav className="main-navbar">
            <ul>
                <li><Link to="/"><h3>LA GRILLE</h3></Link></li>
            </ul>
            {!isConnected() ?
                <div className="header-auth-buttons">
                    <Link to="/auth/login">
                        <h3>
                            CONNEXION
                        </h3>
                    </Link>
                </div>
                :
				<Button variant="outlined">
					<Box display='flex' alignItems='center' onClick={onLogout}>
						<AccountCircleIcon style={{marginRight: '0.5rem'}}/>
						<h3>Bienvenue, {user?.username}</h3>
					</Box>
				</Button>
            }
        </nav>
    );
}

export default Header;
