<?php

namespace Endnix\Http\Controllers\Session;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Endnix\Http\Controllers\Controller;
use Endnix\Exmodel\User\Usertoken;
use Endnix\External\Ex_security;

class Exapi extends Controller
{
    public function __construct() {
        
    }
    public function checksession(Request $request)
    {
        //$token = $request->input('token');
        //$result = new Usertoken::checktoken($token);
        //return response()->json(['is_session' => 0]);
        
    }

    public function checkTest(Request $request , $idtest)
    {
        $_result = new Usertoken();
        $result = $_result->chkTest($idtest);
        return response()->json(['is_session' => $result]);
    }

    public function pingsession(Request $request)
    {
        $class_security = new Ex_security();
        $_obj = $class_security->getCookie();
        
        if($_obj != null)
        {
            return response()->json([
                'IsSession' => true , 
                'UserId' => $_obj->userid , 
                'UserName' => $_obj->username ,
                'UserDisply' => $_obj->userdisply
            ]);
        }
        else
        {
            return response()->json([
                'IsSession' => false , 
                'UserId' => '' , 
                'UserName' => '' ,
                'UserDisply' => ''
            ]);
        }
        
    }

    public function functest(Request $request)
    {
        $class_security = new Ex_security();
        $_obj = $class_security->getCookie();
        
        if($_obj != null)
        {
            return response()->json([
                'IsSession' => true , 
                'UserId' => $_obj->userid , 
                'UserName' => $_obj->username ,
                'UserDisply' => $_obj->userdisply
            ]);
        }
        else
        {
            return response()->json([
                'IsSession' => false , 
                'UserId' => '' , 
                'UserName' => '' ,
                'UserDisply' => ''
            ]);
        }
        
    }

    public function functxt(Request $request)
    {
        
    }
    
}
