<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdvertController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GraphicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublisherAdsController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SocialMediaBudgetController;
use App\Http\Controllers\UserController;
use App\Models\PublisherAds;

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

Route::post('admin/login',[LoginController::class, 'adminLogin'])->name('adminLogin');
Route::post('admin/register',[RegisterController::class, 'adminRegister'])->name('adminRegister');
Route::group( ['prefix' => 'admin','middleware' => ['auth:admin-api','scopes:admin'] ],function(){
   // authenticated staff routes here
    Route::get('dashboard',[LoginController::class, 'adminDashboard']);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::get('profile', [ProfileController::class, 'profile']);
    Route::put('edit-profile/{id}', [ProfileController::class, 'editAdmin']);
    Route::post('create-graphic', [GraphicController::class, 'createGraphic']);
    Route::post('create-budget', [BudgetController::class, 'createBudget']);
    Route::get('messages', [ContactController::class, 'getContacts']);
    Route::get('publisher', [UserController::class, 'publishers']);
    Route::get('advertiser', [UserController::class, 'advertisers']);
    Route::post('publisher-ads', [PublisherAdsController::class, 'publisherAds']);
    Route::get('ads', [AdvertController::class, 'getAllAds']);
    Route::get('users', [UserController::class, 'users']);
    Route::get('staff', [AdminController::class, 'staff']);
    Route::post('delete-user/{id}', [UserController::class, 'destroy']);
    Route::post('delete-staff/{id}', [UserController::class, 'destroy']);
    Route::put('approve-ads/{id}', [AdvertController::class, 'approve']);
    Route::put('assign-ads/{id}', [AdvertController::class, 'assign']);
    Route::get('user/{id}', [UserController::class, 'userById']);
    Route::get('staff/{id}', [AdminController::class, 'staffById']);
    Route::put('update-budget/{id}', [BudgetController::class, 'updateBudget']);
    Route::post('media-budget', [SocialMediaBudgetController::class, 'create']);
    Route::put('media-budget/{id}', [SocialMediaBudgetController::class, 'updateBudget']);
});
