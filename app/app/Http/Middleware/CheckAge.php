<?php

namespace Endnix\Http\Middleware;

use Closure;

class CheckAge
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle( $request, Closure $next)
    {
        //เช็คว่าอายุที่ส่งมานั้นมีค่าไม่เกิน 200 หรือเปล่า
        if ($request->age <= 200) {
            //ถ้าไม่เกิน 200 จะส่งไปยังหน้า home
            return redirect('home');
        }
        //ถ้าไม่เข้าเงื่อนไข ให้ function ทำงานต่อไป
        return $next($request);
    }

    public function testhd( $request, Closure $next)
    {
        //เช็คว่าอายุที่ส่งมานั้นมีค่าไม่เกิน 200 หรือเปล่า
        if ($request->age <= 200) {
            //ถ้าไม่เกิน 200 จะส่งไปยังหน้า home
            return redirect('home');
        }
        //ถ้าไม่เข้าเงื่อนไข ให้ function ทำงานต่อไป
        return $next($request);
    }
}
