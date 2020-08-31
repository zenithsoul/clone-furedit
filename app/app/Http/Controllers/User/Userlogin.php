<?php

namespace Endnix\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Endnix\Http\Controllers\Controller;
use Endnix\Exmodel\User\Userhandle;
use Endnix\External\Ex_security;

use phpseclib\Crypt\TripleDES;
use phpseclib\Crypt\DES;
use phpseclib\Crypt\Random;
use phpseclib\Crypt\Hash;


class Userlogin extends Controller
{
    //
    public function loginpage(Request $request)
    {
        echo view('login');
    }

    public function login(Request $request)
    {
        $class_user = new Userhandle();
        $class_security = new Ex_security();

        $username = (string)$request->input('username');
        $password = (string)$request->input('password');

        $password = $class_security->se_hash($password);
        $chkuser = $class_user->checkuserpass($username , $password);

        if($chkuser['userid'] > 0)
        {
            $class_security->delCookie();

            $obj = (object)[];
            $obj->userid = $chkuser['userid'];
            $obj->username = $chkuser['username'];
            $obj->userdisply = $chkuser['userdisply'];

            $class_security->setCookie($obj);

            return response()->json([
                'userid' => $chkuser['userid'],
                'userdisply' => $chkuser['userdisply'] ,
                'getsession' => 1,
                'error' => 0
            ],201);
        }
        else
        {
            $class_security->delCookie();

            return response()->json([
                'userid' => 0,
                'userdisply' => "" ,
                'getsession' => 0,
                'error' => 1
            ],201);
        }
        
    }

    public function logout(Request $request)
    {
        $class_security = new Ex_security();
        $class_security->delCookie();
        return redirect('/');
    }

    public function testse(Request $request)
    {
        echo date('Y-m-d H:i:s') . "<br />";
        echo strtotime(date('Y-m-d H:i:s' , strtotime('+1 day'))) . "<br />";
        echo now() . "<br />";
        echo date('Y-m-d H:i:s' , strtotime('+1 hour')). "<br />";

        if(\Cookie::get('CookieName') == null)
            echo "COOKIE : Null";
        else {
            echo "COOKIE : " .  Cookie::get('CookieName');
        }
        //$cookie = \Cookie::queue(Cookie::make('CookieName', 'CookieValue', 60));
        //$cookie = \Cookie::queue(Cookie::make('CookieName', 'TEST',60));
        //Cookie::queue(Cookie::make('CookieName', 'TEST',60));
        //echo Cookie::get('CookieName');
        //Cookie::queue(Cookie::forget('CookieName'));

        /*
        $plaintext = "5555";
        $cipher = new TripleDES(DES::MODE_CTR);
        $newHash = new Hash();
        $cipher->setPassword('whatever', 'pbkdf2', 'sha1', 'phpseclib/salt', 1000);
        */
        //$cipher->setPassword('whatever');
        //
        /*
        $stringEndcode = $cipher->encrypt($plaintext);
        $stringEndcode64 = base64_encode($stringEndcode);
        $stringDedcode64 = base64_decode($stringEndcode64);
        $stringDedcode = $cipher->decrypt($stringDedcode64 );

        echo $stringEndcode . "<br />";
        echo $stringEndcode64 . "<br />";
        echo $stringDedcode . "<br />";
        */
        //echo $cipher->encrypt($plaintext) . "<br />";
        //echo base64_encode($cipher->encrypt($plaintext)) . "<br />";
        //echo $cipher->decrypt($cipher->encrypt($plaintext));
        //echo strtotime(now() ) . "<br/>";
        //echo date('Y-m-dTH:i:s',(int)strtotime('2040-07-25 14:35:08' )) . "<br/>";
        //echo hash('sha512/256','password') . "<br/>";
        /*
        $testJSON = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
        if(json_decode($testJSON) == null)
            echo "true";

        $a = json_decode($testJSON);

        echo $a->a;
        */
    }
}
