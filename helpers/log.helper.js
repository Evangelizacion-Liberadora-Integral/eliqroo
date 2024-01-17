/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral aperturados en Quintana Roo.
 *
 * Copyright (c) - Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

/**
 * Provee las herramientas necesarias para la impresión de mensajes en consola.
 */
class Log {

    /**
     * Obtiene la fecha actual del sistema.
     * @private @type {Date}
     */
    static get now() {
        return ( new Date() );
    }

    /**
     * Obtiene la cadena de texto fecha del sistema en formato "dd-mm-yyyy".
     * @private @type { string }
     */
    static get dateString() {
        const [day, month, year] = this.now
            .toLocaleDateString( 'es-mx' ).split( '/' );
        return `${day.padStart( 2, '0' )}-${month.padStart( 2, '0' )}-${year}`;
    }

    /**
     * Obtiene la hora en el formato 'hh:mm:ss:mmm' de la fecha especificada.
     * @private @type { string } La hora en formato 'hh:mm:ss:mmm'.
     */
    static get timeString() {
        const [time, period] = this.now.toLocaleTimeString( 'es-mx' )
            .split( ' ' );
        const [hours, minutes, seconds] = time.split( ':' );
        return `${hours.padStart( 2, '0' )}:${minutes.padStart( 2, '0' )}:` +
            `${seconds.padStart( 2, '0' )} ${period.trim()}`;
    }

    /**
     * Limpia la consola.
     * @returns {void}
     */
    static clear() {
        console.clear();
    }

    /**
     * Imprime en consola un mensaje.
     * @param { string } text Mensaje de texto a imprimir en la consola.
     * @param {'I'|'E'|'D'} type Tipo de mensaje: nformativo, error o
     * depuración.
     */
    static log( text, type = 'I' ) {
        console.log( `${this.dateString} - ${this.timeString} - ${type}`
            + ` - ${text}` );
    }
}

module.exports = Log;
