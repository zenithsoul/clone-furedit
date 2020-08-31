<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/
// -- FOR API CALL -- [START]

Route::get('/init', 'Session\Exapi@pingsession');

// -- FOR API CALL -- [END]

Route::get('/', 'Main@indextest');
Route::get('/phpinfo', function () {
    echo phpinfo();

});

Route::get('/loginpage', 'Main@loginpage');

Route::get('/newtopic', 'Post\Posttoppic@newtopic_view');
Route::post('/newtopic', 'Post\Posttoppic@newtopic_post');
Route::get('/alltopic', 'Post\Posttoppic@alltopic_get'); 
Route::get('/topic/{keytopic}', 'Post\Posttoppic@topic_get');
Route::post('/gettopic', 'Post\Posttoppic@topic_api');
Route::post('/newreply', 'Post\Posttoppic@reply_postapi');
Route::post('/newsubreply', 'Post\Posttoppic@subreply_postapi');
Route::post('/setvote', 'Post\Posttoppic@setvote_api');
Route::post('/setgetvote', 'Post\Posttoppic@setgetvote_api');
Route::post('/setendorsement', 'Post\Posttoppic@setendorsement_api');
Route::post('/getendorsement', 'Post\Posttoppic@getendorsement_api');

Route::post('/login', 'User\Userlogin@login');
Route::get('/logout', 'User\Userlogin@logout');

Route::get('/initmodel', 'Session\Exapi@functxt');
Route::get('/testse', 'User\Userlogin@testse');






//Route::post('/xlr', 'Session\Exapi@funcpost');
//Route::get('/xlr/{idtest}', 'Session\Exapi@checkTest');

/*
Route::get('/login', 'User\Userlogin@loginpage');

Route::get('/check', function () {
    return 'อายุเกิน 200 จ้า';
})->middleware('age:testhd');

Route::get('/home', function () {
    return 'ยินดีต้อนรับเข้าสู่หน้าแรก';
});
*/
/*
    API
*/

//