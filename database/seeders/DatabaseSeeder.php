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

        User::factory()->create([
            'username' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make("password"),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Wallet::factory()->create([
            'user_id' => 1,
            'wallet_name' => 'Wallet Name',
            'wallet_balance' => 10000000,
            'wallet_description' => 'Wallet description',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Category::factory()->create([
            'category_name' => 'Food and Beverage',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Category::factory()->create([
            'category_name' => 'Rent',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Budget::factory()->create([
            'user_id' => 1,
            'category_id' => 1,
            'budget_name' => 'Entertainment',
            'budget_amount' => 500000,
            'budget_description' => 'Budget description',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Transaction::factory()->create([
            'user_id' => 1,
            'wallet_id' => 1,
            'category_id' => 1,
            'transaction_amount' => 50000,
            'transaction_note' => 'Lunch',
            'transaction_date' => now()->subDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        RecurringTransaction::factory()->create([
            'user_id' => 1,
            'wallet_id' => 1,
            'category_id' => 2,
            'recurring_transaction_amount' => 2000000,
            'recurring_transaction_note' => 'Rent',
            'recurring_transaction_date' => now()->subDay(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Reminder::factory()->create([
            'user_id' => 1,
            'message' => 'Your wallet\'s balance is almost out',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
