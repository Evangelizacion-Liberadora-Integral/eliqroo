/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales.
 * Todos los derechos reservados.
 */

import * as express from 'express';

const app = express();
app.use( '/', express.static( 'public', { index: 'index.html' } ) );