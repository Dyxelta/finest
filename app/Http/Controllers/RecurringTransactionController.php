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

        $category = Category::where('category_name', $request->category_name)->firstOrFail();

        $recurringTransactionAmount = $category->transaction_is_income ? $request->recurring_transaction_amount : -$request->recurring_transaction_amount;

        $wallet = Wallet::where('wallet_name', $request->wallet_name)->firstOrFail();

        RecurringTransaction::create([
            'user_id' => $user->id,
            'wallet_id' => $wallet->id,
            'category_id' => $category->id,
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

        $recurringTransaction = RecurringTransaction::findOrFail($recurringTransactionId);

        $wallet = Wallet::where('wallet_name', $request->wallet_name)->firstOrFail();
        $category = Category::where('category_name', $request->category_name)->firstOrFail();

        $originalAmount = $recurringTransaction->transaction_amount;

        $recurringTransactionAmount = $category->transaction_is_income ? $request->recurring_transaction_amount : -$request->recurring_transaction_amount;

        $recurringTransactionNote = $request->transaction_note;
        $recurringTransactionDate = $request->transaction_date;

        $recurringTransaction->wallet_id = $wallet->id;
        $recurringTransaction->category_id = $category->id;
        $recurringTransaction->transaction_amount = $recurringTransactionAmount;
        $recurringTransaction->transaction_note = $recurringTransactionNote;
        $recurringTransaction->transaction_date = $recurringTransactionDate;

        $recurringTransaction->save();

        return redirect()->back();
    }
}
