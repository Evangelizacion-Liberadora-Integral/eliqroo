'use strict';

/**
 * Evangelización Liberadora Integral.
 * Sistema de información para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

const { Connection } = require( 'tedious' );
const SqlConnection = require( './sqlconnection' );

/**
 * Representa una transacción de Transact-SQL que se realiza en una base de
 * datos de SQL Server.
 */
class SqlTransaction {

    /**
     * @private @type { Connection  | null }
     */
    _connection = null;

    /**
     *
     * @param { SqlConnection } connection
     */
    constructor( connection ) {
        this._connection = connection.valueOf();
    }

    /**
     * @returns { void } No retorna ningún valor.
     */
    commit() {

    }

}

module.exports = SqlTransaction;
