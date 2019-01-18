import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import config from './db';
import mongoose from 'mongoose';
import cors from 'cors';
import todosModels from './models/todos';
import todosRoutes from './routes/todos';

const db = mongoose.connect(config.db, { useNewUrlParser: true })
.then(() => {
  console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/todos', todosRoutes);

app.listen(3000, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
);
