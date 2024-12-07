<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function addTransaction(Request $request)
    {

        $request->validate([
            'wallet_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'transaction_amount' => 'required|numeric|min:1|max:1000000000',
            'transaction_note' => 'nullable|string|max:255',
            'transaction_date' => 'required|date'
        ]);

        $user = auth()->user();

        $category = Category::where('id', $request->category_id)->firstOrFail();

        $transactionAmount = $category->category_is_income ? $request->transaction_amount : -$request->transaction_amount;

        $wallet = Wallet::where('id', $request->wallet_id)->firstOrFail();

        Transaction::create([
            'user_id' => $user->id,
            'wallet_id' => $wallet->id,
            'category_id' => $category->id,
            'transaction_amount' => $transactionAmount,
            'transaction_note' => $request->transaction_note ?? '',
            'transaction_date' => $request->transaction_date,
        ]);

        $this->changeWalletBalance($wallet, $transactionAmount);

        return redirect()->intended(route('transactionPage'));
    }

    public function deleteTransaction(Transaction $transaction)
    {
        $wallet = Wallet::where('id', $transaction->wallet_id)->firstOrFail();
        $transactionAmount = -$transaction->transaction_amount;

        $this->changeWalletBalance($wallet, $transactionAmount);

        $transaction->delete();

        return redirect()->back();
    }

    public function editTransaction(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'wallet_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'transaction_amount' => 'required|numeric|min:1|max:1000000000',
            'transaction_note' => 'nullable|string|max:255',
            'transaction_date' => 'required'
        ]);

        $transactionId = $request->id;

        $transaction = Transaction::findOrFail($transactionId);

        $wallet = Wallet::where('user_id', $user->id)->where('id', $request->wallet_id)->firstOrFail();
        $category = Category::where('id', $request->category_id)->firstOrFail();

        $originalAmount = $transaction->transaction_amount;

        $transactionAmount = $category->category_is_income ? $request->transaction_amount : -$request->transaction_amount;

        $transactionNote = $request->transaction_note ?? '';
        $transactionDate = $request->transaction_date;

        $transaction->wallet_id = $wallet->id;
        $transaction->category_id = $category->id;
        $transaction->transaction_amount = $transactionAmount;
        $transaction->transaction_note = $transactionNote;
        $transaction->transaction_date = $transactionDate;

        $amountDifference = $transactionAmount - $originalAmount;
        $this->changeWalletBalance($wallet, $amountDifference);

        $transaction->save();

        return redirect()->intended(route('transactionPage'));
    }

    private function changeWalletBalance(Wallet $wallet, $amount)
    {
        $wallet->wallet_balance += $amount;
        $wallet->save();
    }

    public function showAllUserTransaction()
    {
        $user = auth()->user();

        $transactions = Transaction::where('user_id', $user->id)
            ->with('category')
            ->orderBy('transaction_date', 'desc')
            ->get();

        return ['transactions' => $transactions];
    }

    public function showTransactionByWallet(Wallet $wallet)
    {
        $walletId = $wallet->id;

        $transactions = Transaction::where('wallet_id', $walletId)
            ->orderBy('transaction_date', 'desc')
            ->get();

        return ['transactions' => $transactions];
    }

    public function showTransactionByCategory(Request $request)
    {

        $userId = auth()->user()->id;
        $selectedMonth = $request->month ?? now()->month;
        $currentYear = now()->year;

        $year = ($selectedMonth > now()->month) ? $currentYear - 1 : $currentYear;

        $startDate = Carbon::createFromDate($year, $selectedMonth, 1)->startOfMonth();
        $endDate = Carbon::createFromDate($year, $selectedMonth, 1)->endOfMonth();

        $categoryTransactionsQuery = Transaction::where('user_id', $userId)
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->whereHas('category', function ($query) {
                $query->where('category_is_income', false);
            });

        $wallet = null;
        if ($request->wallet_name && $request->wallet_name != "All Wallet") {
            $wallet = Wallet::where('user_id', $userId)->where('wallet_name', $request->wallet_name)->firstOrFail();
            $categoryTransactionsQuery->where('wallet_id', $wallet->id);
        }

        $categoryTransactions = $categoryTransactionsQuery
            ->selectRaw('category_id, SUM(transaction_amount) as total_amount')
            ->groupBy('category_id')
            ->with('category')
            ->orderBy('total_amount', 'desc')
            ->get();

        return ['category_transactions' => $categoryTransactions, 'currMonth' => $selectedMonth, 'currWallet' => $wallet];
    }

    public function showTransactionByMonth(Request $request)
    {
        $userId = auth()->user()->id;
        $selectedMonth = $request->month ?? now()->month;

        $transactions = Transaction::where('user_id', $userId)
            ->whereMonth('transaction_date', $selectedMonth)
            ->orderBy('transaction_date', 'desc')
            ->with(['wallet', 'category'])
            ->get();

        return ['transactions' => $transactions, 'currMonth' => $selectedMonth];
    }

    public function showTransactionOverview(Request $request)
    {

        $userId = auth()->user()->id;
        $currentDate = now();
        $startDate = $currentDate->copy()->subMonths(11)->startOfMonth();
        $endDate = $currentDate->endOfMonth();

        $walletCondition = function ($query) use ($request) {
            $userId = auth()->user()->id;
            if ($request->wallet_name && $request->wallet_name != "All Wallet") {
                $wallet = Wallet::where('user_id', $userId)->where('wallet_name', $request->wallet_name)->firstOrFail();
                $query->where('wallet_id', $wallet->id);
            }
        };

        $expenseDataPerMonth = Transaction::where('user_id', $userId)
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->whereHas('category', function ($query) {
                $query->where('category_is_income', false);
            })
            ->where($walletCondition)
            ->selectRaw('YEAR(transaction_date) as year, MONTH(transaction_date) as month, CAST(SUM(transaction_amount) AS SIGNED) as total_amount')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        $incomeDataPerMonth = Transaction::where('user_id', $userId)
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->whereHas('category', function ($query) {
                $query->where('category_is_income', true);
            })
            ->where($walletCondition)
            ->selectRaw('YEAR(transaction_date) as year, MONTH(transaction_date) as month, CAST(SUM(transaction_amount) AS SIGNED) as total_amount')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return [
            'monthly_expense_data' => $expenseDataPerMonth,
            'monthly_income_data' => $incomeDataPerMonth,
        ];
    }

    public function showSummaryReportData(Request $request)
    {
        $selectedMonth = $request->month ?? now()->month;
        $lastMonth = $selectedMonth == 1 ? 12 : $selectedMonth - 1;

        $userId = auth()->user()->id;

        $walletCondition = function ($query) use ($request) {
            if ($request->wallet_name && $request->wallet_name != "All Wallet") {
                $wallet = Wallet::where('wallet_name', $request->wallet_name)->firstOrFail();
                $query->where('wallet_id', $wallet->id);
            }
        };

        $selectedMonthTransactionData = Transaction::selectRaw('CAST(SUM(transaction_amount) AS SIGNED) as total_amount, categories.category_is_income')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.user_id', $userId)
            ->where($walletCondition)
            ->whereMonth('transactions.transaction_date', $selectedMonth)
            ->groupBy('categories.category_is_income')
            ->get()
            ->mapWithKeys(function ($item) {
                return [
                    $item->category_is_income ? 'income' : 'expense' => $item->total_amount
                ];
            });

        $lastMonthTransactionData = Transaction::selectRaw('CAST(SUM(transaction_amount) AS SIGNED) as total_amount, categories.category_is_income')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.user_id', $userId)
            ->where($walletCondition)
            ->whereMonth('transactions.transaction_date', $lastMonth)
            ->groupBy('categories.category_is_income')
            ->get()
            ->mapWithKeys(function ($item) {
                return [
                    $item->category_is_income ? 'income' : 'expense' => $item->total_amount
                ];
            });

        $selectedMonthTransactionData = collect($selectedMonthTransactionData);
        $selectedMonthTransactionData = $selectedMonthTransactionData->merge([
            'income' => $selectedMonthTransactionData->get('income', 0),
            'expense' => $selectedMonthTransactionData->get('expense', 0)
        ]);

        $lastMonthTransactionData = collect($lastMonthTransactionData);
        $lastMonthTransactionData = $lastMonthTransactionData->merge([
            'income' => $lastMonthTransactionData->get('income', 0),
            'expense' => $lastMonthTransactionData->get('expense', 0)
        ]);

        $selectedMonthNet = $selectedMonthTransactionData['income'] + $selectedMonthTransactionData['expense'];
        $lastMonthNet = $lastMonthTransactionData['income'] + $lastMonthTransactionData['expense'];

        return [
            'summary_report_data' => $selectedMonthTransactionData,
            'current_month_net_income' => $selectedMonthNet,
            'last_month_net_income' => $lastMonthNet,
            'current_month_total_income' => $selectedMonthTransactionData['income'],
            'current_month_total_expense' => $selectedMonthTransactionData['expense']

        ];
    }

    public function getAnalysisData(Request $request)
    {
        $userId = auth()->user()->id;

        $sixMonthsAgo = now()->subMonths(6)->startOfMonth();
        $endOfLastMonth = now()->subMonth()->endOfMonth();
        $startOfMonth = now()->startOfMonth();
        $today = now()->endOfDay();

        $walletCondition = function ($query) use ($request, $userId) {
            if ($request->wallet_name && $request->wallet_name != "All Wallet") {
                $wallet = Wallet::where('user_id', $userId)
                    ->where('wallet_name', $request->wallet_name)
                    ->firstOrFail();
                $query->where('wallet_id', $wallet->id);
            }
        };

        $categoryCondition = function ($query) use ($request) {
            if ($request->category_name && $request->category_name != "All Category") {
                $category = Category::where("category_name", $request->category_name)
                    ->firstOrFail();
                $query->where('category_id', $category->id);
            }
        };

        $baseQuery = Transaction::where('user_id', $userId)
            ->where($walletCondition)
            ->where($categoryCondition);

        $monthlyTotalTransaction = (clone $baseQuery)
            ->whereBetween('transaction_date', [$sixMonthsAgo, $today])
            ->selectRaw('YEAR(transaction_date) as year, MONTH(transaction_date) as month, CAST(SUM(transaction_amount) AS SIGNED) as total_amount')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        $averageTransactionLastSixMonth = (clone $baseQuery)
            ->whereBetween('transaction_date', [$sixMonthsAgo, $endOfLastMonth])
            ->selectRaw('CAST(sum(transaction_amount)/count(transactions.id) AS SIGNED) as average_total')
            ->first();

        $totalTransactionThisMonth = (clone $baseQuery)
            ->whereBetween('transaction_date', [$startOfMonth, $today])
            ->selectRaw('CAST(sum(transaction_amount) AS SIGNED) as total_transaction')
            ->first();

        $highestTransaction = (clone $baseQuery)
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('categories.category_is_income', false)
            ->whereBetween('transaction_date', [$sixMonthsAgo, $today])
            ->orderBy('transaction_amount', 'ASC')
            ->pluck('transaction_amount')
            ->first();

        $lowestTransaction = (clone $baseQuery)
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('categories.category_is_income', false)
            ->whereBetween('transaction_date', [$sixMonthsAgo, $today])
            ->orderBy('transaction_amount', 'DESC')
            ->pluck('transaction_amount')
            ->first();

        return [
            'monthly_total_transaction' => $monthlyTotalTransaction,
            'average_transaction_last_six_month' => $averageTransactionLastSixMonth,
            'total_transaction_this_month' => $totalTransactionThisMonth,
            'highest_transaction' => $highestTransaction,
            'lowest_transaction' => $lowestTransaction,
            'currCategory' => $request->category_name,
            'currWallet' => $request->wallet_name
        ];
    }
}
