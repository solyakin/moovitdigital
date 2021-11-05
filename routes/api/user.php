<?php

use App\Models\Advert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdvertController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\VerificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('user/login',[LoginController::class, 'userLogin'])->name('userLogin');
Route::post('user/register',[RegisterController::class, 'userRegister'])->name('userRegister');
Route::get('/email/verify', [VerificationController::class, 'show'])->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
Route::put('user/update/{id}',[RegisterController::class, 'userUpdate'])->name('userUpdate');
Route::put('user/publisher',[RegisterController::class, 'publisher'])->name('publisher');
Route::group( ['prefix' => 'user','middleware' => ['auth:user-api','scopes:user'] ],function(){
   // authenticated users routes here
    Route::get('dashboard',[LoginController::class, 'userDashboard']);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::get('profile', [ProfileController::class, 'profile']);
    Route::put('edit-profile/{id}', [ProfileController::class, 'editUser']);
    Route::post('create-advert', [AdvertController::class, 'createAds']);
    Route::get('user-ads', [AdvertController::class, 'getUserAds']);
    Route::put('enddate/{id}', [AdvertController::class, 'updateDate']);
    Route::post('media-account', [SocialMediaController::class, 'create']);
});
