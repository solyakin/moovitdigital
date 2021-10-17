<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advert extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'image',
        'likes',
        'impressions',
        'graphic_id',
        'budget_id',
        'audience',
        'location',
        'ageRange',
        'start',
        'end',
        'createdBy',
        'assigned',
        'amount'
    ];
}
