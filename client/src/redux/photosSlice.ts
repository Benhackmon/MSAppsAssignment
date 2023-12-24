import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface Photo {
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

export interface PhotosState {
    data: FetchPhotosPayload
    status: 'loading' | 'succeeded' | 'failed' | null
    error: string | null
}

interface FetchPhotosPayload {
    photos: Photo[];
    totalPages: number;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
}

const API_BASE_URL = 'http://localhost:3000/pixabay/api/images/page';

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async ({ category, page }: { category: string, page: number }) => {
    try {
        const response = (await axios.get(API_BASE_URL, { params: { page, category } }));

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
});

const photosSlice = createSlice({
    name: 'photos',
    initialState: { status: null, error: null, data: { photos: [], totalPages: 1, isNextDisabled: true, isPrevDisabled: true } } as PhotosState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchPhotos.fulfilled, (state, { payload }: PayloadAction<FetchPhotosPayload>) => {
                state.status = 'succeeded';
                state.data = payload;
            })
            .addCase(fetchPhotos.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error.message as string;
            });
    },
});

export default photosSlice.reducer;