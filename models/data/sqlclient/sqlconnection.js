/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

const { Connection, ISOLATION_LEVEL } = require( 'tedious' );
const { SqlCommand } = require( './sqlcommand' );
const SqlTransaction = require( './sqltransaction' );

/**
 * Configuración para establecer conexión con SQL Server.
 * @typedef {import('tedious').ConnectionConfig} ConnectionConfig
 */

/**
 * Representa una conexión a una base de datos de SQL Server.
 */
class SqlConnection {

    /**
     * El objeto {@link Connection } asociado a la conexión con
     * SQL Server.
     * @private @type { Connection }
     */
    _dbConnection;

    /**
     * Configuración de conexión a una base de datos.
     * @private @type { ConnectionConfig|undefined }
     */
    _connectionConfig;

    //#region - Definición de propiedades -

    /**
     * Obtiene el objeto {@link Connection} asociado a la conexión de una base
     * de datos de SQL Server.
     * @returns {Connection}
     */
    get tedious() {
        return this._dbConnection;
    }

    /**
     * Obtiene la configuración de conexión a una base de datos.
     * @public
     * @returns { ConnectionConfig|undefined }
     */
    get connectionConfig() {
        return this._connectionConfig;
    }

    /**
     * Establece la configuración de conexión a una base de datos.
     * @public
     * @param { ConnectionConfig } value
     */
    set connectionConfig( value ) {
        this._connectionConfig = value;
    }

    //#endregion

    /**
     * Crea una nueva instancia de la clase {@link SqlConnection}.
     * @param { ConnectionConfig } [connectionConfig]
     */
    constructor( connectionConfig ) {
        if ( connectionConfig )
            this._connectionConfig = connectionConfig;
    }

    /**
     * Inicia una transacción de base de datos.
     * @param {number} iso El nivel de isolación con el cual debería
     * ejecutarse la transacción.
     * El valor predeterminado es {@linkcode READ_COMMITTED}.
     * @param {string} transactionName El nombre de la transacción.
     * @returns { SqlTransaction }
     */
    beginTransaction( iso = 0x02, transactionName = '' ) {
        return new SqlTransaction( this, transactionName, iso );
    }

    /**
     * Abre de manera asíncrona una conexión a una base de datos con los
     * valores de propiedad especificados por {@link ConnectionConfig}.
     * @returns { Promise<void> } Promesa que representa la operación asíncrona.
     */
    async openAsync() {
        await /** @type { Promise<void> } */( new Promise(
            ( resolve, reject ) => {
                if ( this._connectionConfig ) {
                    this._dbConnection = new Connection( this._connectionConfig );
                    this._dbConnection.connect( ( error ) => {
                        ( error )
                            ? reject( error.message )
                            : resolve()
                    } );
                } else {
                    reject( 'Sin configuración para conectarse a SQL Server' );
                }
            } )
        );
    }

    /**
     * Crea y devuelve un objeto {@link SqlCommand} asociado a la conexión
     * {@link SqlConnection}.
     * @public
     * @returns {SqlCommand} Un objeto {@link SqlCommand}.
     */
    createCommand() {
        return ( new SqlCommand( this ) );
    }

    /**
     * Cierra la conexión a la base de datos.
     * @public
     * @returns { void }
     */
    close() {
        if ( this._dbConnection ) {
            this._dbConnection.close();
        }
    }
}

module.exports = SqlConnection;
