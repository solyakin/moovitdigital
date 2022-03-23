<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use App\Models\Withdraw;
use App\Notifications\WithdrawDone;
use App\Notifications\WithdrawRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

class WithdrawController extends Controller
{
    public function WithdrawRequest(Request $request) {
        try {
            $admin = Admin::where('role', 'admin')->first();
            if(auth()->user()->role === 'publisher'){
                $data = $request->all();
                $validate = Validator::make($data, [
                    'amount' =>['required', 'integer', 'max:500'],
                    'bank' => ['required', 'string', 'max:500'],
                    'bank_acc' => ['required', 'integer', 'max:500'],
                    'account_name' => ['required', 'string', 'max:500']
                ]);
                if($validate->fails()){
                    return response()->json(['error'=> $validate->errors()->all()]);
                }
                $withdraw = Withdraw::create([
                    'amount'=> $request->amount,
                    'bank'=>$request->bank,
                    'bank_acc'=>$request->bank_acc,
                    'account_name'=>$request->account_name,
                    'request_by' => auth()->user()->id
                ]);
                $widthrawInfo = [
                    'name' => auth()->user()->firstName,
                    'amount' => $request->amount
                ];

                Notification::send($admin, new WithdrawRequest($widthrawInfo));
                return response()->json([
                    'success' => true,
                    'message'=> 'Request sent successfully',
                    'data'=> $withdraw
                ]);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Not authorize'
                ], 403);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function fetchRequest(){
        try {
            return Withdraw::all();
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    public function withdrawDone(Request $request, $id) {
        try {
            $withdraw = Withdraw::where('id', $id)->first();
            $withdraw->update([
                'done' => 'yes'
            ]);

            $publisher = User::where('id', $withdraw['request_by'])->first();
            $amount = $withdraw['amount'];
            $bank = $withdraw['bank'];
            $bankAcc = $withdraw['bank_acc'];
            $name = $publisher['firstname'];
            $publisherMail = [
                'amount' => $amount,
                'bank' => $bank,
                'bank_acc' => $bankAcc,
                'name' =>  `Hello $name`,
                'body' => `Your withdraw request has been done. \nThe amount of $amount has been sent to $bank with bank account $bankAcc. \n Keep Winning!`,
                'thanks' => 'Best Regards 😊'
            ];

            Notification::send($publisher, new WithdrawDone($publisherMail));
            return response()->json([
                'success' => true,
                'message' => 'Withdraw Request Done'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }
}
