require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const { PORT, mongoUri } = require('./config');
const app = express();
const bucketListItemRoutes = require('./routes/api/bucketListItems');

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB database Connected...'))
    .catch((e) => console.log(e));

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api/bucketListItems', bucketListItemRoutes);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(client/dist));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));