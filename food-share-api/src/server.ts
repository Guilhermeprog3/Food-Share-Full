import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 