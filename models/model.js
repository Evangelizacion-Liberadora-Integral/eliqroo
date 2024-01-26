'use strict';

const { TYPES } = require( 'tedious' );
const { CommandType } = require( './data/sql/sqlcommand' );
const SqlConnection = require( './data/sql/sqlconnection' );
const { SqlParameter } = require( './data/sql/sqlparameter' );

const connection = new SqlConnection( {} );
connection.openAsync().then( async () => {
    const procedure = connection.createCommand();
    procedure.commandText = '[dbo].[insertar]';
    procedure.commandType = CommandType.STORED_PROCEDURE;
    procedure.addParameter( new SqlParameter( 'p1', TYPES.Int, 3 ) );
    procedure.executeNonQueryAsync()
} );

