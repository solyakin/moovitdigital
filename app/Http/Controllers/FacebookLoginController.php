<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class FacebookLoginController extends Controller
{

    /**
     * Login Using Facebook
     */
    public function loginUsingFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callbackFromFacebook()
    {
        try {
            $user = Socialite::driver('facebook')->stateless()->user();
            $is_user = User::where('email', $user->getEmail())->first();
            if (!$is_user) {

                $saveUser = User::updateOrCreate([
                    'facebook_id' => $user->getId(),
                ], [
                    //    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'password' => Hash::make($user->getName() . '@' . $user->getId()),
                    'email_verified_at' => now(),
                ]);



                Auth::loginUsingId($saveUser->id);

                return redirect()->to('https://moovitdigital.com/login');
            } else {
                $saveUser = User::where('email',  $user->getEmail())->update([
                    'facebook_id' => $user->getId(),
                    'remember_token' => $user->token,
                ]);
                $saveUser = User::where('email', $user->getEmail())->first();


                Auth::loginUsingId($saveUser->id);

                return redirect()->to('https://moovitdigital.com/dashboard');
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message'=> $th
            ], 503);
        }
    }
}
