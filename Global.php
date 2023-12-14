<?php

/**
 * Evangelización Liberadora Integral.
 * Sistema de informaciòn para los Centros de Evangelizaciòn Liberadora
 * Integral abiertos en el estado de Quintana Roo.
 *
 * Copyright (c) 2024 Eazicom Servicios Profesionales
 * Todos los derechos reservados.
 */

require_once( "Config/AppSettings.php" );

$config = new AppSettings( "AppConfig.ini" );
define( "BASE", $config->key( "base" ) );

// Establece la zona horaria de Nueva York.
date_default_timezone_set( 'America/New_York' );
