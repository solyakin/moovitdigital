<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPSTORM_META\map;

class Banners extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'banner',
        'description',
        'width',
        'height',
        'user_id',
        'url',
        'advert_id'
    ];

    public function BannerAds() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function publisherAds() {
        return $this->hasMany(PublisherAds::class. 'banner_id');
    }

    public function Advert() {
        return $this->belongsTo(Advert::class, 'advert_id');
    }
}
