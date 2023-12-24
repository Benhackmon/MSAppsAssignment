import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { upperFirst } from 'lodash';
import { ChangeEvent } from 'react';

interface PhotoCategoryModalProps {
    isModalOpen: boolean
    category: string
    selectNewCategory: (event: ChangeEvent<HTMLInputElement>) => void
    closeModal: () => void
}

const categories = ['animals', 'sports', '111', 'asdf', 'flowers', 'rollerblades', 'abcdefg'];

const PhotoCategoryModal = ({ closeModal, selectNewCategory, category, isModalOpen }: PhotoCategoryModalProps) => (
    <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Select Photo Category</DialogTitle>
        <DialogContent>
            <TextField select fullWidth value={category} onChange={selectNewCategory} label="Photo Categories" sx={{ marginTop: 1 }}>
                {categories.sort().map(category =>
                    <MenuItem key={category} value={category}>{upperFirst(category)}</MenuItem>
                )}
            </TextField>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
        </DialogActions>
    </Dialog>
);

export default PhotoCategoryModal;