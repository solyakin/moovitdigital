<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PublisherAds;
use App\Notifications\NewPublisherAdsNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

class PublisherAdsController extends Controller
{
    public function publisherAds (Request $request) {
        $publisher = User::all();
        $collector = collect($publisher);
        $filter = $collector->where('role', 'publisher');
        $filter->all();
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'max:250', 'string'],
            'banner' => ['required', 'mimes:png,jpg,svg,gif,jpeg', 'max:2500'],
            'user_id' => ['required', 'max:250', 'integer']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $path = $request->file('banner')->store('public/publisherads/images');

        $publisher = PublisherAds::create([
            'name' => $request->name,
            'banner' => $path,
            'user_id' => $request->user_id
        ]);

        Notification::send($filter, new NewPublisherAdsNotification($request->name));

        return response()->json([
            'success' => true,
            'message' => 'Ads banner sent to publisher',
            'data' => $publisher
        ], 200);
    }
}
