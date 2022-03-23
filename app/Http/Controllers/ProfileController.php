<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        try {
            return response()->json(auth()->user());
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function editUser(Request $request, $id)
    {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'firstName' => ['required', 'string', 'max:255'],
                'lastName' => ['required', 'string', 'max:255'],
                'email' => ['string', 'email', 'max:255'],
                'phone' => ['required', 'string', 'max:255']
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            if(!$request->file('image')){
                $user = User::where('id', $id);
            $user->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'phone' => $request->phone
            ]);
            }
            else{
            $path = $request->file('image')->store('public/profile/images');
            $user = User::where('id', $id);
            $user->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'image' => $path,
                'phone' => $request->phone
            ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'data' => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function editAdmin(Request $request, $id)
    {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'firstName' => ['required', 'string', 'max:255'],
                'lastName' => ['required', 'string', 'max:255'],
                'phone' => ['required', 'string', 'max:255']
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            $path = $request->file('image')->store('public/profile/images');
            $admin = Admin::where('id', $id);
            $admin->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'image' => $path,
                'phone' => $request->phone
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Staff updated successfully',
                'data' => $admin
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message' => $th
            ], 503);
        }
    }
}
