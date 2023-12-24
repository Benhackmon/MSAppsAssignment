import { Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Center, Column, Row } from './Layout';
import Pagination from './components/Pagination';
import PhotoCategoryModal from './components/PhotoCategoryModal';
import PhotosGrid from './components/PhotosGrid';
import { fetchPhotos } from './redux/photosSlice';
import { AppDispatch, RootState } from './redux/store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: { photos, isNextDisabled, isPrevDisabled, totalPages }, error, status } = useSelector(({ photos }: RootState) => photos);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('sports');

  const photosPerPage = 9;
  const displayedPhotos = photos?.slice(0, photosPerPage);
  const isLoading = status === 'loading';

  useEffect(() => {
    setPage(1)
  }, [category]);

  useEffect(() => {
    dispatch(fetchPhotos({ category, page }));
  }, [page]);

  const goToPrevPage = () => {
    setPage(currPage => Math.max(currPage - 1, 1));
  };

  const goToNextPage = () => {
    setPage(currPage => Math.min(currPage + 1, totalPages));
  };

  const changeModalState = () => {
    setIsModalOpen(prev => !prev);
  };

  const selectNewCategory = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCategory(value);
    changeModalState();
  };

  if (status === 'failed') {
    return (
      <Center sx={{ height: 1, width: 1 }}>
        <Typography variant='h5'>Error loading photos: {error}</Typography>
      </Center>
    );
  }

  return (
    <Center sx={{ height: 1, width: 1, overflow: 'auto' }}>
      <Column sx={{ height: .9, width: 650, maxWidth: .9, alignItems: 'center', gap: 1 }}>
        <Pagination
          goToPrevPage={goToPrevPage} isPrevDisabled={isPrevDisabled || isLoading}
          changeModalState={changeModalState}
          goToNextPage={goToNextPage} isNextDisabled={isNextDisabled || isLoading}
        />
        <PhotosGrid displayedPhotos={displayedPhotos} isLoading={isLoading} />
        {totalPages > 0 && <Row><Typography>Page {page}/{totalPages}</Typography></Row>}
        <PhotoCategoryModal
          closeModal={changeModalState} isModalOpen={isModalOpen}
          selectNewCategory={selectNewCategory} category={category}
        />
      </Column>
    </Center>
  );
};

export default App;