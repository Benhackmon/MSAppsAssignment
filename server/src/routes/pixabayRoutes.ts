import express from 'express';
import { getPaginatedImages, getSortedImages } from '../controllers/pixabayController';

const router = express.Router();

router.get('/images/sort', getSortedImages);
router.get('/images/page', getPaginatedImages);

export default router;