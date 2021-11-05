<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialMediaBudget extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'budget'
    ];

    public function budget() {
        $this->hasMany(SocialMedia::class, 'budget_Id');
    }
}
