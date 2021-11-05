<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Advert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Notifications\NewAdvertNotification;
use Illuminate\Support\Facades\Notification;

class AdvertController extends Controller
{
    public function createAds (Request $request) {
        $admin = Admin::all();
        $collection = collect($admin);
        $filtered = $collection->where('role', 'admin');
        $filtered->all();
        $data = $request->all();
        $validate = Validator::make($data, [
            'title' => 'required|string|max:250',
            'content' => 'required|string|max:250',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'graphic_id' => 'required|integer|max:250',
            'budget_id' => 'required|integer|max:250',
            'gender' => 'required|string|max:250',
            'area' => 'required|string|max:500',
            'location' => 'required|string|max:500',
            'awareness' => 'integer|max:500',
            'target' => 'integer|max:500',
            'engagement' => 'integer|max:500',
            'conversions' => 'integer|max:500',
            'sales' => 'integer|max:500',
            'app_installs' => 'integer|max:500',
            'reach' => 'integer|max:500',
            'ageRange' => 'required|string|max:250',
            'phone' => 'required|string|max:250',
            'start' => 'required|string|max:250',
            'end' => 'required|string|max:250',
            'demographics' => 'string|max:500',
            'interests' => 'string|max:500',
            'createdBy' => 'integer|max:250',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        }

        if(!$request->image) {
            $advert = Advert::create([
                'title' => $request->title,
                'content' => $request->content,
                'graphic_id' => $request->graphic_id,
                'budget_id' => $request->budget_id,
                'gender' => $request->gender,
                'area' => $request->area,
                'location' => json_encode($request->location),
                'awareness' => $request->awareness,
                'target' => $request->target,
                'engagement' => $request->engagement,
                'conversions' => $request->conversions,
                'sales' => $request->sales,
                'app_installs' => $request->app_installs,
                'reach' => $request->reach,
                'ageRange' => $request->ageRange,
                'phone' => $request->phone,
                'start' => $request->start,
                'end' => $request->end,
                'demographics' => json_encode($request->demographics),
                'interests' => json_encode($request->interests),
                'createdBy' => auth()->user()->id
            ]);
        } else {
            $path = $request->file('image')->store('public/advert/images');

            $advert = Advert::create([
                'title' => $request->title,
                'content' => $request->content,
                'image' => $path,
                'graphic_id' => $request->graphic_id,
                'budget_id' => $request->budget_id,
                'gender' => $request->gender,
                'area' => $request->area,
                'location' => json_encode($request->location),
                'awareness' => $request->awareness,
                'target' => $request->target,
                'engagement' => $request->engagement,
                'conversions' => $request->conversions,
                'sales' => $request->sales,
                'app_installs' => $request->app_installs,
                'reach' => $request->reach,
                'ageRange' => $request->ageRange,
                'phone' => $request->phone,
                'start' => $request->start,
                'end' => $request->end,
                'demographics' => json_encode($request->demographics),
                'interests' => json_encode($request->interests),
                'createdBy' => auth()->user()->id
            ]);
        }
        Notification::send($filtered, new NewAdvertNotification($request->title));

        return response()->json([
            'success' => true,
            'message' => 'Ad created successfully',
            'data' => $advert
        ]);
    }

    public function getUserAds () {
        $ads = Advert::where('createdBy', auth()->user()->id)->orderBy('created_at', 'desc')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $ads
        ], 200);
    }

    public function getAllAds() {
        $advert = Advert::where('title', '!=', null)->orderBy('created_at', 'desc')->paginate(7);

        return response()->json([
            'success' => true,
            'data' => $advert
        ], 200);
    }

    public function approve(Request $request, $id) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'approved' => ['required', 'integer', 'max:250']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $advert = Advert::where('id', $id);
        $advert->update([
            'approved' => $request->approved
        ]);

        return response()->json([
            'success'=> true,
            'message' => 'Ads has been updated'
        ], 200);
    }

    public function assign(Request $request, $id) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'assigned' => ['required', 'integer', 'max:250']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $advert = Advert::where('id', $id);
        $advert->update([
            'assigned' => $request->assigned
        ]);

        return response()->json([
            'success'=> true,
            'message' => 'Ads has been assigned'
        ], 200);
    }

    public function updateDate(Request $request, $id) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'end' => ['required', 'string', 'max:250']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $date = Advert::where('id', $id);
        $date->update([
            'end' => $request->end
        ]);

        return response()->json([
            'success' => true,
            'message' => 'The Ads end date has been updated'
        ], 200);

    }
}
