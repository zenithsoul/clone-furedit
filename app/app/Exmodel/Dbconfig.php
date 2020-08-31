<?php

namespace Endnix\Exmodel;

use ArangoDBClient\ConnectionOptions as ArangoConnectionOptions;
use ArangoDBClient\UpdatePolicy as ArangoUpdatePolicy;

class Dbconfig {

    public function getcfg() 
    {
        $_option = 
        [
			// database name
			ArangoConnectionOptions::OPTION_DATABASE => 'webboard',
			// server endpoint to connect to
			ArangoConnectionOptions::OPTION_ENDPOINT => 'tcp://127.0.0.1:8529',
			// authorization type to use (currently supported: 'Basic')
			ArangoConnectionOptions::OPTION_AUTH_TYPE => 'Basic',
			// user for basic authorization
			ArangoConnectionOptions::OPTION_AUTH_USER => 'root',
			// password for basic authorization
			ArangoConnectionOptions::OPTION_AUTH_PASSWD => '1234',
			// connection persistence on server. can use either 'Close' (one-time connections) or 'Keep-Alive' (re-used connections)
			ArangoConnectionOptions::OPTION_CONNECTION => 'Keep-Alive',
			// connect timeout in seconds
			ArangoConnectionOptions::OPTION_TIMEOUT => 5,
			// whether or not to reconnect when a keep-alive connection has timed out on server
			ArangoConnectionOptions::OPTION_RECONNECT => true,
			// optionally create new collections when inserting documents
			ArangoConnectionOptions::OPTION_CREATE => true,
			// optionally create new collections when inserting documents
			ArangoConnectionOptions::OPTION_UPDATE_POLICY => ArangoUpdatePolicy::LAST,
			// // to use memcached for caching the currently active leader (to spare a few connection attempts

			// // to followers), it is possible to install the Memcached module for PHP and set the following options:
			// // memcached persistent id (will be passed to Memcached::__construct)
			 //ConnectionOptions::OPTION_MEMCACHED_PERSISTENT_ID => 'arangodb-php-pool',
			// // memcached servers to connect to (will be passed to Memcached::addServers)
			// ConnectionOptions::OPTION_MEMCACHED_SERVERS       => [ [ '127.0.0.1', 11211 ] ],
			// // memcached options (will be passed to Memcached::setOptions)
			// ConnectionOptions::OPTION_MEMCACHED_OPTIONS       => [ ],
			// // key to store the current endpoints array under
			// ConnectionOptions::OPTION_MEMCACHED_ENDPOINTS_KEY => 'arangodb-php-endpoints' ,
			// // time-to-live for the endpoints array stored in memcached
			// ConnectionOptions::OPTION_MEMCACHED_TTL           => 600
        ];

        return $_option;
    }
}