<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Withdraw extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'bank',
        'bank_acc',
        'account_name',
        'done',
        'request_by'
    ];

    public function Withdraw() {
        return $this->belongsTo(User::class, 'request_by');
    }
}
