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
        'gender',
        'area',
        'location',
        'awareness',
        'target',
        'engagement',
        'conversions',
        'sales',
        'app_installs',
        'reach',
        'ageRange',
        'phone',
        'start',
        'end',
        'demographics',
        'interests',
        'createdBy',
        'approved',
        'assigned',
        'amount',
        'active'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'createdBy');
    }

    public function admin() {
        return $this->belongsTo(Admin::class, 'assigned');
    }

    public function graphic() {
        return $this->belongsTo(Graphic::class, 'graphic_id');
    }

    public function budget() {
        return $this->belongsTo(Budget::class, 'budget_id');
    }
}
