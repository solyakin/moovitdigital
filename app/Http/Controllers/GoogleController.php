<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function loginWithGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callbackFromGoogle()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();
            // dd($user);

            $is_user = User::where('email', $user->getEmail())->first();
            if (!$is_user) {

                $saveUser = User::create([
                    'google_id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'remember_token' => $user->token,
                    'password' => Hash::make($user->getName() . '@' . $user->getId()),
                    'email_verified_at' => now(),
                ]);


                Auth::loginUsingId($saveUser->id);

                // return redirect()->to('https://moovitdigital.com/account-type');
                return response()->json([
                    'success' => true,
                    'user'=> $saveUser,
                    'token'=> $user->token,
                    'action'=>'register'
                ]);
            } else {
                $saveUser = User::where('email',  $user->getEmail())->update([
                    'google_id' => $user->getId(),
                    'remember_token' => $user->token,
                ]);
                $saveUser = User::where('email', $user->getEmail())->first();

                Auth::loginUsingId($saveUser->id);
                // $userId = User::select('users.*')->find(auth()->user()->id);

                // return redirect()->to('https://moovitdigital.com/dashboard');
                return response()->json([
                    'success' => true,
                    'user'=> $saveUser,
                    'token'=> $user->token,
                    'action'=>'login'
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message'=> $th
            ], 503);
        }
    }
}
