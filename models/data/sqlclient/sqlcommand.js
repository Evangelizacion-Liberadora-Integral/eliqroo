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
const {
    ParameterDirection,
    SqlParameter
} = require( './sqlparameter' );

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

    //#region - Declaración de variables -

    /**
     * Instrucción de Transact-SQL, nombre de la tabla o procedimiento
     * almacenado a ejecutar en el origen de datos.
     * @private @type { string }
     */
    _commandText = '';

    /**
     * Tiempo de espera (en segundos) antes de finalizar la ejecución de un
     * comando y generar un error.
     * @private @type { number }
     */
    _commandTimeout = 15;

    /**
     * Uno de los valores de {@link CommandType}.
     * @private @type { number }
     * @default TEXT
     */
    _commandType = CommandType.TEXT;

    /**
     * @private @type { Array<SqlParameter> }
     */
    _parameters = [];

    //#endregion

    //#region - Definición de propiedades -

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
     * Obtiene y/o establece el tiempo de espera (en segundos) antes de
     * finalizar la ejecución de un comando y generar un error.
     * @default 15
     * @returns { number }
     */
    get commandTimeout() {
        return ( this._commandTimeout );
    }

    /**
     * Obtiene y/o establece el tiempo de espera (en segundos) antes de
     * finalizar la ejecución de un comando y generar un error.
     * @default 15
     */
    set commandTimeout( value ) {
        if ( value !== this._commandTimeout ) {
            this._commandTimeout = value;
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
     *
     * @returns { Array<SqlParameter> }
     */
    get parameters() {
        return this._parameters;
    }

    //#endregion

    //#region - Métodos de construcción -

    /**
     * Inicializa una nueva instancia de la clase {@link SqlCommand} con una
     * {@link SqlConnection}.
     * @param { SqlConnection } connection - Una {@link SqlConnection} que
     * representa la conexión a una instancia de SQL Server.
     */
    constructor( connection ) {
        /**
         * Conexión a una base de datos de SQL Server.
         * @private @type { SqlConnection }
         */
        this._connection = connection;
    }

    //#endregion

    /**
     * Agrega el objeto {@link SqlParameter} especificado al {@link Array}.
     * @public
     * @param {SqlParameter} parameter El objeto {@link SqlParameter} a agregar
     * a la lista.
     * @param {number} [direction] Especifica si el parámetro es sólo de entrada
     * o sólo de salida. El valor predeterminado es {@linkcode INPUT}.
     * @returns { void }
     */
    addParameter( parameter, direction ) {
        if ( direction ) {
            parameter.direction = direction;
        }
        this._parameters.push( parameter );
    }

    /**
     * Ejecuta de manera asíncrona una intrucción de Transact-SQL en la
     * conexión y devuelve el número de filas afectadas.
     * @public
     * @returns {Promise<number>} El número de filas afectadas.
     */
    async executeNonQueryAsync() {
        return ( await /** @type { Promise<number> } */( new Promise(
            ( resolve, reject ) => {
                const tedious = this.connection.valueOf();
                const procedure = new Request( this._commandText,
                    ( error, rowCount ) => {
                        ( error )
                            ? reject( error.message )
                            : resolve( rowCount );
                    }
                );
                procedure.setTimeout( this.commandTimeout * 1000 );
                if ( this.parameters.length > 0 ) {
                    this.parameters.forEach( ( parameter ) => {
                        ( ParameterDirection.INPUT === parameter.direction )
                            ? procedure.addParameter(
                                parameter.name,
                                parameter.type,
                                parameter.value,
                                parameter.parameterOptions )
                            : reject( 'El comando contiene parámetros de ' +
                                'salida que no son permitidos.' );
                    } );
                }
                ( tedious !== null )
                    ? tedious.callProcedure( procedure )
                    : reject( 'No existe una conexión abierta a SQL Server.' );
            }
        ) ) );
    }
}

module.exports = {
    CommandType,
    SqlCommand
}
