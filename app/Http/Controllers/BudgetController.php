<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BudgetController extends Controller
{
    public function createBudget (Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:250'],
            'description' => ['required', 'string', 'max:500'],
            'budget' => ['required', 'string', 'max:250']
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        };

        $budget = Budget::create([
            'name' => $request->name,
            'description' => $request->description,
            'budget' => $request->budget
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Budget created successfully',
            'data' => $budget
        ], 200);
    }
}
