const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const historyRouter = require('./router/history')
const db = require('./config/database');
const fileUpload = require("express-fileupload");

// parse form-data
const app = express();
dotenv.config();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 1024 * 1024
    },
    abortOnLimit: true,
}));

db.authenticate()
    .then(async () => {
        console.log('Database connected');
        await db.sync()
            .then(() => console.log('All table sync'));
    })
    .catch((err) => console.log(err));


app.use(userRouter)
app.use('/history', historyRouter)
app.use('/historyPhoto', express.static('historyPhoto'))

app.listen(port, () => {
    console.log('Server running on port 5000');
})