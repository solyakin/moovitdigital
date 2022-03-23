<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Contact;
use App\Notifications\NewContactNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    public function contact(Request $request) {
        try {
            $admin = Admin::all();
            $collection = collect($admin);
            $filtered = $collection->where('role', 'admin');
            $filtered->all();
            $data = $request->all();
            $validator = Validator::make($data, [
                'name' => 'required',
                'email' => 'required|email',
                'subject' => 'required',
                'message' => 'required'
            ]);

            if($validator->fails()){
                return response()->json(['error' => $validator->errors()->all()], 401);
            }

            $contact = Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'message' => $request->message
            ]);

            Notification::send($filtered, new NewContactNotification($request->name, $request->subject));

            return response()->json([
                'success' => true,
                'message' => 'Thanks for contacting Us',
                'data' => $contact
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function getContacts () {
        try {
            return Contact::all();
        } catch (\Throwable $th) {
            return response()->json([
                'success'=> false,
                'message'=> $th
            ], 503);
        }
    }
}
