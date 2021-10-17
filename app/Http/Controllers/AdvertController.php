<?php

namespace App\Http\Controllers;

use App\Models\Advert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdvertController extends Controller
{
    public function createAds (Request $request) {
        $data = $request->all();
        $validate = Validator::make($data, [
            'title' => 'required|string|max:250',
            'content' => 'required|string|max:250',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'graphic_id' => 'required|integer|max:250',
            'budget' => 'required|integer|max:250',
            'audience' => 'required|string|max:250',
            'location' => 'required|string|max:500',
            'ageRange' => 'required|string|max:250',
            'start' => 'required|string|max:250',
            'end' => 'required|string|max:250',
            'createdBy' => 'required|integer|max:250',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        }

        if(!$request->image) {
            $advert = Advert::create([
                'title' => $request->title,
                'content' => $request->content,
                'graphic_id' => $request->graphic
            ]);
        }
    }
}
