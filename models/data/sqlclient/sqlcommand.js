'use strict';

/**
 * Evangelización Liberadora Integral.
 * Sistema de información para los Centros de Evangelizaciòn Liberadora
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
 * Representa un procedimiento almacenado o una instrucción de Transact-SQL que
 * se ejecuta en una base de datos de SQL Server.
 * @since v0.1.0
 */
class SqlCommand {

    /**
     * Instrucción de Transact-SQL, nombre de la tabla o procedimiento
     *  almacenado a ejecutar en el origen de datos.
     * @private @type { string }
     */
    _commandText = '';

    /**
     * Conexión a una base de datos de SQL Server.
     * @private @type { SqlConnection | null }
     */
    _connection = null;

    /**
     * Obtiene y/o establece la instrucción de Transact-SQL, nombre de la tabla
     * o procedimiento almacenado a ejecutar en el origen de datos.
     * @returns {string}
     */
    get commandText() {
        return this._commandText;
    }

    /**
     * Obtiene y/o establece la instrucción de Transact-SQL, nombre de la tabla
     * o procedimiento almacenado a ejecutar en el origen de datos.
     */
    set commandText( value ) {
        if ( value !== this._commandText ) {
            this._commandText = value;
        }
    }

    /**
     * Obtiene y/o establece la instancia de {@link SqlConnection} utilizada
     * por el objeto {@link SqlCommand}.
     * @returns { SqlConnection|null }
     */
    get connection() {
        return this._connection;
    }

    /**
     * Obtiene y/o establece la instancia de {@link SqlConnection} utilizada
     * por el objeto {@link SqlCommand}.
     */
    set connection( value ) {
        if ( value !== this._connection ) {
            this._connection = value;
        }
    }

    /**
     * Inicializa una nueva instancia de la clase {@link SqlCommand} con una
     * {@link SqlConnection}.
     * @param { SqlConnection } [connection] - Una {@link SqlConnection} que
     * representa la conexión a una instancia de SQL Server.
     */
    constructor( connection ) {
        if ( connection ) {
            this._connection = connection;
        }
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
