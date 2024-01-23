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
 * @typedef { number|'Infinity' } Length
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

    //#region -- Declaración de variables --

    /**
     * Uno de los valores de {@link ParameterDirection}.
     * @private @type { number }
     */
    _direction = ParameterDirection.INPUT;

    /**
     * El tamaño máximo en
     * @private @type { Length }
     */
    _length = 0;

    //#endregion

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
     * Obtiene y/o establece la longitud de los 
     * @param { Length } value
     */
    set length( value ) {
        if ( value !== this._length )
            this._length = value;
    }

    get name() {
        if ( this._name.startsWith( '@' ) ) {
            return this._name.replace( '@', '' );
        }
        return this._name;
    }

    get type() {
        return this._type;
    }

    /**
     * Inicializa una nueva instancia de la clase {@link SqlParameter} con el
     * nombre, tipo y valor especificados.
     * @param { string } name Nombre del parámetro a mapear.
     * @param { TYPES } type Uno de los valores de {@link TYPES}.
     * @param { any } value El valor del parámetro.
     */
    constructor( name, type, value ) {
        /**
         * Nombre del parámetro a mapear.
         * @private @type { string }
         */
        this._name = name;

        /**
         * Uno de los valores de {@link TYPES}.
         * @private @type { TYPES }
         */
        this._type = type;

        /**
         * El valor del parámetro.
         * @private @type { any }
         */
        this.value = value;
    }

    /**
     * 
     */
    getOptions() {

    }
}

module.exports = {
    ParameterDirection,
    SqlParameter
}
