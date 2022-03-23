<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\CallController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdCodeController;
use App\Http\Controllers\AdvertController;
use App\Http\Controllers\GoogleController;
use Symfony\Component\Console\Input\Input;
use App\Http\Controllers\FaceBookController;
use App\Http\Controllers\LinkedinAdsController;
use App\Http\Controllers\PublisherAdsController;
use App\Http\Controllers\FacebookLoginController;
use App\Models\Banners;

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
    $banners = Banners::where('id', 8)->first();
    $image = $banners->banner;
    $trim = ltrim($image, 'public/');
    // dd($trim);
    return view('welcome')->with('trim', $trim);
});
Route::get('/callpage', function () {
    return view('call');
});
Route::prefix('google')->name('google.')->group( function(){
    Route::get('googlelogin', [GoogleController::class, 'loginWithGoogle'])->name('googlelogin');
    Route::any('callback', [GoogleController::class, 'callbackFromGoogle'])->name('callback');
});
// Facebook Login URL
Route::prefix('facebook')->name('facebook.')->group( function(){
    Route::get('auth', [FacebookLoginController::class, 'loginUsingFacebook'])->name('login');
    Route::get('callback', [FacebookLoginController::class, 'callbackFromFacebook'])->name('callback');
});


// Route::post('/publisher-ads', [PublisherAdsController::class, 'publisherAds']);

Route::get('/adcode/{id}&0&2&{width}&7&59&{height}&{publisher_id}', [AdCodeController::class, 'show']);

// Auth::routes();
Route::post('click', [AdCodeController::class, 'clickCount'])->name('click');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('calling', [CallController::class, 'callLog'])->name('calling');

// Route::get('create-advert', [AdvertController::class, 'testAds']);

