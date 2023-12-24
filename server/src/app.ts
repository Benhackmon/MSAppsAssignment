import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import pixabayRoutes from './routes/pixabayRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/pixabay/api', pixabayRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});