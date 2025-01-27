import request from 'supertest';
import express from 'express';
import weatherRoutes from '../routes/weatherRouter';
import 'dotenv/config';

const app = express();
app.use('/api/weather', weatherRoutes);

describe('GET /api/weather', () => {
  it('should return weather data for valid city', async () => {
    const response = await request(app).get('/api/weather?city=Hyderabad');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('humidity');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('windspeed');
    expect(response.body).toHaveProperty('description');
  });

  it('should return error for invalid city', async () => {
    const response = await request(app).get('/api/weather?city=abcdef');
    expect(response.status).toBe(500);
  });

  it('should return error for empty query', async () => {
    const response = await request(app).get('/api/weather?city=');
    expect(response.status).toBe(400);
  });
});
