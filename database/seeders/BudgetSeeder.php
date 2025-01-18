<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 2,
            'wallet_id' => 1,
            'budget_name' => 'Pengeluaran Lain',
            'budget_amount' => 100000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 3,
            'wallet_id' => 1,
            'budget_name' => 'Makan makan',
            'budget_amount' => 100000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 4,
            'wallet_id' => 1,
            'budget_name' => 'Entertainment',
            'budget_amount' => 100000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 11,
            'wallet_id' => 1,
            'budget_name' => 'Shopping',
            'budget_amount' => 60000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 12,
            'wallet_id' => 1,
            'budget_name' => 'Bengkel',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);


        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 2,
            'wallet_id' => 2,
            'budget_name' => 'Pengeluaran Lain',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 3,
            'wallet_id' => 2,
            'budget_name' => 'Makan makan',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 4,
            'wallet_id' => 2,
            'budget_name' => 'Entertainment',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 11,
            'wallet_id' => 2,
            'budget_name' => 'Shopping',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('budgets')->insert([
            'user_id' => 1,
            'category_id' => 12,
            'wallet_id' => 2,
            'budget_name' => 'Bengkel',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        

        DB::table('budgets')->insert([
            'user_id' =>2,
            'category_id' => 2,
            'wallet_id' => 3,
            'budget_name' => 'Pengeluaran Lain',
            'budget_amount' => 100000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 3,
            'wallet_id' => 3,
            'budget_name' => 'Makan makan',
            'budget_amount' => 100000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 4,
            'wallet_id' => 3,
            'budget_name' => 'Entertainment',
            'budget_amount' => 100000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 11,
            'wallet_id' => 3,
            'budget_name' => 'Shopping',
            'budget_amount' => 200000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 12,
            'wallet_id' => 3,
            'budget_name' => 'Bengkel',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);


        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 2,
            'wallet_id' => 4,
            'budget_name' => 'Pengeluaran Lain',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 3,
            'wallet_id' => 4,
            'budget_name' => 'Makan makan',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 4,
            'wallet_id' => 4,
            'budget_name' => 'Entertainment',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 11,
            'wallet_id' => 4,
            'budget_name' => 'Shopping',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('budgets')->insert([
            'user_id' => 2,
            'category_id' => 12,
            'wallet_id' => 4,
            'budget_name' => 'Bengkel',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
