import axios from 'axios';

// const FETCH_ADS_REQUEST = "FETCH_ADS_REQUEST",
// const FETCH_ADS_SUCCESS = "FETCH_ADS_SUCCESS",
// const FETCH_ADS_FAILURE = "FETCH_ADS_FAILURE"
// const fb_token = "EAAJi2Ryc3kYBAKlg7WpU0sAa8jBRleduavkfsLjYZCinZAMrv6pQhw3998aW97wgLWZA0cDqzdNNMqgrNFgZB73BhEsYb7QTkChnaG0V6ZAVYUyZA4CQZBqzEkOCgrV5O0WMjqKzRNy3R3YXEEZAywKJZCsLnaKiGwW1FdQZB1BUllZCgiXNOuIdxUJwOb3wkKFNL6yanoPlR3Xk3NovPBaUCl5fgx9wN3C5q0QUywGeeNW0m4widCAHdtz";

// const url = `https://graph.facebook.com/v12.0/act_743293312680703/campaigns?fields=insights.time_range({"since":"2021-08-01","until":"2021-08-13"}){spend,impressions,actions},name,AD_ID&access_token=${fb_token}`;

const fb_token = "EAAJ7pzYdk3QBAKKDJGG96B9KNZATqxvlyfeBu1MmPCNQzQvoS3qBw9Ergzqp1bf5XVCGeHXoLSjluKihrabZCcfR1G8S94DeAvtW396u8zntQpfF5ySyrDkfG0TxTkAW7cdMrKCzYzXgVM7V9J3qUAvn7MuaN6NeAIxao3x4eJsXnuvZB5Hcqo8gsrd7dkZD"

const url = `https://graph.facebook.com/v12.0/act_606210337460991/campaigns?fields=insights.time_range({"since":"2022-01-01","until":"2022-01-13"}){spend,impressions,actions},name,AD_ID&access_token=${fb_token}`;


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
