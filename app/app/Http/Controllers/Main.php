<?php

namespace Endnix\Http\Controllers;

use Illuminate\Http\Request;
use Endnix\Events\UserEvent;
use Endnix\Exmodel\User\Userhandle;

class Main extends Controller
{
    public function indextest()
    {
        event(new UserEvent("123"));
        $usrhandle = new Userhandle();
        //echo $usrhandle->userlogin("a0","a0");
        return view('master');
    }

    public function loginpage()
    {
        
        return view('login');
    }

    public function login(Request $request)
    {
        return response()->json(['username' => $request->input('username')]);
    }
}
 