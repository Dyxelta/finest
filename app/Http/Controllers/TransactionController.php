<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function addTransaction(Request $request) {

        $request->validate([
            'wallet_name' => 'required|string',
            'category_name' => 'required|string',
            'transaction_amount' => 'required|numeric|min:1',
            'transaction_note' => 'string|max:255',
            'transaction_date' => 'required'
        ]);

        $user = auth()->user();

        $category = Category::where('category_name', $request->category_name)->firstOrFail();

        $transactionAmount = $category->transaction_is_income ? $request->transaction_amount : -$request->transaction_amount;

        $wallet = Wallet::where('wallet_name', $request->wallet_name)->firstOrFail();

        Transaction::create([
            'user_id' => $user->id,
            'wallet_id' => $wallet->id,
            'category_id' => $category->id,
            'transaction_amount' => $transactionAmount,
            'transaction_note' => $request->transaction_note,
            'transaction_date' => $request->transaction_date,
        ]);

        $this->changeWalletBalance($wallet, $transactionAmount);

        return redirect()->back();
    }

    public function deleteTransaction(Transaction $transaction) {
        $transaction->delete();

        return redirect()->back();
    }

    public function editTransaction(Request $request) {

        $request->validate([
            'wallet_name' => 'required|string',
            'category_name' => 'required|string',
            'transaction_amount' => 'required|numeric|min:1',
            'transaction_note' => 'string|max:255',
            'transaction_date' => 'required'
        ]);


        $transactionId = $request->id;

        $transaction = Transaction::findOrFail($transactionId);

        $wallet = Wallet::where('wallet_name', $request->wallet_name)->firstOrFail();
        $category = Category::where('category_name', $request->category_name)->firstOrFail();

        $originalAmount = $transaction->transaction_amount;

        $transactionAmount = $category->transaction_is_income ? $request->transaction_amount : -$request->transaction_amount;

        $transactionNote = $request->transaction_note;
        $transactionDate = $request->transaction_date;

        $transaction->wallet_id = $wallet->id;
        $transaction->category_id = $category->id;
        $transaction->transaction_amount = $transactionAmount;
        $transaction->transaction_note = $transactionNote;
        $transaction->transaction_date = $transactionDate;

        $amountDifference = $transactionAmount - $originalAmount;
        $this->changeWalletBalance($wallet, $amountDifference);

        $transaction->save();

        return redirect()->back();
    }

    private function changeWalletBalance(Wallet $wallet, $amount) {
        $wallet->wallet_balance += $amount;
        $wallet->save();
    }

    public function showAllUserTransaction() {
        $user = auth()->user();

        $transactions = Transaction::where('user_id', $user->id)->get();

        return ['transactions' => $transactions];
    }

    public function showTransactionByWallet(Wallet $wallet) {

        $userId = auth()->user()->id;

        $walletId = $wallet->id;

        $transactions = Transaction::where('user_id', $userId)->where('wallet_id', $walletId)->get();

        return ['transactions' => $transactions];
    }

    public function showTransactionByCategory(Category $category) {

        $userId = auth()->user()->id;

        $categoryId = $category->id;

        $transactions = Transaction::where('user_id', $userId)->where('category_id', $categoryId)->get();

        return ['transactions' => $transactions];
    }

    public function showTransactionByMonth(Request $request) {

        $userId = auth()->user()->id;

        $selectedMonth = $request->month;

        $startDate = Carbon::createFromFormat('Y-m', $selectedMonth)->startOfMonth();
        $endDate = Carbon::createFromFormat('Y-m', $selectedMonth)->endOfMonth();

        $transactions = Transaction::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->get();

        return ['transactions' => $transactions];
    }

}
