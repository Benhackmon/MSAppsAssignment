import { Close, Collections, Comment, Download, ThumbUp, Visibility } from '@mui/icons-material';
import { Chip, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { upperFirst } from 'lodash';
import { Column, Row } from '../Layout';
import { Photo } from '../redux/photosSlice';
import PhotoParameter from './PhotoParameter';

interface PhotoModalProps {
    photo: Photo
    isOpen: boolean;
    closeModal: () => void;
}

const PhotoModal = ({ isOpen, closeModal, photo: { tags, views, downloads, collections, comments, likes } }: PhotoModalProps) => (
    <Dialog open={isOpen} onClose={closeModal}>
        <DialogTitle>
            <Row sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Typography variant='h6'>Know more:</Typography>
                <IconButton onClick={closeModal}><Close /></IconButton>
            </Row>
        </DialogTitle>
        <DialogContent>
            <Row sx={{ padding: 1, gap: 2 }}>
                <Column sx={{ gap: 1 }}>
                    <PhotoParameter SvgIcon={Visibility} text={views} />
                    <PhotoParameter SvgIcon={Download} text={downloads} />
                    <PhotoParameter SvgIcon={Comment} text={comments} />
                    <PhotoParameter SvgIcon={ThumbUp} text={likes} />
                    <PhotoParameter SvgIcon={Collections} text={collections} />
                </Column>
                <Column sx={{ gap: 1, justifyContent: 'center' }}>{tags.split(', ').map(tag => <Chip key={tag} label={upperFirst(tag)} />)}</Column>
            </Row>
        </DialogContent>
    </Dialog >
);

export default PhotoModal;