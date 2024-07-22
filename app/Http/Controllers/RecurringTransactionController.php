<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\RecurringTransaction;
use App\Models\Wallet;
use Illuminate\Http\Request;

class RecurringTransactionController extends Controller
{
    public function addRecurringTransaction(Request $request) {

        $request->validate([
            'wallet_name' => 'required|string',
            'category_name' => 'required|string',
            'recurring_transaction_amount' => 'required|numeric|min:1',
            'recurring_transaction_note' => 'string|max:255',
            'recurring_transaction_date' => 'required'
        ]);

        $user = auth()->user();

        $recurringTransactionAmount = 0;
        $recurringTransactionIsIncome = Category::firstWhere('category_name', $request->category_name)->transaction_is_income;

        if($recurringTransactionIsIncome == true) {
            $recurringTransactionAmount += $request->recurring_transaction_amount;
        } else {
            $recurringTransactionAmount -= $request->recurring_transaction_amount;
        }

        RecurringTransaction::create([
            'user_id' => $user->id,
            'wallet_id' => Wallet::firstWhere('wallet_name', $request->wallet_name)->id,
            'category_id' => Category::firstWhere('category_name', $request->category_name)->id,
            'recurring_transaction_amount' => $recurringTransactionAmount,
            'recurring_transaction_note' => $request->transaction_note,
            'recurring_transaction_date' => $request->transaction_date,
        ]);

        return redirect()->back();
    }

    public function deleteRecurringTransaction(RecurringTransaction $recurringTransaction) {
        $recurringTransaction->delete();

        return redirect()->back();
    }

    public function editRecurringTransaction(Request $request) {

        $request->validate([
            'wallet_name' => 'required|string',
            'category_name' => 'required|string',
            'recurring_transaction_amount' => 'required|numeric|min:1',
            'recurring_transaction_note' => 'string|max:255',
            'recurring_transaction_date' => 'required'
        ]);

        $recurringTransactionId = $request->id;

        $walletId = Wallet::firstWhere('wallet_name', $request->wallet_name)->id;
        $categoryId = Category::firstWhere('category_name', $request->category_name)->id;

        $transactionAmount = 0;
        $transactionIsIncome = Category::firstWhere('id', $categoryId)->transaction_is_income;
        if($transactionIsIncome == true) {
            $transactionAmount += $request->transaction_amount;
        } else {
            $transactionAmount -= $request->transaction_amount;
        }

        $recurringTransactionNote = $request->recurring_transaction_note;
        $recurringTransactionDate = $request->recurring_transaction_date;

        $recurringTransaction = RecurringTransaction::findOrFail($recurringTransactionId);

        $recurringTransaction->wallet_id = $walletId;
        $recurringTransaction->category_id = $categoryId;
        $recurringTransaction->transaction_amount = $transactionAmount;
        $recurringTransaction->transaction_note = $recurringTransactionNote;
        $recurringTransaction->transaction_date = $recurringTransactionDate;

        $recurringTransaction->save();

        return redirect()->back();
    }
}
