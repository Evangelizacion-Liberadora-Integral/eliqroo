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
 * Especifica cómo se interpreta una cadena de comandos.
 * @readonly
 * @enum { number }
 */
const CommandType = {
    /** Nombre del procedimiento almacenado. */
    STORED_PROCEDURE: 4,
    /** Nombre de una tabla. */
    TABLE_DIRECT: 512,
    /** Comando de texto SQL. */
    TEXT: 1
}

/**
 * Representa un procedimiento almacenado o una instrucción de Transact-SQL que
 * se ejecuta en una base de datos de SQL Server.
 * @since v0.1.0
 */
class SqlCommand {

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
     * Uno de los valores de {@link CommandType}.
     * @returns { number }
     */
    get commandType() {
        return this._commandType;
    }

    /**
     * Uno de los valores de {@link CommandType}.
     */
    set commandType( value ) {
        if ( value !== this._commandType ) {
            this._commandType = value;
        }
    }

    /**
     * Obtiene la instancia de {@link SqlConnection} utilizada por el objeto
     * {@link SqlCommand}.
     * @returns { SqlConnection }
     */
    get connection() {
        return this._connection;
    }

    /**
     * Inicializa una nueva instancia de la clase {@link SqlCommand} con una
     * {@link SqlConnection}.
     * @param { SqlConnection } connection - Una {@link SqlConnection} que
     * representa la conexión a una instancia de SQL Server.
     */
    constructor( connection ) {
        /**
         * Instrucción de Transact-SQL, nombre de la tabla o procedimiento
         * almacenado a ejecutar en el origen de datos.
         * @private @type { string }
        */
        this._commandText = '';

        /**
         * Uno de los valores de {@link CommandType}.
         * @private @type { number }
         */
        this._commandType = CommandType.TEXT;

        /**
         * Conexión a una base de datos de SQL Server.
         * @private @type { SqlConnection }
         */
        this._connection = connection;
    }

    /**
     *
     * @returns {Promise<number>}
     */
    async executeNonQueryAsync() {
        return ( await /** @type { Promise<number> } */( new Promise(
            ( resolve, reject ) => {
                const procedure = new Request( this._commandText,
                    ( error, rowCount ) => {
                        ( error )
                            ? reject( error.message )
                            : resolve( rowCount );
                    }
                );
                this._connection.valueOf()?.callProcedure( procedure );
            }
        ) ) );
    }
}

module.exports = {
    CommandType,
    SqlCommand
}
