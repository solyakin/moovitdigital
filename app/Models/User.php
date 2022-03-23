<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'email_verified_at',
        'status',
        'google_id',
        'facebook_id',
        'password',
        'image',
        'phone',
        'dob',
        'country',
        'company',
        'industry',
        'website',
        'industry',
        'business_type',
        'other',
        'average_visit',
        'website_timeline',
        'turnover',
        'business_size',
        'business_bio',
        'business_duration',
        'role',
        'agree',
        'approved'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sendPasswordResetNotification($token){
        $url = 'https://moovitdigital.com/reset-password?token='.$token;
        $this->notify(new \App\Notifications\MailResetPasswordNotification($url));
    }

    public function adverts() {
        return $this->hasMany(Advert::class, 'createdBy');
    }

    public function publisherAds() {
        return $this->hasMany(PublisherAds::class, 'publisher_id');
    }

    public function Banners() {
        return $this->hasMany(Banners::class, 'user_id');
    }

    public function Withdraw() {
        return $this->hasMany(Withdraw::class, 'request_by');
    }
}
