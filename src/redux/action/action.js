import axios from 'axios';

// const FETCH_ADS_REQUEST = "FETCH_ADS_REQUEST",
// const FETCH_ADS_SUCCESS = "FETCH_ADS_SUCCESS",
// const FETCH_ADS_FAILURE = "FETCH_ADS_FAILURE"
const fb_token = "EAAJi2Ryc3kYBAICv79ZCKtqEdBI8KrqFI2SNpQ9at0zj9C92xBFRaJ32ZChnTRywrBOsuWFJj49sNT6lrPU7azByvtCjJWPwsNtGaHWZBKxKbLCDZAe56bYyF3Ax4zepESUm3zbgmccMhrdUs6ELrZBwyDUeiVqS7Ip79IYx0fA1RA7KZBHjoB";

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
