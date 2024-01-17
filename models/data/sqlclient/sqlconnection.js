/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

const { Connection } = require( 'tedious' );
const SqlCommand = require( './sqlcommand' );

/**
 * Configuración para establecer conexión con SQL Server.
 * @typedef {import('tedious').ConnectionConfig} ConnectionConfig
 */

/**
 * Representa una conexión a una base de datos de SQL Server.
 * @since v0.1.0
 */
class SqlConnection {

    /**
     * Configuración de conexión a una base de datos.
     * @private @type { ConnectionConfig|undefined }
     */
    _connectionConfig;

    /**
     * Conexión a una base de datos de SQL Server.
     * @private @type { Connection|null }
     */
    _connection;

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

    /**
     * Crea una nueva instancia de la clase {@link SqlConnection}.
     * @param { ConnectionConfig } [connectionConfig]
     */
    constructor( connectionConfig ) {
        if ( connectionConfig )
            this._connectionConfig = connectionConfig;
    }

    beginTransaction() {

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
                    this._connection = new Connection( this._connectionConfig );
                    this._connection.connect( ( ex ) => {
                        ( ex )
                            ? reject( ex.message )
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
     * @returns {SqlCommand} - Un objeto {@link SqlCommand}.
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
        if ( this._connection ) {
            this._connection.close();
        }
    }

    /**
     * Retorna el objeto {@link Connection} asociado a la conexión.
     * @public
     * @returns { Connection | null }
     */
    valueOf() {
        return this._connection;
    }
}

module.exports = SqlConnection;
