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

        $amountArray = [100000, 50000,40000, 35000, 30000, 25000, 20000, 15000, 10000];
        $categoryArray = [
            [2, 3, 4, 11, 12, 6, 17, 18, 1],
            [2, 3, 4, 11, 12, 16, 17, 18, 5],
            [2, 3, 4, 11, 12, 6, 7, 14, 8],
            [2, 3, 4, 11, 12, 16, 17, 18, 9],
            [2, 3, 4, 11, 12, 6, 7, 18, 10],
            [2, 3, 4, 11, 12, 7, 14, 16, 13],
            [2, 3, 4, 11, 12, 14, 16, 17, 15]
        ];
    
        $MonthArray = [1, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

        //Expense Wallet User 1 Wallet Pertama 
        for ($k = 1; $k < 13; $k++) { // bulan
            for ($i = 0; $i < count($categoryArray[$k % 7]); $i++) { // category

                DB::table('transactions')->insert([
                    'user_id' => 1,
                    'wallet_id' => 1,
                    'category_id' => $categoryArray[$k % 7][$i],
                    'transaction_amount' => -$amountArray[($k) % count($amountArray)],
                    'transaction_note' => 'Expense',
                    'transaction_date' => Carbon::create($k >= 2 ? 2024 : 2025, $MonthArray[$k - 1], 15),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }

        //Expense Wallet User 1 Wallet Kedua 
        for ($k = 1; $k < 13; $k++) {
            for ($i = 0; $i <count($categoryArray[$k % 7]); $i++) {
                DB::table('transactions')->insert([
                    'user_id' => 1,
                    'wallet_id' => 2,
                    'category_id' => $categoryArray[$k % 7][$i],
                    'transaction_amount' => -$amountArray[($i + $k) % count($amountArray)],
                    'transaction_note' => 'Expense',
                    'transaction_date' => Carbon::create($k >= 2 ? 2024 : 2025, $MonthArray[$k - 1], 15),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }

        //Income Wallet User 1 Wallet Pertama 
        for ($k = 1; $k < 13; $k++) {

            DB::table('transactions')->insert([
                'user_id' => 1,
                'wallet_id' => 1,
                'category_id' => 19,
                'transaction_amount' => 500000,
                'transaction_note' => 'Salary',
                'transaction_date' => Carbon::create($k >= 2 ? 2024 : 2025, $MonthArray[$k - 1], 15),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }


        // User 2 

        //Expense Wallet User 2 Wallet Pertama 
        for ($k = 1; $k < 13; $k++) {
            for ($i = 0; $i < count($categoryArray[$k % 7]); $i++) {
                DB::table('transactions')->insert([
                    'user_id' => 2,
                    'wallet_id' => 3,
                    'category_id' => $categoryArray[$k % 7][$i],
                    'transaction_amount' => -$amountArray[($i + $k) % count($amountArray)],
                    'transaction_note' => 'Expense',
                    'transaction_date' => Carbon::create($k >= 2 ? 2024 : 2025, $MonthArray[$k - 1], 15),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }

        //Expense Wallet User 2 Wallet Kedua
        for ($k = 1; $k < 13; $k++) {
            for ($i = 0; $i < count($categoryArray[$k % 7]); $i++) {
                DB::table('transactions')->insert([
                    'user_id' => 1,
                    'wallet_id' => 1,
                    'category_id' => $categoryArray[$k % 7][$i],
                    'transaction_amount' => -$amountArray[($i + $k) % count($amountArray)],
                    'transaction_note' => 'Expense',
                    'transaction_date' => Carbon::create($k >= 2 ? 2024 : 2025, $MonthArray[$k - 1], 15),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }

        //Income Wallet User 2 Wallet Pertama 
        for ($k = 1; $k < 13; $k++) {
            DB::table('transactions')->insert([
                'user_id' => 2,
                'wallet_id' => 3,
                'category_id' => 19,
                'transaction_amount' => 500000,
                'transaction_note' => 'Expense',
                'transaction_date' => Carbon::create($k >= 2 ? 2024 : 2025, $MonthArray[$k - 1], 15),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        //Income Wallet User 2 Wallet Kedua 
        for ($k = 1; $k < 13; $k++) {
            DB::table('transactions')->insert([
                'user_id' => 2,
                'wallet_id' => 4,
                'category_id' => 19,
                'transaction_amount' => $amountArray[1],
                'transaction_note' => 'Salary',
                'transaction_date' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
