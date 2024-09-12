<?php

namespace App\Console\Commands;

use App\Models\RecurringTransaction;
use App\Models\Transaction;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Console\Command;

class AddMonthlyRecurringTransaction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transaction:add-monthly-recurring';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add recurring transaction for each month';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        RecurringTransaction::chunk(100, function ($recurringTransactions) {
            foreach ($recurringTransactions as $recurringTransaction) {
                $this->processTransaction($recurringTransaction);
            }
        });
    }

    private function processTransaction($recurringTransaction)
    {
        $transactionDate = Carbon::parse($recurringTransaction->recurring_transaction_date);
        $nextTransactionDate = $transactionDate->copy()->addMonth();

        if ($nextTransactionDate->day != $transactionDate->day) {
            $nextTransactionDate->day = $nextTransactionDate->lastOfMonth()->day;
        }

        if ($nextTransactionDate->isToday()) {
            $this->createTransaction($recurringTransaction, $nextTransactionDate);
        }
    }

    private function createTransaction($recurringTransaction, $date)
    {
        $category = $recurringTransaction->category;
        $transactionAmount = $category->category_is_income
            ? $recurringTransaction->recurring_transaction_amount
            : -$recurringTransaction->recurring_transaction_amount;

        Transaction::create([
            'user_id' => $recurringTransaction->user_id,
            'wallet_id' => $recurringTransaction->wallet_id,
            'category_id' => $recurringTransaction->category_id,
            'transaction_amount' => $transactionAmount,
            'transaction_note' => $recurringTransaction->recurring_transaction_note,
            'transaction_date' => $date,
        ]);

        $wallet = $recurringTransaction->wallet;
        $this->changeWalletBalance($wallet, $transactionAmount);
    }

    private function changeWalletBalance(Wallet $wallet, $amount)
    {
        $wallet->wallet_balance += $amount;
        $wallet->save();
    }
}
