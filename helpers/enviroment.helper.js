/**
 * 
 */

import DotEnv from 'dotenv';

/**
 * Administra las variables de entorno especificadas en el archivo de
 * configuración.
 * @author Eric A. Rodríguez S.
 */
export default class Enviroment {

    //#region -- Declaración de variables --

    /**
     * @private
     * @type {Enviroment|null}
     */
    static _instance = null;

    //#endregion

    /**
     * Obtiene la instancia única de la clase {@link Enviroment}.
     * @type {Enviroment}
     */
    static get instance() {
        if ( !this._instance )
            this._instance = new Enviroment();
        return this._instance;
    }

    /**
     * @returns {number}
     */
    get port() {
        if ( process.env.PORT )
            return parseInt( process.env.PORT );
        return 80;
    }

    constructor() {
        DotEnv.config();
    }

}
