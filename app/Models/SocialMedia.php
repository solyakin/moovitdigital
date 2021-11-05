<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_Id',
        'type',
        'budget_Id',
        'username',
        'password'
    ];

    public function user() {
        $this->belongsTo(User::class, 'user_Id');
    }

    public function budget() {
        $this->belongsTo(SocialMediaBudget::class, 'budget_Id');
    }
}
