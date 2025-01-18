<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'user1',
            'email' => 'willmelt7@gmail.com',
            'password' => Hash::make("password"),
            'created_at' => now(),
            'updated_at' => now(),
            'email_verified_at'=> now()
        ]);

        DB::table('users')->insert([
            'username' => 'user2',
            'email' => 'willmelt8@gmail.com',
            'password' => Hash::make("password"),
            'created_at' => now(),
            'updated_at' => now(),
            'email_verified_at'=> now()
        ]);
    }
}
