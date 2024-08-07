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
            'category_name' => 'Food and Beverage',
            'category_is_income' => 0,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Entertainment',
            'category_is_income' => 0,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('categories')->insert([
            'category_name' => 'Entertainmentsss',
            'category_is_income' => 0,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        DB::table('categories')->insert([
            'category_name' => 'Shopping',
            'category_is_income' => 0,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Salary',
            'category_is_income' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Maling',
            'category_is_income' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);

    }
}
