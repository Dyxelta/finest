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
            'category_id' => 1,
            'wallet_id' => 1,
            'budget_name' => 'Entertainment',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
