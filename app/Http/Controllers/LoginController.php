<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function userDashboard()
    {
        try {
            $users = User::all();
            $success =  $users;

            return response()->json($success, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message'=> $th
            ], 503);
        }
    }

    public function adminDashboard()
    {
        try {
            $admins = Admin::all();
            $success =  $admins;

            return response()->json($success, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function userLogin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->all()]);
            }

            if (auth()->guard('user')->attempt(['email' => request('email'), 'password' => request('password')])) {

                config(['auth.guards.api.provider' => 'user']);

                $user = User::select('users.*')->find(auth()->guard('user')->user()->id);
                $success =  $user;
                $success['token'] =  $user->createToken('MyApp', ['user'])->accessToken;

                $saveToken = User::where('id', $success['id']);
                $saveToken->update(
                    [
                        'remember_token' => $success['token']
                    ]
                    );
                    if($success['firstName'] === Null){
                        return response()->json([
                            'data'=>$success,
                            'action'=>'new'
                            ], 200);
                    }else{
                        return response()->json([
                            'data'=>$success, 'action'=>'old'], 200);
                    }
            } else {
                return response()->json(['error' => ['Email or Password are Wrong.']], 400);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function adminLogin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->all()]);
            }

            if (Auth::guard('admin')->attempt(['email' => request('email'), 'password' => request('password')])) {

                config(['auth.guards.api.provider' => 'admin']);

                $admin = Admin::select('admins.*')->find(auth()->guard('admin')->user()->id);
                $success =  $admin;
                $success['token'] =  $admin->createToken('MyApp', ['admin'])->accessToken;

                return response()->json($success, 200);
            } else {
                return response()->json(['error' => ['Email or Password are Wrong.']], 400);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }
}
