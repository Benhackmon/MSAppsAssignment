import { CircularProgress, Paper, Typography } from '@mui/material';
import { Center, Column, Row } from '../Layout';
import { Photo as IPhoto } from '../redux/photosSlice';
import Photo from './Photo';

interface PhotosGridProps {
    displayedPhotos: IPhoto[]
    isLoading: boolean
}

const photosPerRow = 3;

const PhotosGrid = ({ isLoading, displayedPhotos }: PhotosGridProps) => (
    <Center sx={{ flexGrow: 1 }}>
        {isLoading ? <CircularProgress /> :
            <Paper sx={{ padding: 2 }} elevation={3}>
                <Column sx={{ gap: 1 }}>
                    {displayedPhotos?.length === 0 ? <Typography>No Photos</Typography> :
                        Array.from({ length: Math.ceil(displayedPhotos.length / photosPerRow) }, (_, rowNumber) =>
                            <Row key={rowNumber} sx={{ gap: 1 }}>
                                {displayedPhotos.slice(rowNumber * photosPerRow, (rowNumber + 1) * photosPerRow).map(photo =>
                                    <Photo key={photo.id} {...photo} />)}
                            </Row>)}
                </Column>
            </Paper>
        }
    </Center>
);

export default PhotosGrid;