const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const userRouter = require('./router/user');
const postHistory = require('./router/postHistory')
const db = require('./config/database');

const app = express();
dotenv.config();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

db.authenticate()
    .then(async () => {
        console.log('Database connected');
        await db.sync()
            .then(() => console.log('All table sync'));
    })
    .catch((err) => console.log(err));


app.use(userRouter)
app.use('/history', postHistory)
app.use('/historyPhoto', express.static('historyPhoto'))

app.listen(port, () => {
    console.log('Server running on port 5000');
})