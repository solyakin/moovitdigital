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
            if(!$is_user){

                $saveUser = User::updateOrCreate([
                    'google_id' => $user->getId(),
                ],[
                    'email' => $user->getEmail(),
                    'remember_token'=>$user->token,
                    'password' => Hash::make($user->getName().'@'.$user->getId()),
                    'email_verified_at' => now(),
                ]);
            }else{
                $saveUser = User::where('email',  $user->getEmail())->update([
                    'google_id' => $user->getId(),
                    'remember_token'=>$user->token,
                ]);
                $saveUser = User::where('email', $user->getEmail())->first();
            }


            Auth::loginUsingId($saveUser->id);
            // dd($saveUser->id);

            return redirect()->route('home');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
