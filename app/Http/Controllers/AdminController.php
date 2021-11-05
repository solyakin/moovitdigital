<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function staff()
    {
        if (auth()->user()->role === 'admin') {

            $staff = Admin::where('id', '!=', null)->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $staff
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized'
            ], 401);
        }
    }

    public function destroy(Admin $admin, $id)
    {
        $delete = $admin->where('id', $id);
        $delete->delete();

        return response()->json([
            'success' => true,
            'message' => 'staff deleted successfully'
        ]);
    }

    public function staffById($id)
    {
        if (auth()->user()->role === 'admin') {
            $staff = Admin::all();
            $collector = collect($staff);
            $filter = $collector->where('id', $id);
            $filter->all();

            return response()->json([
                'success' => true,
                'data' => $filter
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'You are unauthorized'
            ], 401);
        }
    }
}
