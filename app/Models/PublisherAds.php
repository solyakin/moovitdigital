<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublisherAds extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'banner',
        'user_id'
    ];

    public function users() {
        return $this->belongsToMany(User::class, 'user_id');
    }
}
