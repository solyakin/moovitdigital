<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function advertisers()
    {
        $advertiser = User::all();
        $collector = collect($advertiser);
        $filter = $collector->where('role', 'advertiser');
        $filter->all();

        return response()->json([
            'success' => true,
            'data' => $filter
        ], 200);
    }

    public function publishers()
    {
        $publisher = User::all();
        $collector = collect($publisher);
        $filter = $collector->where('role', 'publisher');
        $filter->all();

        return response()->json([
            'success' => true,
            'data' => $filter
        ], 200);
    }

    public function users()
    {
        $users = User::where('id', '!=', null)->orderBy('created_at', 'desc')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $users
        ], 200);
    }

    public function destroy(User $user, $id) {
        $delete = $user->where('id', $id);
        $delete->delete();

        return response()->json([
            'success' => true,
            'message' => 'user deleted successfully'
        ]);
    }

    public function userById($id) {
        $user = User::all();
        $collector = collect($user);
        $filter = $collector->where('id', $id);
        $filter->all();

        return response()->json([
            'success' => true,
            'data' => $filter
        ], 200);
    }
}
