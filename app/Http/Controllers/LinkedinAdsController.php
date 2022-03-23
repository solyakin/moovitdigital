<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LinkedinAdsController extends Controller
{
    public function getAds() {
        $data = Http::withToken(env('LINKEDIN_AUTH_TOKEN'))->get('https://api.linkedin.com/v2/adCreativesV2?q=search&search.campaign.values[0]=urn:li:sponsoredCampaign:193773413&search.status.values[0]=ACTIVE&search.status.values[1]=CANCELED&sort.field=ID&sort.order=DESCENDING');

        return $data;
    }
}
