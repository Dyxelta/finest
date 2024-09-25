<?php

namespace App\Observers;

use App\Models\Budget;
use App\Models\Reminder;
use App\Models\Transaction;
use App\Models\Wallet;

class TransactionObserver
{
    /**
     * Handle the Transaction "created" event.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return void
     */
    public function created(Transaction $transaction)
    {

        $userId = $transaction->user_id;
        $categoryId = $transaction->category_id;
        $walletId = $transaction->wallet_id;

        $wallet = Wallet::where('id', $walletId)->firstOrFail();

        // Fetch the budget for the user's category and wallet
        $budget = Budget::where('user_id', $userId)
            ->where('category_id', $categoryId)
            ->where('wallet_id', $walletId)
            ->first();

        // If the budget exists, calculate total monthly expenses for the category and wallet
        if ($budget) {

            $totalExpenses = Transaction::where('user_id', $userId)
                ->where('category_id', $categoryId)
                ->where('wallet_id', $walletId)
                ->whereMonth('transaction_date', now()->month)
                ->sum('transaction_amount');

            // Calculate percentage of the budget spent
            $percentageSpent = (abs($totalExpenses) / $budget->budget_amount) * 100;

            // If expenses are above 90% but below 100%, send a 90% reminder
            if ($percentageSpent >= 90 && $percentageSpent < 100) {

                $this->createReminder($userId, "Budget Limit Warning! You have spent {$percentageSpent} of your budget {$budget->budget_name} in wallet {$wallet->wallet_name}.");
            }
            // If expenses exceed the budget, send an "over-budget" reminder
            else if ($percentageSpent >= 100) {

                $this->createReminder($userId, "Budget Limit Over! Your current expense has exceeded the budget limit of {$budget->budget_name} in wallet {$wallet->wallet_name}.");
            }
        }
    }

    /**
     * Create a reminder if one has not been created for the user this month.
     *
     * @param int $userId
     * @param string $message
     * @return void
     */
    protected function createReminder($userId, $message)
    {
        Reminder::create([
            'user_id' => $userId,
            'message' => $message,
        ]);
    }
}
