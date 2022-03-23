<?php

namespace App\Http\Controllers;

use App\Models\Banners;
use App\Models\ImpressionIp;
use App\Models\Ip;
use App\Models\PublisherAds;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdCodeController extends Controller
{
    public function show(Request $request, $id, $width, $height, $publisher_id)
    {
        try {
            $ad = Banners::where('id', $id)->where('width', $width)->where('height', $height)->first();
            $ip = $request->ip();
            $checkIp = ImpressionIp::where('ip', $ip)->first();
            if(!$checkIp){
                ImpressionIp::create([
                    'ip' => $ip
                ]);
                PublisherAds::where('banner_id', $id)->where('publisher_id', $publisher_id)->increment('impressions');
            }
            $pub = PublisherAds::where('banner_id', $id)->where('publisher_id', $publisher_id)->first();
            $publisher = User::where('id', $publisher_id)->where('role', 'publisher')->first();
            if ($ad && $publisher) {
                return view('adcode', compact('ad', 'pub'));
            } else {
                return view('notfound');
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ],503);
        }
    }

    public function clickCount(Request $request){
        $ip = $request->ip();
        $checkIp = Ip::where('ip', $ip)->first();
        if(!$checkIp){
            Ip::create([
                'ip' => $ip
            ]);
            PublisherAds::where('id', $request->id)->increment('clicks');
        }
    }

    public function allBanners()
    {
        try {
            $banner = Banners::all();
            return response()->json([
                'success' => true,
                'data' => $banner
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ],503);
        }
    }
}
