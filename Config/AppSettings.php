<?php
/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral abiertos en el estado de Quintana Roo.
 *
 * Copyright (c) 2024 Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

require_once( "Configuration.php" );

/**
 * @version 1.0.0
 */
class AppSettings extends Configuration {

    /**
     * Crea una nueva instancia de la clase AppConfig.
     * @see AppConfig
     */
    function __construct( string $filename ) {
        parent::__construct( $filename );
    }

    /**
     *
     */
    public function key( string $key ): string {
        if( isset( $this->config[ "app_settings" ][ $key ] ) ) {
            return $this->config[ "app_settings" ][ $key ];
        }
        return "";
    }
}