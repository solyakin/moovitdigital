<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $guard = 'admin';
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'image',
        'phone',
        'role'
    ];

    public function sendPasswordResetNotification($token){
        $this->notify(new \App\Notifications\MailResetPasswordNotification($token));
    }

    public function adverts() {
        return $this->hasMany(Advert::class, 'assigned');
    }
}
