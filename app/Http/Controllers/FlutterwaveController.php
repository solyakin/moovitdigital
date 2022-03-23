<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use KingFlamez\Rave\Facades\Rave as Flutterwave;

class FlutterwaveController extends Controller
{
    /**
     * Initialize Rave payment process
     * @return void
     */
    public function initialize()
    {
        try {
            //This generates a payment reference
            $reference = Flutterwave::generateReference();

            // Enter the details of the payment
            $data = [
                'payment_options' => 'card,banktransfer',
                'amount' => request()->amount,
                'email' => request()->email,
                'tx_ref' => $reference,
                'currency' => "NGN",
                'redirect_url' => route('callback'),
                'customer' => [
                    'email' => request()->email,
                    "phone_number" => request()->phone,
                    "name" => request()->name
                ],

                "customizations" => [
                    "title" => 'Movie Ticket',
                    "description" => now()
                ]
            ];

            $payment = Flutterwave::initializePayment($data);


            if ($payment['status'] !== 'success') {
                // notify something went wrong
                return;
            }

            return redirect($payment['data']['link']);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }
    }

    /**
     * Obtain Rave callback information
     * @return void
     */
    public function callback()
    {
        try {
            $status = request()->status;

            //if payment is successful
            if ($status ==  'successful') {

                $transactionID = Flutterwave::getTransactionIDFromCallback();
                $data = Flutterwave::verifyTransaction($transactionID);

                // Advert::where

                return response()->json([
                    'success' => true,
                    'message' => 'Transaction Successful',
                    'data' => $data
                ], 200);
            } elseif ($status ==  'cancelled') {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction cancelled'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction failed'
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th
            ], 503);
        }

    }
}
