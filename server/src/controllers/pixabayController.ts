import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '25540812-faf2b76d586c1787d2dd02736';

interface Photo {
    id: number
    type: string
    tags: string
    webformatURL: string
    views: number
    downloads: number
    collections: number
    likes: number
    comments: number
}

interface PixabayImage {
    hits: Photo[]
    totalHits: number
}

const getImagesByParams = async (params: any): Promise<PixabayImage> => {
    const response = await axios.get(PIXABAY_API_URL, { params: { key: PIXABAY_API_KEY, ...params } });

    return response.data;
}

export const getSortedImages = async ({ query: { sortBy, category } }: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!category) {
            throw new Error('Category not exist');
        }

        if (String(category).trim().length === 0) {
            throw new Error('Category is empty');
        }

        if (sortBy !== 'id' && sortBy !== 'date') {
            throw new Error('Sort must be by id or date')
        }

        const { hits } = await getImagesByParams({ q: category, order: sortBy });

        res.json({ photos: hits });
    } catch (error) {
        next(error);
    }
};

export const getPaginatedImages = async ({ query: { page, category } }: Request, res: Response, next: NextFunction) => {
    try {
        const photosPerPage = 9;
        if (!page) {
            throw new Error('Page not exist');
        }

        if (String(page).trim().length === 0) {
            throw new Error('Page is empty');
        }

        if (isNaN(Number(page))) {
            throw new Error('Page is not a number');
        }

        if (!category) {
            throw new Error('Category not exist');
        }

        if (String(category).trim().length === 0) {
            throw new Error('Category is empty');
        }

        const { hits, totalHits } = await getImagesByParams({ q: category, page, per_page: photosPerPage })

        const totalPages = Math.ceil(totalHits / photosPerPage);
        const isPrevDisabled = Number(page) === 1 || totalHits === 0;
        const isNextDisabled = Number(page) === totalPages || totalHits === 0;

        res.json({ totalPages, isPrevDisabled, isNextDisabled, photos: hits });
    } catch (error: any) {
        next(error);
    }
}