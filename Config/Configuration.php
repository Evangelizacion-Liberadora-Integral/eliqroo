<?php

/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral abiertos en el estado de Quintana Roo.
 *
 * Copyright (c) 2024 Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

/**
 * Define las operaciones que se puede realizar en el archivo de configuraciòn.
 * @version 1.0.0
 */
abstract class Configuration {

    /**
     * Colecciòn de
     * @var array|false
     */
    protected array|false $config;

    /**
     * Crea una nueva instancia de la clase Configuration.
     * @param string $filename Nombre del archivo de configuraciòn.
     */
    function __construct( string $filename ) {
        $this->config = $this->readFile( $filename );
    }

    /**
     *
     */
    protected function readFile( string $filename ): array {
        if( file_exists( $filename ) ) {
            return parse_ini_file( $filename, true, INI_SCANNER_NORMAL );
        }
        return array();
    }

    /**
     * Obtiene
     */
    public abstract function key( string $key ): string;
}