<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('wallets')->insert([
            'user_id' => 1,
            'wallet_name' => 'Wallet Name',
            'wallet_balance' => 10000000,
            'wallet_description' => 'Wallet description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('wallets')->insert([
            'user_id' => 1,
            'wallet_name' => 'Wallet Name 2',
            'wallet_balance' => 10000000,
            'wallet_description' => 'Wallet description',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('wallets')->insert([
            'user_id' => 2,
            'wallet_name' => 'Wallet Name 3',
            'wallet_balance' => 10000000,
            'wallet_description' => 'Wallet description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('wallets')->insert([
            'user_id' => 2,
            'wallet_name' => 'Wallet Name 4',
            'wallet_balance' => 10000000,
            'wallet_description' => 'Wallet description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
