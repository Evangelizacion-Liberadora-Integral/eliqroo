<?php
/*!
 * Copyright (c) 2024 - Eazicom Servicios Profesionales
 * Autor: Eric A. Rodrìguez S.
 * Todos los derechos reservados.
 */

require_once( "Config/AppSettings.php" );

$config = new AppSettings( "AppConfig.ini" );
define( "BASE", $config->key( "base" ) );

// Establece la zona horaria de Nueva York.
date_default_timezone_set( 'America/New_York' );
