const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
// require("dotenv-safe").config();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const port = 8086//process.env.PORT || 80

try {
    app.listen(port);
    console.log('SERVIDOR CLIENT PORT: ' + port)
} catch (error) {
    console.error(error.message);
}
