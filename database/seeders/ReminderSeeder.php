<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReminderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('reminders')->insert([
            'user_id' => 1,
            'message' => 'Your wallet\'s balance is almost out',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
