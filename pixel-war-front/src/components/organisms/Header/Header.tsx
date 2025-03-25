import { Link } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";

const Header: FC = () => {
	const { isConnected, logout, user } = useAuth();

	const onLogout = () => {
		logout();
		window.location.href = '/grid';
	}

    return (
        <nav className="main-navbar">
            <ul>
                <li><Link to="/grid"><h3>LA GRILLE</h3></Link></li>
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
				<Box display='flex' alignItems='center' onClick={onLogout}>
					<AccountCircleIcon style={{marginRight: '0.5rem'}}/>
					<h3>Bienvenue, {user?.username}</h3>
				</Box>
            }
        </nav>
    );
}

export default Header;
