<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'wallet_id',
        'budget_name',
        'budget_amount',
        'budget_description',
    ];

    public function User() {
        return $this->belongsTo(User::class);
    }

    public function Category() {
        return $this->belongsTo(Category::class);
    }

    public function Wallet() {
        return $this->belongsTo(Wallet::class);
    }
}
