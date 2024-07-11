<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transactions')->insert([
            'user_id' => 1,
            'wallet_id' => 1,
            'category_id' => 1,
            'transaction_amount' => 50000,
            'transaction_note' => 'Lunch',
            'transaction_date' => now()->subDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
