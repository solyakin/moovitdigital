import axios from 'axios';

// const FETCH_ADS_REQUEST = "FETCH_ADS_REQUEST",
// const FETCH_ADS_SUCCESS = "FETCH_ADS_SUCCESS",
// const FETCH_ADS_FAILURE = "FETCH_ADS_FAILURE"
const fb_token = "EAAJi2Ryc3kYBAKtlFuMAoC5EuxsIoKB9toDgQgdO0fMV5Xn3yruMqUGWzNexExIcRNA6FTO0s7Bku9isochZC7KZCXsE97sQAxFaVFXSAScaWTtw2U55hWf80mAB6x6Aw6ZBMbZB2smzxOhlgBhwjh1ZCyquLB3LLQ2QVO1UziBBhX8nTdVfn";

const url = `https://graph.facebook.com/v12.0/act_743293312680703/campaigns?fields=insights.time_range({"since":"2021-08-01","until":"2021-08-13"}){spend,impressions,actions},name,AD_ID&access_token=${fb_token}`;

export const fetchAds  = () => {
    return function(dispatch){
        dispatch(fetch_ads_request());
        axios.get(url)
        .then(response => {
            const ads = response.data;
            const results = ads.data;
            const Ad_list = results.map((result => result))
            dispatch(fetch_ads_success(Ad_list));
        })
        .catch(error => {
            dispatch(fetch_ads_error(error.message))
        })
    }
}

export function fetch_ads_request(){
    return{
        type: 'FETCH_ADS_REQUEST'
    }
}

export function fetch_ads_success(ads){
    return{
        type : 'FETCH_ADS_SUCCESS',
        payload : ads
    }
}
export function fetch_ads_error(error){
    return{
        type : 'FETCH_ADS_FAILURE',
        payload : error
    }
}
