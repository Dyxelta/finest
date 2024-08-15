<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_name',
        'category_is_income',
        'icon'
    ];

    public function Budget() {
        return $this->hasOne(Budget::class);
    }

    public function Transactions() {
        return $this->hasMany(Transaction::class);
    }

    public function RecurringTransactions() {
        return $this->hasMany(RecurringTransaction::class);
    }
}
