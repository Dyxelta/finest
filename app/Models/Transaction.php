<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'wallet_id',
        'category_id',
        'transaction_amount',
        'transaction_note',
        'transaction_date',
    ];

    public function User() {
        return $this->belongsTo(User::class);
    }

    public function Wallet() {
        return $this->belongsTo(Wallet::class);
    }

    public function Category() {
        return $this->belongsTo(Category::class);
    }
}
