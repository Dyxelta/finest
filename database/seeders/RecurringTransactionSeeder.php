<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecurringTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('recurring_transactions')->insert([
            'user_id' => 1,
            'wallet_id' => 1,
            'category_id' => 2,
            'recurring_transaction_amount' => 2000000,
            'recurring_transaction_note' => 'Rent',
            'recurring_transaction_date' => now()->subDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
