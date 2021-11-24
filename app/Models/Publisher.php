<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publisher extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'dob',
        'country',
        'company',
        'industry',
        'website',
        'api',
        'dimensions',
        'average_visit',
        'website_timeline',
        'role',
        'agree'
    ];
}
