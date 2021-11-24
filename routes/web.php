<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\GoogleController;
use Symfony\Component\Console\Input\Input;
use App\Http\Controllers\FaceBookController;
use App\Http\Controllers\FacebookLoginController;

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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/callpage', function () {
    return view('call');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Google Login URL
Route::prefix('google')->name('google.')->group( function(){
    Route::get('googlelogin', [GoogleController::class, 'loginWithGoogle'])->name('googlelogin');
    Route::any('callback', [GoogleController::class, 'callbackFromGoogle'])->name('callback');
});
// Facebook Login URL
Route::prefix('facebook')->name('facebook.')->group( function(){
    Route::get('auth', [FacebookLoginController::class, 'loginUsingFacebook'])->name('login');
    Route::get('callback', [FacebookLoginController::class, 'callbackFromFacebook'])->name('callback');
});
