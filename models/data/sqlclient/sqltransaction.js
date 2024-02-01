'use strict';

/**
 * Evangelización Liberadora Integral.
 * Sistema de información para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

const SqlConnection = require( './sqlconnection' );

/**
 * Representa una transacción de Transact-SQL que se realiza en una base de
 * datos de SQL Server.
 */
class SqlTransaction {

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
     * Inicializa una nueva instancia de la clase {@link SqlTransaction} con el
     * objeto {@link SqlConnection}, nivel de isolicación y nombre asociados.
     * @param { SqlConnection } connection El objeto {@link SqlConnection}
     * asociado a la transacción.
     * @param {number} iso El nivel de isolación en el cual se ejecuta la
     * transacción de base de datos.
     * @param {string} transactionName El nombre de la transacción.
     */
    constructor( connection, transactionName = '', iso = 0x02 ) {
        /**
         * @private @type {SqlConnection}
         */
        this._connection = connection;
        this._connection.tedious.beginTransaction(
            ( error ) => {



            }, transactionName, iso );
    }

    /**
     * @returns { void } No retorna ningún valor.
     */
    commit() {
        if ( this._connection !== null ) {
            this._connection.tedious.commitTransaction( ( error ) => {

            } );
        } else {
            throw new Error( 'La conexión a SQL Server no es válida.' );
        }
    }

    /**
     * @param {string} name
     * @returns { void }
     */
    rollback( name ) {
        if ( this._connection !== null ) {
            this._connection.tedious.rollbackTransaction( ( error ) => {

            } );
        } else {
            throw new Error( 'La conexión a SQL Server no es válida.' );
        }
    }
}

module.exports = SqlTransaction;
