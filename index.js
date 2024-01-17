'use strict';

/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

//#region -- Importación de mòdulos --

/** Proporciona una funciòn para crear una aplicación express. */
const express = require( 'express' );

/**
 * Contiene las variables de entorno establecidas en el ambiente de
 * ejecución.
 */
const enviroment = require( 'dotenv' );

/** Proporciona las funciones para imprimir mensajes en la consola. */
const Log = require( './helpers/log.helper' );

//#endregion

//#region -- Configuración general de la aplicación --

/** Aplicaciòn express. */
const app = express();

/** Configuración del archivo */
enviroment.config();

/** Puerto de red. */
const port = /** @type {number} */ ( process.env.PORT || 83 );

//#endregion

//#region -- Ejecución de la aplicación --

/** Prepara la aplicación para que escuche en el puerto establecido las
 * solicitudes  realizadas  por la aplicación cliente.
 */
app.listen( port, () => {
    Log.clear();
    Log.log( `Aplicación en línea, puerto ${port}.` )
} );

//#endregion