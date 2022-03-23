<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PublisherAds;
use App\Notifications\NewPublisherAdsNotification;
use FacebookAds\Object\AdsPixel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

class PublisherAdsController extends Controller
{
    public function publisherAds(Request $request)
    {
        // try {
        $data = $request->all();
        $validator = Validator::make($data, [
            'script' => ['required', 'max:2000', 'string'],
            'publisher_id' => ['required'],
            'banner_id' => ['required'],
            'user_id' => ['required'],
            'advert_id' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $adScript = PublisherAds::create([
            'script' => $request->script,
            'publisher_id' => $request->publisher_id,
            'banner_id' => $request->banner_id,
            'user_id' => $request->user_id,
            'advert_id' => $request->advert_id
        ]);
            // $publish = $request->publisher_id;
            // $script = 'Adcode';
            // Notification::send($publish, new NewPublisherAdsNotification($script));
        // }

        return response()->json([
            'success' => true,
            'message' => 'Ads banner sent to publisher',
            'data' => $adScript
        ], 200);
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => $th
        //     ], 503);
        // }
    }

    public function fetchScript() {
        $user = auth()->user()->id;
        $script = PublisherAds::where('publisher_id', $user)->first();
        return response()->json([
            'success' => true,
            'data' => $script
        ]);
    }

    public function fetchAllScripts() {
        $script = PublisherAds::all();
        return response()->json([
            'success' => true,
            'data' => $script
        ], 200);
    }
}
