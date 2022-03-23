<?php

use App\Models\Advert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdCodeController;
use App\Http\Controllers\AdvertController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\WithdrawController;
use App\Http\Controllers\FlutterwaveController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\PublisherAdsController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\EmailVerificationController;

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
// Route::group(['middleware' => ['cors']], function () {
Route::post('user/login', [LoginController::class, 'userLogin'])->name('userLogin');
Route::post('user/register', [RegisterController::class, 'userRegister'])->name('userRegister');
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->name('verification.verify');
Route::post('/email/resend', [EmailVerificationController::class, 'resend'])->name('verification.resend');
Route::post('/forgot-password', [ResetPasswordController::class, 'passwordReset'])->middleware('guest')->name('password.email');
Route::get('/reset-password/{token}', function ($token) {
    return redirect()->to('https://moovitdigital.com/reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword'])->middleware('guest')->name('password.update');

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

/* New Added Routes */
// Route::get('dashboard', [VerificationController::class, 'dashboard'])->middleware(['auth', 'is_verify_email']);
// Route::get('account/verify/{token}', [VerificationController::class, 'verifyAccount'])->name('user.verify');

Route::put('user/update/{id}', [RegisterController::class, 'userUpdate'])->name('userUpdate');
Route::put('user/publisher/{id}', [RegisterController::class, 'publisher'])->name('publisher');
Route::group(['prefix' => 'user', 'middleware' => ['auth:user-api', 'scopes:user']], function () {
    // authenticated users routes here
    Route::get('dashboard', [LoginController::class, 'userDashboard']);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::get('profile', [ProfileController::class, 'profile']);
    Route::put('edit-profile/{id}', [ProfileController::class, 'editUser']);
    Route::post('create-advert', [AdvertController::class, 'createAds']);
    Route::put('update-number', [UserController::class, 'updatePhone']);
    Route::get('user-ads', [AdvertController::class, 'getUserAds']);
    Route::put('enddate/{id}', [AdvertController::class, 'updateDate']);
    Route::post('media-account', [SocialMediaController::class, 'create']);
    // The route that the button calls to initialize payment
    Route::post('/pay', [FlutterwaveController::class, 'initialize'])->name('pay');
    // The callback url after a payment
    Route::get('/rave/callback', [FlutterwaveController::class, 'callback'])->name('callback');
    Route::get('notifications', [NotificationsController::class, 'fetchNotifications']);
    Route::put('read/{id}', [NotificationsController::class, 'readNotification']);
    Route::get('/scripts', [PublisherAdsController::class, 'fetchScript']);
    Route::post('/withdraw', [WithdrawController::class, 'WithdrawRequest']);
    Route::put('/update-amount/{id}', [AdvertController::class, 'updateAmount']);
});
// });
