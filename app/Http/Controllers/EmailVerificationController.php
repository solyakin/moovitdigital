<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class EmailVerificationController extends Controller
{
    public function verify($id, Request $request) {
        try {
            if (!$request->hasValidSignature()) {
                return response()->json(["msg" => "Invalid/Expired url provided."], 401);
            }

            $user = User::findOrFail($id);

            if (!$user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
            }

            return redirect()->to('https://moovitdigital.com/login');
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function resend() {
        try {
            if (auth()->user()->hasVerifiedEmail()) {
                return response()->json(["msg" => "Email already verified."], 400);
            }

            event(new Registered(auth()->user()));

            return response()->json(["msg" => "Email verification link sent on your email id"]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message'=> $th
            ], 503);
        }
    }
}
