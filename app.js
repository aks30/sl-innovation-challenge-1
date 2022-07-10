// const cors = require('cors');

// .env
const dotenv = require('dotenv');
dotenv.config();

// Express
const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// MongoDB Atlas
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('Connected to DB...'))
//   .catch(err => console.log(`DB Error: ${err.message}`));

// middlewares
// app.use(cors());
app.use(express.json());
// app.use(cookieParser());
app.use(expressValidator());

// routes
app.get('/', (req, res) => res.json(require('./docs/api')));  // localhost:8080/
// const postRoutes = require('./routes/postRoutes');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// app.use('/', postRoutes);
// app.use('/', authRoutes);
// app.use('/', userRoutes);

// error handling
app.use((err, req, res, next) => {    // see express-jwt docs
  if (err.name === 'UnauthorizedError') res.status(401).json({error: 'Unauthorized!'});
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`RD03-02-NodeAPI listening on port ${port}...`));
