<?php

namespace Endnix\Http\Middleware;

use Closure;
use ArangoDBClient\Connection as ArangoConnection;
use ArangoDBClient\Statement as ArangoStatement;
use ArangoDBClient\Exception as ArangoException;
use Endnix\Exmodel\Dbconfig;


class CheckExSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }

    public function islogin($request, Closure $next)
    {
        return $next($request);
    }
}
