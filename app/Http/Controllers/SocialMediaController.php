<?php

namespace App\Http\Controllers;

use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SocialMediaController extends Controller
{
    public function create(Request $request) {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'user_id' => ['required', 'integer', 'max:250'],
                'type' => ['required', 'string', 'max:250'],
                'budget_id' => ['required', 'integer', 'max:250'],
                'username' => ['required', 'string', 'max:250'],
                'password' => ['required', 'string', 'max:250']
            ]);

            if($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            $media = SocialMedia::create([
                'user_id' => auth()->user()->id,
                'type' => $request->type,
                'budget_id' => $request->budget_id,
                'username' => $request->username,
                'password' => $request->password
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Request submitted successfully',
                'data' => $media
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }
}
