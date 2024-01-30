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
     *
     * @private @type { SqlConnection }
     */
    _connection;

    //#region - Definición de propiedades -

    /**
     * Obtiene el objeto {@link SqlConnection} asociada a la transacción.
     * @public
     * @returns { SqlConnection | null }
     */
    get connection() {
        return this._connection;
    }

    //#endregion

    /**
     *
     * @param { SqlConnection } connection
     */
    constructor( connection ) {
        /**
         * @private
         */
        this._connection = connection;
    }

    /**
     * @returns { void } No retorna ningún valor.
     */
    commit() {
        if ( this._connection !== null ) {
            const tedious = this._connection.valueOf();

            if ( tedious !== null ) {
                tedious.commitTransaction( ( exc ) => error = exc );
                if ( error ) {
                    throw error;
                } `
                `
            }
        } else {
            throw new Error( 'La conexión a SQL Server no es válida.' );
        }
    }

    /**
     * @param {string} name
     * @returns { void }
     */
    rollback( name ) {
        this._connection?.valueOf()?.rollbackTransaction()
    }
}

module.exports = SqlTransaction;
