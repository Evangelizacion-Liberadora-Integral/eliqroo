'use strict';

/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

const {
    Connection,
    Request,
    TYPES
} = require( 'tedious' );

const SqlConnection = require( './sqlconnection' );

/**
 *
 */
class SqlCommand {

    /**
     * Conexión a una base de datos de SQL Server.
     * @private @type { SqlConnection | null }
     */
    _connection;

    get connection() {
        return this._connection;
    }

    /**
     * Crea una nueva instancia de la clase {@link SqlCommand}
     * @param {any} connection Conexión al origen de datos.
     */
    constructor( connection ) {

    }

    /**
     *
     * @param {string} command
     * @returns {Array}
     */
    select( command ) {
        return [];
    }

}

module.exports = SqlCommand;
