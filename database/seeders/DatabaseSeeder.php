<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Wallet;
use App\Models\Category;
use App\Models\Budget;
use App\Models\Transaction;
use App\Models\RecurringTransaction;
use App\Models\Reminder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            UserSeeder::class,
            WalletSeeder::class,
            CategorySeeder::class,
            BudgetSeeder::class,
            TransactionSeeder::class,
            RecurringTransactionSeeder::class,
            ReminderSeeder::class
        ]);
    }
}
