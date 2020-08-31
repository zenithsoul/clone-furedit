<?php
namespace Endnix\External;

use phpseclib\Crypt\TripleDES;
use phpseclib\Crypt\DES;
use phpseclib\Crypt\Hash;


class Ex_security
{
    private $keySession = "1jYk81KMllkUbs3ZXLhtvmEARhGsBOJUd1vyCcMfReSbH5kFdb";


    public function se_encode($_txt)
    {
        $cipher = new TripleDES(DES::MODE_CTR);
        $cipher->setPassword($this->keySession, 'pbkdf2', 'sha1', 'phpseclib/salt', 1000);
        return base64_encode($cipher->encrypt($_txt));
    }

    public function se_decode($_txt)
    {
        $cipher = new TripleDES(DES::MODE_CTR);
        $cipher->setPassword($this->keySession, 'pbkdf2', 'sha1', 'phpseclib/salt', 1000);
        return $cipher->decrypt(base64_decode($_txt));
    }

    public function getCookie()
    {
        $_get = \Cookie::get('_cfs');
        $_get = $this->se_decode($_get);
        $_get = json_decode($_get);
        
        if($_get != null)
        {
            if($_get->expire < strtotime(now()))
            {
                return $_get;
            }    
            else
            {
                $_get->expire = strtotime(date('Y-m-d H:i:s'), strtotime('+1 hour'));
                $_set = json_encode($_get);
                $_set = $this->se_encode($_set);
                \Cookie::queue(\Cookie::make('_cfs', $_set , 60*60*90));

                return $_get;
            }
        }
        else
        {
            \Cookie::queue(\Cookie::forget('_cfs'));
            
            return null;
        }
    }

    public function setCookie($_objtxt)
    {   
        \Cookie::queue(\Cookie::forget('_cfs'));

        $_objtxt->expire = strtotime(date('Y-m-d H:i:s'), strtotime('+1 hour'));
        $_set = json_encode($_objtxt);
        $_set = $this->se_encode($_set);
        
        \Cookie::queue(\Cookie::make('_cfs', $_set , 60*60*90));
    }

    public function delCookie()
    {   
        \Cookie::queue(\Cookie::forget('_cfs'));
    }

    public function vaildCookie()
    {
        $_get = \Cookie::get('_cfs');
        $_get = $this->se_decode($_get);

        if(json_decode($_get) != null)
            return true;
        else
            return false;
    }

    public function se_hash($_txt)
    {
        return hash('sha512/256',$_txt);
    }

    public function validData($string){
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }
}