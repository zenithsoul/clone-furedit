<?php

namespace Endnix\Exmodel\User;

use ArangoDBClient\Connection as ArangoConnection;
use ArangoDBClient\Statement as ArangoStatement;
use ArangoDBClient\Exception as ArangoException;
use Endnix\Exmodel\Dbconfig;

class Userhandle
{
    private $connection ;
    
    public function __construct() 
    {
        $dbcfg = new Dbconfig();
        $connectionOptions = $dbcfg->getcfg();
        $this->connection = new ArangoConnection($connectionOptions);
    }

    public function checkuserpass($username , $password)
    {
		$statement = new ArangoStatement($this->connection, 
		[
			'query' =>
			'
				FOR u IN d_user 
					FILTER u.username == @username && u.password == @password
				RETURN 
				{
					userid : u._key ,
					username : u.username,
					userdisply : u.userdisply
				}		
				' ,
			'bindVars' => ['username' => (string)$username , 'password' => (string)$password ] 	
		]);
					
		$cursor = $statement->execute();
		$get_user = $cursor->getAll();
		$count_row = count($get_user);

		$data = array(
			'userid' => 0 ,
			'username' => "" ,
			'userdisply' => ""
		);

		if($count_row > 0)
		{
			$data['userid'] = $get_user[0]->userid;
			$data['username'] = $get_user[0]->username;
			$data['userdisply'] = $get_user[0]->userdisply;
			
			return $data;
		}
		else
		{
			return $data;
		}
		
	}

    public function checktoken($token)
    {
        
    }
}