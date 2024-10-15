<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\RecurringTransaction;
use App\Models\Transaction;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RecurringTransactionController extends Controller
{
    public function addRecurringTransaction(Request $request)
    {
        $request->validate([
            'wallet_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'recurring_transaction_amount' => 'required|numeric|min:1|max:100000000',
            'recurring_transaction_note' => 'nullable|string|max:255',
            'recurring_transaction_date' => 'required'
        ]);

        $user = auth()->user();

        $category = Category::where('id', $request->category_id)->firstOrFail();

        $recurringTransactionAmount = $category->category_is_income ? $request->recurring_transaction_amount : -$request->recurring_transaction_amount;

        $wallet = Wallet::where('user_id', $user->id)->where('id', $request->wallet_id)->firstOrFail();

        $recurringTransaction = RecurringTransaction::create([
            'user_id' => $user->id,
            'wallet_id' => $wallet->id,
            'category_id' => $category->id,
            'recurring_transaction_amount' => $recurringTransactionAmount,
            'recurring_transaction_note' => $request->recurring_transaction_note ?? '',
            'recurring_transaction_date' => $request->recurring_transaction_date,
        ]);

        $this->addPastTransactions($recurringTransaction);

        return redirect()->back();
    }

    public function deleteRecurringTransaction(RecurringTransaction $recurringTransaction)
    {
        $recurringTransaction->delete();

        return redirect()->back();
    }

    public function editRecurringTransaction(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'wallet_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'recurring_transaction_amount' => 'required|numeric|min:1|max:100000000',
            'recurring_transaction_note' => 'nullable|string|max:255',
            'recurring_transaction_date' => 'required'
        ]);

        $recurringTransactionId = $request->id;

        $recurringTransaction = RecurringTransaction::findOrFail($recurringTransactionId);

        $wallet = Wallet::where('user_id', $user->id)->where('id', $request->wallet_id)->firstOrFail();
        $category = Category::where('id', $request->category_id)->firstOrFail();

        $recurringTransactionAmount = $category->category_is_income ? $request->recurring_transaction_amount : -$request->recurring_transaction_amount;

        $recurringTransactionNote = $request->recurring_transaction_note ?? '';
        $recurringTransactionDate = $request->recurring_transaction_date;

        $recurringTransaction->wallet_id = $wallet->id;
        $recurringTransaction->category_id = $category->id;
        $recurringTransaction->recurring_transaction_amount = $recurringTransactionAmount;
        $recurringTransaction->recurring_transaction_note = $recurringTransactionNote;
        $recurringTransaction->recurring_transaction_date = $recurringTransactionDate;

        $recurringTransaction->save();

        return redirect()->back();
    }

    private function addPastTransactions($recurringTransaction)
    {
        $today = now();
        $start = Carbon::parse($recurringTransaction->recurring_transaction_date);
        $end = $today;

        while ($start < $end) {
            $this->createTransaction($recurringTransaction, $start);
            $start->addMonth();
        }
    }

    private function createTransaction($recurringTransaction, $date)
    {
        Transaction::create([
            'user_id' => $recurringTransaction->user_id,
            'wallet_id' => $recurringTransaction->wallet_id,
            'category_id' => $recurringTransaction->category_id,
            'transaction_amount' => $recurringTransaction->recurring_transaction_amount,
            'transaction_note' => $recurringTransaction->recurring_transaction_note ?? '',
            'transaction_date' => $date,
        ]);

        $wallet = $recurringTransaction->wallet;
        $this->changeWalletBalance($wallet, $recurringTransaction->recurring_transaction_amount);
    }

    private function changeWalletBalance(Wallet $wallet, $amount)
    {
        $wallet->wallet_balance += $amount;
        $wallet->save();
    }

    public function showRecurringTransactionByWallet()
    {
        $userId = auth()->user()->id;

        $recurring_transaction = RecurringTransaction::where('user_id', $userId)->orderBy('id', 'asc')->with(['wallet', 'category'])->get();

        return ['recurring_transaction' => $recurring_transaction];
    }
}
