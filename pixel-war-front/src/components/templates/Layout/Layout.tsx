import './Layout.css';
import Navbar from "../../organisms/Header/Header";
import { Outlet } from "react-router-dom";
import { FC } from "react";

const Layout: FC = () => {
	return (
		<>
			<Navbar />
			<div className="main-content">
				<Outlet />
			</div>
		</>
	)
}

export default Layout;
