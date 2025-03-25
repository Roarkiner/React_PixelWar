import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/templates/Layout/Layout';
import { Authentication, GridPage } from './components/pages';
import theme from './theme';
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{
				backgroundColor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route path='/auth/:type' element={<Authentication />} />
							<Route path='/grid' element={<GridPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Box>
		</ThemeProvider>
	);
}

export default App;
