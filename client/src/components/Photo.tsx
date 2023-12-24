import { useState } from 'react';
import { Photo as IPhoto } from '../redux/photosSlice';
import PhotoModal from './PhotoModal';

const Photo = (photo: IPhoto) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const changeModalState = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <>
            <img
                src={photo.webformatURL}
                alt={photo.tags}
                style={{ width: '200px', height: '140px', objectFit: 'fill', borderRadius: 2, cursor: 'pointer' }}
                onClick={changeModalState}
            />
            <PhotoModal
                isOpen={isModalOpen}
                closeModal={changeModalState}
                photo={photo}
            />
        </>
    );
};

export default Photo;