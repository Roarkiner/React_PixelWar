import React, { useState, useEffect } from 'react';
import axiosService from "../../../services/AxiosService";
import { Grid } from '../../organisms';
import { CanvaPixel } from '../../../typings/Pixel';
import { useAuth } from '../../../contexts/AuthContext';

const GridPage: React.FC = () => {
	const [gridPixels, setGridPixels] = useState<CanvaPixel[]>([]);
	const [userColors, setUserColors] = useState<string[]>([]);
	const { isConnected } = useAuth();

	useEffect(() => {
		const fetchGrid = async () => {
			try {
				const response = await axiosService.get<CanvaPixel[]>('/api/grid');
				setGridPixels(response.data);
			} catch (error) {
				console.error('Erreur lors de la récupération des pixels', error);
			}
		};

		fetchGrid();

		if (isConnected()) {
			const fetchUserColors = async () => {
				try {
					const response = await axiosService.get('/api/colors');
					setUserColors(response.data);
				} catch (error) {
					console.error('Erreur lors de la récupération des couleurs de l\'utilisateur', error);
				}
			};
	
			fetchUserColors();
		}
	}, []);

	return <Grid canvaPixels={gridPixels} userColors={userColors} setUserColors={setUserColors} />;
};

export default GridPage;