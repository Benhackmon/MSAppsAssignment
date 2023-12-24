import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './photosSlice';

const store = configureStore({
    reducer: {
        photos: photosReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
