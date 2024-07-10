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

        $transactionAmount = 0;
        $transactionIsIncome = Category::firstWhere('category_name', $request->category_name)->transaction_is_income;

        if($transactionIsIncome == true) {
            $transactionAmount += $request->transaction_amount;
        } else {
            $transactionAmount -= $request->transaction_amount;
        }

        Transaction::create([
            'user_id' => $user->id,
            'wallet_id' => Wallet::firstWhere('wallet_name', $request->wallet_name)->id,
            'category_id' => Category::firstWhere('category_name', $request->category_name)->id,
            'transaction_amount' => $transactionAmount,
            'transaction_note' => $request->transaction_note,
            'transaction_date' => $request->transaction_date,
        ]);

        return redirect()->back();
    }

    public function deleteTransaction(Transaction $transaction) {
        $transaction->delete();

        return redirect()->back();
    }

    public function updateTransaction(Request $request) {

        $request->validate([
            'wallet_name' => 'required|string',
            'category_name' => 'required|string',
            'transaction_amount' => 'required|numeric|min:1',
            'transaction_note' => 'string|max:255',
            'transaction_date' => 'required'
        ]);

        $transactionId = $request->id;

        $walletId = Wallet::firstWhere('wallet_name', $request->wallet_name)->id;
        $categoryId = Category::firstWhere('category_name', $request->category_name)->id;

        $transactionAmount = 0;
        $transactionIsIncome = Category::firstWhere('id', $categoryId)->transaction_is_income;
        if($transactionIsIncome == true) {
            $transactionAmount += $request->transaction_amount;
        } else {
            $transactionAmount -= $request->transaction_amount;
        }

        $transactionNote = $request->transaction_note;
        $transactionDate = $request->transaction_date;

        $transaction = Transaction::findOrFail($transactionId);

        $transaction->wallet_id = $walletId;
        $transaction->category_id = $categoryId;
        $transaction->transaction_amount = $transactionAmount;
        $transaction->transaction_note = $transactionNote;
        $transaction->transaction_date = $transactionDate;

        $transaction->save();

        return redirect()->back();
    }

    public function showAllUserTransaction() {
        $user = auth()->user();

        $transactions = Transaction::where('user_id' == $user->id)->get();

        return Inertia::render('Dashboard', ['transactions' => $transactions]);
    }

    public function showTransactionByWallet(Wallet $wallet) {

        $userId = auth()->user()->id;

        $walletId = $wallet->id;

        $transactions = Transaction::where('user_id', $userId)->andWhere('wallet_id', $walletId)->get();

        return Inertia::render('WalletDetail', ['transactions' => $transactions]);
    }

    public function showTransactionByCategory(Category $category) {

        $userId = auth()->user()->id;

        $categoryId = $category->id;

        $transactions = Transaction::where('user_id', $userId)->andWhere('category_id', $categoryId)->get();

        return Inertia::render('TransactionReport', ['transactions' => $transactions]);
    }

    public function showTransactionByMonth(Request $request) {

        $userId = auth()->user()->id;

        $selectedMonth = $request->month;

        $startDate = Carbon::createFromFormat('Y-m', $selectedMonth)->startOfMonth();
        $endDate = Carbon::createFromFormat('Y-m', $selectedMonth)->endOfMonth();

        $transactions = Transaction::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->get();

        return Inertia::render('TransactionReport', ['transactions' => $transactions]);
    }

}
