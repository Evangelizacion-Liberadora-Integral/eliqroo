'use strict';

/**
 * Evangelización Liberadora Integral.
 * Sistema de información para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

/**
 * @typedef { import( 'tedious').ParameterOptions } ParameterOptions
 * @typedef { import( 'tedious' ).TediousType } DbType
 */

const { TYPES } = require( 'tedious' );
const { SqlCommand } = require( './sqlcommand' );

/**
 * Especifica el tipo de un parámetro dentro de una consulta en relación al
 * resultado.
 * @readonly @enum { number }
 */
const ParameterDirection = {
    /**
     * El parámetro es un parámetro sólo de entrada.
     * @type { number } @default 1
     */
    INPUT: 1,

    /**
     * El parámetro es un parámetro sólo de salida.
     * @type { number } @default 2
     */
    OUTPUT: 2
}

/**
 * Representa un parámetro de {@link SqlCommand}.
 */
class SqlParameter {
    //#region -- Variables globales --

    /**
     * Uno de los valores de {@link ParameterDirection}.
     * @private @type { number }
     */
    _direction = ParameterDirection.INPUT;

    /**
     * Nombre del parámetro.
     * @private @type { string }
     */
    _name = '';

    /**
     * Opciones adicionales de tipo especificado con {@link TYPES}.
     * @private @type { ParameterOptions }
     */
    _parameterOptions = {};

    //#endregion

    //#region -- Propiedades de clase --

    /**
     * Obtiene y/o establece un valor que indica si el parámetro es de sólo
     * entrada o es de sólo salida.
     * @returns { number }
     */
    get direction() {
        return this._direction;
    }

    /**
     * Obtiene y/o establece un valor que indica si el parámetro es de sólo
     * entrada o es de sólo salida.
     * @param { number } value
     */
    set direction( value ) {
        if ( value !== this._direction )
            this._direction = value;
    }

    /**
     * Obtiene el nombre del parámetro.
     * @returns { string }
     */
    get name() {
        return this._name;
    }

    /**
     * Obtiene las opciones adiciones para un valor de {@link TYPES}.
     * @returns { ParameterOptions }
     */
    get parameterOptions() {
        return this._parameterOptions;
    }

    /**
     * Obtiene el tipo de dato del parámetro especificado por {@link TYPES}.
     * @returns { DbType }
     */
    get type() {
        return this._type;
    }

    /**
     * Obtiene el valor del parámetro.
     * @returns { any }
     */
    get value() {
        return this._value;
    }

    //#endregion

    //#region -- Métodos de construcción --

    /**
     * Inicializa una nueva instancia de la clase {@link SqlParameter} con el
     * nombre, tipo y valor especificados.
     * @param { string } name Nombre del parámetro a mapear.
     * @param { DbType } type Uno de los valores de {@link TYPES}.
     * @param { any } value El valor del parámetro.
     * @param { ParameterOptions } [options] Las opciones adiciones para un
     * valor de {@link TYPES}.
     */
    constructor( name, type, value, options ) {
        if ( name.startsWith( '@' ) ) {
            this._name = name.replace( '@', '' );
        } else {
            this._name = name;
        }

        /**
         * Uno de los valores de {@link TYPES}.
         * @private @type { DbType }
         */
        this._type = type;

        /**
         * El valor del parámetro.
         * @private @type { any }
         */
        this._value = value;

        if ( options )
            this._parameterOptions = options;
    }

    //#endregion
}

module.exports = {
    ParameterDirection,
    SqlParameter
}
