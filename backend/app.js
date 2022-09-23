const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require('./middlewares/errors');

const { cardsRoutes } = require('./routes/cards');
const { usersRoutes } = require('./routes/users');
const ErrorNotFound = require('./utils/ErrorNotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  mongoose.set('toObject', { useProjection: true });
  mongoose.set('toJSON', { useProjection: true });

  app.use(express.json());
  app.use(cookieParser());

  app.use(requestLogger);

  app.use(usersRoutes);
  app.use(cardsRoutes);

  app.use(errorLogger);

  app.use((req, res, next) => {
    next(new ErrorNotFound('Страница не найдена'));
  });
  app.use(errors());
  app.use(errorHandler);

  await app.listen(PORT);

  console.log(`Listening on port [:${PORT}]...`);
}

main();
