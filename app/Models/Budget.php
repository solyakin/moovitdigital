<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'budget'
    ];

    public function adverts() {
        return $this->hasMany(Advert::class, 'budget_id');
    }
}
