import { Card, CardContent, CardMedia, SxProps, Theme } from "@mui/material";
import { Typography } from "../index";
import { FC, ReactNode } from "react";
import { styled } from "@mui/system";

interface CustomCardProps {
	cardSize?: { width?: number; height?: number };
	pictureHeight?: number;
	title?: string | ReactNode;
	description?: string | ReactNode;
	altPicture?: string;
	pictureStyle?: SxProps<Theme>;
	cardContentStyle?: SxProps<Theme>;

	[key: string]: any;
}

const CardWithPictureWithoutAction: FC<CustomCardProps> = ({
	cardSize,
	pictureHeight,
	altPicture,
	title,
	description,
	pictureStyle,
	cardContentStyle,
	...other
}) => {
	const StyledCard = styled(Card)({
		width: `${cardSize?.width}px`,
		height: `${cardSize?.height}px`,
		display: "flex",
		flexDirection: "column",
	});

	return (
		<StyledCard {...other}>
			<CardMedia
				sx={{
					maxWidth: "100%",
					maxHeight: "100%",
					objectFit: "contain",
					...pictureStyle,
				}}
				component="img"
				height={pictureHeight ?? (cardSize?.height ? cardSize.height * 0.66 : undefined)}
				image={"/Images/gourde.jpeg"}
				alt={altPicture}
			/>
			<CardContent sx={{ flexGrow: 1, ...cardContentStyle }}>
				<Typography component={'div'}>
					{title && <Typography variant="h6">{title}</Typography>}
					{description && <Typography variant="body2">{description}</Typography>}
				</Typography>
			</CardContent>
		</StyledCard>
	);
};

export default CardWithPictureWithoutAction;
