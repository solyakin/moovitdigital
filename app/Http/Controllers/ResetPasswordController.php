<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Validator;

class ResetPasswordController extends Controller
{
    public function passwordReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Email doesn't exist"
            ], 404);
        } else {
            $status = Password::sendResetLink(
                $request->only('email')
            );
            return $status === Password::RESET_LINK_SENT
                ? response()->json([
                    'success' => true,
                    'message' => 'Reset link sent successfully',
                    'data' => $status
                ], 200)
                : response()->withErrors(['email' => __($status)]);
        }
    }

    public function resetPassword(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'token' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        // $request->validate([
        //     'token' => 'required',
        //     'email' => 'required|email',
        //     'password' => 'required|min:8|confirmed',
        // ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json([
                'success' => true,
                'message' => 'Password reset successfully',
                'data' => $status
            ], 200)
            : back()->withErrors(['email' => [__($status)]]);
    }

    // protected function resetPassword($user, $password)
    // {
    //     $user->password = Hash::make($password);
    //     $user->save();
    //     event(new PasswordReset($user));
    // }
    // protected function sendResetResponse(Request $request, $response)
    // {
    //     $response = ['message' => "Password reset successful"];
    //     return response($response, 200);
    // }
    // protected function sendResetFailedResponse(Request $request, $response)
    // {
    //     $response = "Token Invalid";
    //     return response($response, 401);
    // }
}
