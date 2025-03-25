import React, { useState, useEffect } from 'react';
import axiosService from "../../../services/AxiosService";
import { Grid } from '../../organisms';
import { CanvaPixel } from '../../../typings/Pixel';

const GridPage: React.FC = () => {
	const [gridPixels, setGridPixels] = useState<CanvaPixel[]>([]);

	useEffect(() => {
		const fetchGrid = async () => {
			try {
				const response = await axiosService.get<CanvaPixel[]>('/api/grid');
				setGridPixels(response.data);
				console.log(response)
			} catch (error) {
				console.error('Erreur lors de la récupération des pixels', error);
			}
		};

		fetchGrid();
	}, []);

	return <Grid canvaPixels={gridPixels} />;
};

export default GridPage;