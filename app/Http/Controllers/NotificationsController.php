<?php

namespace App\Http\Controllers;

use App\Models\Notifications;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function fetchNotifications() {
        $unreadNotifications = auth()->user()->unreadNotifications;
        return response()->json([
            'success' => true,
            'data' => $unreadNotifications
        ], 200);
    }

    public function readNotification(Request $request, $id){
        try {
            $read = Notifications::where('id', $id)->first();
            $read->update([
                'read_at'=>$request->read_at
            ]);
            return response()->json([
                'success'=> true,
                'message'=>'message has been read'
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
