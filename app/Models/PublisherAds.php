<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublisherAds extends Model
{
    use HasFactory;

    protected $fillable = [
        'script',
        'banner_id',
        'publisher_id',
        'impressions',
        'clicks',
        'user_id',
        'advert_id'
    ];

    public function users() {
        return $this->belongsTo(User::class, 'publisher_id');
    }

    public function advertisers() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function banners() {
        return $this->belongsTo(Banners::class, 'banner_id');
    }

    public function Ad() {
        return $this->belongsTo(Advert::class, 'advert_id');
    }
}
