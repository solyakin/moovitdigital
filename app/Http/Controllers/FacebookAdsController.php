<?php
/**
 * Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

require __DIR__ . '/vendor/autoload.php';

use FacebookAds\Object\AdAccount;
use FacebookAds\Object\AdsInsights;
use FacebookAds\Api;
use FacebookAds\Logger\CurlLogger;

$access_token = 'EAAJ7pzYdk3QBAAdiaB4ekoH9i78unrRIZBGrQfvOU2bIuuXayLd9ZAxhOo6b713E4HomSIB62ZApTGW8xn7dW8tQh8MZCoO6ibZBcVcNbRkPIGRZC6sQT66YYFdYlJkZBVDcf7odQPDUwnxt76B1nEQs0WZB85R8E3TYmApCBUjYSaqIN4FZCBSLe7mZC0ha4w0NoZD';
$ad_account_id = 'act_1085876678897496';
$app_secret = 'ac3ad7f7b733d80a4ced045e4b0fc22a';
$app_id = '698908051084148';

$api = Api::init($app_id, $app_secret, $access_token);
$api->setLogger(new CurlLogger());

$fields = array(
  'impressions',
  'actions:post_reaction',
  'clicks',
  'account_id',
  'campaign_group_name',
  'campaign_group_id',
  'account_name',
  'campaign_name',
  'campaign_id',
  'adgroup_id',
  'adgroup_name',
  'date_start',
  'date_stop',
  'objective',
  'buying_type',
  'start_time',
  'stop_time',
  'bid',
  'budget',
  'schedule',
);
$params = array(
  'time_range' => array('since' => '2021-10-20','until' => '2021-11-19'),
  'filtering' => array(array('field' => 'delivery_info','operator' => 'IN','value' => array('active','pending_review','completed','recently_completed')),array('field' => 'impressions','operator' => 'GREATER_THAN','value' => '1')),
  'level' => 'adset',
  'breakdowns' => array('age','gender','ad_name'),
);
echo json_encode((new AdAccount($ad_account_id))->getInsights(
  $fields,
  $params
)->getResponse()->getContent(), JSON_PRETTY_PRINT);

