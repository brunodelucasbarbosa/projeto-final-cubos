require('dotenv').config();

const app = require('./server');

app.listen(process.env.PORT || 3008);
