/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales.
 * Todos los derechos reservados.
 */

import * as express from 'express';
import Enviroment from './helpers/enviroment.helper.js';

const app = express();
app.use( '/', express.static( 'public', { index: 'index.html' } ) );

const port = Enviroment.instance.port;

app.listen( port, () => { } );