<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use App\Models\User;
use App\Notifications\PublisherApprove;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function advertisers()
    {
        try {
            $advertiser = User::where('role', 'advertiser')->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $advertiser
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function publishers()
    {
        try {
            $publisher = User::where('role', 'publisher')->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $publisher
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function users()
    {
        try {
            $users = User::where('id', '!=', null)->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $users
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function destroy(User $user, $id) {
        try {
            $delete = $user->where('id', $id)->first();
            $delete->delete();

            return response()->json([
                'success' => true,
                'message' => 'user deleted successfully'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function userById($id) {
        try {
            $user = User::all();
            $collector = collect($user);
            $filter = $collector->where('id', $id);
            $filter->all();

            return response()->json([
                'success' => true,
                'data' => $filter
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function updatePhone(Request $request){
        try {
            $userPhone = User::where('id', auth()->user()->id);
            $userPhone->update([
                'phone'=>$request->phone
            ]);

            return response()->json([
                'success'=>true,
                'message'=>'phone number updated',
                'data'=>$userPhone
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function publisherRequest(){
        $publisher = User::all();
        $user = $publisher->where('approved', Null);
        return $user;
    }

    public function approvePublisher(Request $request, $id) {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'approved' => ['required', 'integer', 'max:250']
            ]);

            if($validator->fails()){
                return response()->json(['error' => $validator->errors()], 401);
            }

            $publisher = User::where('id', $id)->where('role', 'publisher')->first();
            $publisher->update([
                'approved' => $request->approved
            ]);

            // $name = $publisher['firstName'];

            if($request->approved == 1){
                $publisherAnswer = [
                    "body" => "Welcome Onboard, Your request to be a publisher on our platform has been reviewed approved. \n Please go ahead and Login at https://moovitdigital.com/login",
                    'thanks' => 'Best Regards'
                ];
            }else{
                $publisherAnswer = [
                    "body" => "Your request to be a publisher on our platform has been reviewed and it has been rejected. \n Reasons are either: \n 1. Your website doesn't meet our criteria.\n OR \n 2. We are not taking anymore publishers at the moment.",
                    'thanks' => 'Best Regards'
                ];
            }

            Notification::send($publisher, new PublisherApprove($publisherAnswer));
            return response()->json([
                'success' => true,
                'message' => 'publisher request answered successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => true,
                'message' => $th
            ], 503);
        }
    }
}
