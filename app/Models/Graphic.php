<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graphic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image'
    ];

    public function adverts() {
        return $this->hasMany(Advert::class, 'graphic_id');
    }
}
