<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function userRegister(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return response()->json([
            'success' => true,
            'message' => 'User created successfully, Please verify email.',
            'data' => $user
        ], 200);
    }

    public function userUpdate(Request $request, $id)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'phone' => ['required', 'string', 'max:255'],
            'dob' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'company' => ['string', 'max:255'],
            'business_type' => ['string', 'max:255'],
            'other' => ['string', 'max:255'],
            'business_size' => ['string', 'max:255'],
            'turnover' => ['string', 'max:255'],
            'business_bio' => ['string', 'max:255'],
            'business_duration' => ['string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'agree' => ['required', 'integer', 'max:250']
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if (!$request->image) {
            $user = User::where('id', $id);
            $user->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'phone' => $request->phone,
                'dob' => $request->dob,
                'country' => $request->country,
                'company' => $request->company,
                'business_type' => $request->business_type,
                'other' => $request->other,
                'business_size' => $request->business_size,
                'turnover' => $request->turnover,
                'business_bio' => $request->business_bio,
                'business_duration' => $request->business_duration,
                'role' => $request->role,
                'agree' => $request->agree
            ]);
        } else {

            $path = $request->file('image')->store('public/profile/images');

            $user = User::where('id', $id);
            $user->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'image' => $path,
                'phone' => $request->phone,
                'dob' => $request->dob,
                'country' => $request->country,
                'company' => $request->company,
                'business_type' => $request->business_type,
                'other' => $request->other,
                'business_size' => $request->business_size,
                'turnover' => $request->turnover,
                'business_bio' => $request->business_bio,
                'business_duration' => $request->business_duration,
                'role' => $request->role,
                'agree' => $request->agree
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'User profile created successfully',
            'data' => $user
        ], 200);
    }

    public function publisher(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:250'],
            'phone' => ['required', 'string', 'max:255'],
            'dob' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'industry' => ['required', 'string', 'max:255'],
            'website' => ['required', 'string', 'max:255'],
            'api' => ['required', 'string', 'max:255'],
            'dimensions' => ['required', 'string', 'max:255'],
            'average_visit' => ['required', 'string', 'max:255'],
            'website_timeline' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'agree' => ['required', 'integer', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = Publisher::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'phone' => $request->phone,
            'dob' => $request->dob,
            'country' => $request->country,
            'company' => $request->company,
            'industry' => $request->industry,
            'website' => $request->website,
            'api' => $request->api,
            'dimensions' => json_encode($request->dimensions),
            'average_visit' => $request->average_visit,
            'website_timeline' => $request->website_timeline,
            'role' => $request->role,
            'agree' => $request->agree
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Request sent successfully',
            'data' => $user
        ], 200);
    }

    public function adminRegister(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'firstName' => ['string', 'max:255'],
            'lastName' => ['string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'phone' => ['string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        if (!$request->image) {
            $admin = Admin::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'role' => $request->role
            ]);
        } else {

            $path = $request->file('image')->store('public/profile/images');

            $admin = Admin::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'image' => $path,
                'phone' => $request->phone,
                'role' => $request->role
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Staff created successfully',
            'data' => $admin
        ], 200);
    }
}
