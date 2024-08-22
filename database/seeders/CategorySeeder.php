<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            'category_name' => 'Housing',
            'category_is_income' => 0,
            'icon' => 'home-heart',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Bill & Utilities',
            'category_is_income' => 0,
            'icon' => 'receipt',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Food & Beverage',
            'category_is_income' => 0,
            'icon' => 'restaurant',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Entertainment',
            'category_is_income' => 0,
            'icon' => 'joystick',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Subscriptions',
            'category_is_income' => 0,
            'icon' => 'credit-card',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Gifts & Donations',
            'category_is_income' => 0,
            'icon' => 'gift',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Health',
            'category_is_income' => 0,
            'icon' => 'plus-medical',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Fitness',
            'category_is_income' => 0,
            'icon' => 'dumbbell',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Insurance',
            'category_is_income' => 0,
            'icon' => 'check-shield',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Investment',
            'category_is_income' => 0,
            'icon' => 'candles',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Shopping',
            'category_is_income' => 0,
            'icon' => 'shopping-bag',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Transportation',
            'category_is_income' => 0,
            'icon' => 'car',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Pet',
            'category_is_income' => 0,
            'icon' => 'dog',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Travel',
            'category_is_income' => 0,
            'icon' => 'plane-alt',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Education',
            'category_is_income' => 0,
            'icon' => 'graduation',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Self-Care',
            'category_is_income' => 0,
            'icon' => 'universal-access',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Outgoing Transafer',
            'category_is_income' => 0,
            'icon' => 'export',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Other Expense',
            'category_is_income' => 0,
            'icon' => 'archive-out',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        //Income
        DB::table('categories')->insert([
            'category_name' => 'Salary',
            'category_is_income' => 1,
            'icon' => 'money-withdraw',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Interest',
            'category_is_income' => 1,
            'icon' => 'trending-up',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Gift',
            'category_is_income' => 1,
            'icon' => 'gift',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Incoming Transfer',
            'category_is_income' => 1,
            'icon' => 'import',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Other Income',
            'category_is_income' => 1,
            'icon' => 'archive-in',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
