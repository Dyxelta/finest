<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
        for ($i = 0; $i < 30; $i++) {
            DB::table('transactions')->insert([
                'user_id' => 1,
                'wallet_id' => 1,
                'category_id' => 1,
                'transaction_amount' => -50000,
                'transaction_note' => 'Lunch',
                'transaction_date' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        for ($i = 0; $i < 30; $i++) {
            DB::table('transactions')->insert([
                'user_id' => 1,
                'wallet_id' => 1,
                'category_id' => 1,
                'transaction_amount' => -50000,
                'transaction_note' => '34958738945783458347583475',
                'transaction_date' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        for ($i = 0; $i < 30; $i++) {
            DB::table('transactions')->insert([
                'user_id' => 1,
                'wallet_id' => 1,
                'category_id' => 2,
                'transaction_amount' => -50000,
                'transaction_note' => 'testt',
                'transaction_date' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        for ($i = 0; $i < 30; $i++) {
            DB::table('transactions')->insert([
                'user_id' => 1,
                'wallet_id' => 2,
                'category_id' => 1,
                'transaction_amount' => -50000,
                'transaction_note' => 'testt',
                'transaction_date' => Carbon::create(2024, 7, 1),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        for ($i = 0; $i < 30; $i++) {
            DB::table('transactions')->insert([
                'user_id' => 1,
                'wallet_id' => 2,
                'category_id' => 1,
                'transaction_amount' => -50000,
                'transaction_note' => 'testt',
                'transaction_date' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
