//* Dependencies
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

//* Router Files
const userRouter = require('./users/users.router').router;
const authRouter = require('./auth/auth.router').router;

//* Imports
const { db } = require('./utils/database');
const config = require('./config');
const initModels = require('./models/initModels');

//? Init express app
const app = express();

//? Limit IP requests
const limiter = rateLimit({
    max: 10000,
    windowMs: 1 * 60 * 60 * 1000, // 1 hr
    message: 'Too many requests from this IP',
});

app.use(limiter);
//? Enable CORS
app.use(cors());
//? Enable incoming JSON data
app.use(express.json());
//? Enable incoming form-urlencoded data
app.use(express.urlencoded({ extended: false }));

//? Database Configs
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch((err) => console.log(err));
db.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err));

initModels();

//? Routes V1

app.get('/', (req, res) => {
    res.status(200).json({ message: 'All ok!' });
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`);
});

module.exports = app;
