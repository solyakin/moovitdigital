<?php

namespace App\Http\Controllers;

use App\Models\SocialMediaBudget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SocialMediaBudgetController extends Controller
{
    public function create(Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:250'],
            'description' => ['required', 'string', 'max:250'],
            'budget' => ['required', 'string', 'max:250']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $budget = SocialMediaBudget::create([
            'name' => $request->name,
            'description' => $request->description,
            'budget' => $request->budget
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Social media budget created successfully',
            'data' => $budget
        ]);
    }

    public function updateBudget(Request $request, $id) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:250'],
            'description' => ['required', 'string', 'max:250'],
            'budget' => ['required', 'string', 'max:250']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $budget = SocialMediaBudget::where('id', $id);
        $budget->update([
            'name' => $request->name,
            'description' => $request->description,
            'budget' => $request->budget
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Budget updated successfully',
            'data' => $budget
        ]);
    }
}
