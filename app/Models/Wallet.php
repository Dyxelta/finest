<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'wallet_name',
        'wallet_balance',
        'wallet_description',
    ];

    public function User() {
        return $this->belongsTo(User::class);
    }

    public function Transactions() {
        return $this->hasMany(Transaction::class);
    }

    public function RecurringTransactions() {
        return $this->hasMany(RecurringTransaction::class);
    }
}
