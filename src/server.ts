import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import productsRouter  from '@expressRoutes/products/products.route'
import usersRouter  from '@expressRoutes/users/users.route'
import { config } from 'dotenv';
config();


const app = express();
const angularApp = new AngularNodeAppEngine();


const browserDistFolder = join(import.meta.dirname, '../public');
app.use(express.static(browserDistFolder, { maxAge: '1y', index: false, redirect: false}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', productsRouter );
app.use('/api', usersRouter);


app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});


if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}


export const reqHandler = createNodeRequestHandler(app);
