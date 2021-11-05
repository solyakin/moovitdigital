<?php

namespace App\Http\Controllers;

use App\Models\Graphic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GraphicController extends Controller
{
    public function createGraphic (Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:250'],
            'image' => ['required', 'string', 'max:250'],
            // 'image' => ['required', 'image', 'mimes:png,jpg,svg,gif', 'max:2500']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        };

        // $path = $request->file('image')->store('public/ads/images');

        $graphic = Graphic::create([
            'name' => $request->name,
            'image' => $request->image
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Graphic created successfully',
            'data' => $graphic
        ], 200);
    }
}
