<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\Advert;
use App\Models\Banners;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Notifications\ApproveNotification;
use App\Notifications\AssignNotification;
use App\Notifications\NewAdvertNotification;
use Illuminate\Support\Facades\Notification;

class AdvertController extends Controller
{
    public function createAds (Request $request) {
        try {
            $admin = Admin::where('role', 'admin')->get();
            $data = $request->all();
        $validate = Validator::make($data, [
            'title' => 'required|string|max:250',
            'content' => 'required|string|max:250',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'graphic_id' => 'required',
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
            'fb_page' => 'required|string',
            'twitter' => 'required|string',
            'linkedin' => 'required|string'
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 401);
        }

        if(!$request->image) {
            $advert = Advert::create([
                'title' => $request->title,
                'content' => $request->content,
                'graphic_id' => json_encode($request->graphic_id),
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
                'fb_page' => $request->fb_page,
                'twitter' => $request->twitter,
                'linkedin' => $request->linkedin,
                'end' => $request->end,
                'demographics' => json_encode($request->demographics),
                'interests' => json_encode($request->interests),
                'createdBy' => auth()->user()->id
            ]);
        } else {
            $path = $request->file('image')->store('public/advert/images');
        //     $imageName = time().'.'.$request->image->extension();

        // $path = $request->image->move(public_path('advert/images'), $imageName);

            $advert = Advert::create([
                'title' => $request->title,
                'content' => $request->content,
                'image' => $path,
                'graphic_id' => json_encode($request->graphic_id),
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
                'fb_page' => $request->fb_page,
                'twitter' => $request->twitter,
                'linkedin' => $request->linkedin,
                'demographics' => json_encode($request->demographics),
                'interests' => json_encode($request->interests),
                'createdBy' => auth()->user()->id
            ]);
        }

        $advertData = [
            'title' =>$request->title,
            'firstName'=>auth()->user()->firstName
        ];
        Notification::send($admin, new NewAdvertNotification($advertData));

        return response()->json([
            'success' => true,
            'message' => 'Ad created successfully',
            'data' => $advert
        ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message'=> $th
            ], 503);
        }
    }

    public function getUserAds () {
        try {
            $ads = Advert::where('createdBy', auth()->user()->id)->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $ads
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message'=> $th
            ], 503);
        }
    }

    public function getAllAds() {
        try {
            $advert = Advert::where('title', '!=', null)->orderBy('created_at', 'desc')->paginate(7);

            return response()->json([
                'success' => true,
                'data' => $advert
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message'=> $th
            ], 503);
        }
    }

    public function approve(Request $request, $id) {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'approved' => ['required', 'integer', 'max:250']
            ]);

            if($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            if($request->approved === 1) {
                $active = 1;
            } else {
                $active = 0;
            }

            $advert = Advert::where('id', $id)->first();
            if($advert){
                $adUser = $advert->createdBy;
                $adTitle = $advert->title;
                $getUser = User::where('id', $adUser)->first();
                $advert->update([
                    'approved' => $request->approved,
                    'active' => $active
                ]);
                Notification::send($getUser, new ApproveNotification($adTitle));
                return response()->json([
                    'success'=> true,
                    'message' => 'Ads has been updated',
                    'data'=>$advert
                ], 200);
            }else{
                return response()->json([
                    'success'=>false,
                    'message'=>'Ads not found'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message'=> $th
            ], 503);
        }
    }

    public function assign(Request $request, $id) {
        try {
            $marketer = Admin::where('role', 'marketer')
            ->where('id', $request->assigned)->first();
            $data = $request->all();
            $validator = Validator::make($data, [
                'assigned' => ['required', 'integer', 'max:250']
            ]);

            if($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            $advert = Advert::where('id', $id)->first();
            $name = $marketer['firstName'];
            $adTitle = $advert->title;
            $advert->update([
                'assigned' => $request->assigned
            ]);
            $assignMail = [
                'title'=> $adTitle,
                'name' =>  `Hello $name`,
                'body' => `You have been assigned an Ads with title "$adTitle" to manage.`,
                'url' => url(`https://moovitdigital.com/marketer/preview-advert/$id`),
                'text' => 'View Ads',
                'thanks'=> 'Best Regards'
            ];

            Notification::send($marketer, new AssignNotification($assignMail));

            return response()->json([
                'success'=> true,
                'message' => 'Ads has been assigned'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message'=> $th
            ], 503);
        }
    }

    public function banner(Request $request){
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'name' => ['required', 'string', 'max:250'],
                'banner' => ['required', 'image', 'mimes:png,jpg,gif', 'max:2050'],
                'description' => ['required', 'string', 'max:250'],
                'width' => ['required', 'integer'],
                'height' => ['required', 'integer'],
                'user_id' => ['required'],
                'url' => ['url'],
                'advert_id' => ['required']
            ]);

            if($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 401);
            }

            $path = $request->file('banner')->store("public");

            $banner = Banners::create([
                'name' => $request->name,
                'banner' => $path,
                'description' => $request->description,
                'width' => $request->width,
                'height' => $request->height,
                'url'=> $request->url,
                'user_id' => $request->user_id,
                'advert_id' => $request->advert_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Banner uploaded successfully',
                'data' => $banner
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function updateDate(Request $request, $id) {
        try {
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
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message'=> $th
            ], 503);
        }

    }

    public function updateAmount(Request $request, $id) {
        try {
            $data = $request->all();
            $validate = Validator::make($data, [
                'amount_used' => ['required', 'integer']
            ]);

            if($validate->fails()){
                return response()->json(['error' => $validate->errors()]);
            }
            $amount = Advert::where('id', $id)->first();
            $amount->update([
                'amount_used' => $request->amount_used
            ]);

            return response()->json([
                'success' => true,
                'message' => 'amount updated successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th
            ]);
        }
    }
}
