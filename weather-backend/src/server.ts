import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import weatherRoutes from './routes/weatherRouter';

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.OPENWEATHER_API_KEY)

app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
