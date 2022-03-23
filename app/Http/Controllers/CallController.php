<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use AfricasTalking\SDK\AfricasTalking;
use Illuminate\Support\Facades\Http;

class CallController extends Controller
{

    public function callLog()
    {

        // Set your app credentials
        $username = "sandbox";
        $apike   = "aa64f427dccb643a175b69405f4efda410785c4bad5959999bfa16fb8210943a";


        // Initialize the SDK
        $AT       = new AfricasTalking($username, $apike);

        // Get the voice service
        $voice    = $AT->voice();

        // Set your Africa's Talking phone number in international format
        $from     = "+2347054528890";

        // Set the numbers you want to call to in a comma-separated list
        $to       = "+2349061591694";

        try {
            // Make the call
            $results = $voice->call(Http::post('https://voice.sandbox.africastalking.com/call'), [
                'from' => '+2347054528890',
                'to'   => '+2349061591694'
            ]);

            // $response = Http::post('https://voice.sandbox.africastalking.com/call', [
            //     'username' => $username,
            //     'apiKey' => $apike
            // ]);

            print_r($results);
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
