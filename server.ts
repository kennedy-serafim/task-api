import dotenv from 'dotenv';
dotenv.config();

import App from './src/app';

const app = new App();
app.start();