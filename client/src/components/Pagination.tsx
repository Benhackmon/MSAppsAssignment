import { Button } from '@mui/material';
import { Row } from '../Layout';

interface PaginationProps {
    goToPrevPage: () => void
    goToNextPage: () => void
    changeModalState: () => void
    isPrevDisabled: boolean
    isNextDisabled: boolean
}

const Pagination = ({ goToPrevPage, goToNextPage, isPrevDisabled, isNextDisabled, changeModalState }: PaginationProps) => (
    <Row sx={{ justifyContent: 'space-between', width: 1, gap: 1 }}>
        <Button variant="contained" onClick={goToPrevPage} disabled={isPrevDisabled}>Prev</Button>
        <Button variant="outlined" onClick={changeModalState}>Select Category</Button>
        <Button variant="contained" onClick={goToNextPage} disabled={isNextDisabled}>Next</Button>
    </Row>
);

export default Pagination;