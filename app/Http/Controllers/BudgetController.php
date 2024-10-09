<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use App\Models\Wallet;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function addBudget(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'budget_name' => 'required|unique:budgets,budget_name,NULL,id,user_id,' . $user->id,
            'budget_amount' => 'required|numeric|min:1|max:900000000000000000',
            'budget_description' => 'required|max:150',
            'category_name' => 'required|string',
            'wallet_name' => 'required|string'
        ]);

        $category = Category::where('category_name', $request->category_name)->firstOrFail();
        $wallet = Wallet::where('user_id', $user->id)->where('wallet_name', $request->wallet_name)->firstOrFail();

        Budget::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'wallet_id' => $wallet->id,
            'budget_name' => $request->budget_name,
            'budget_amount' => $request->budget_amount,
            'budget_description' => $request->budget_description
        ]);

        return redirect()->back();
    }

    public function deleteBudget(Request $request)
    {
        $budget = Budget::findOrFail($request->id);

        $budget->delete();
        return redirect()->back();
    }

    public function editBudget(Request $request)
    {
        $user = auth()->user();
        $budget = Budget::findOrFail($request->id);
        $budget_name_exist = $budget->budget_name;

        if ($request->budget_name !== $budget_name_exist) {
            $request->validate([
                'budget_name' => 'required|unique:budgets,budget_name,NULL,id,user_id,' . $user->id
            ]);
        }

        $request->validate([
            'budget_name' => 'required',
            'budget_amount' => 'required|numeric|min:1|max:900000000000000000',
            'budget_description' => 'required|max:250',
            'category_name' => 'required|string',
            'wallet_name' => 'required|string'
        ]);

        $budget_name = $request->budget_name;
        $budget_amount = $request->budget_amount;
        $budget_description = $request->budget_description;
        $category_name = $request->category_name;
        $wallet_name = $request->wallet_name;

        $budget->budget_name = $budget_name;
        $budget->category_id = Category::firstWhere('category_name', $category_name)->id;
        $budget->wallet_id = Wallet::firstWhere('wallet_name', $wallet_name)->id;
        $budget->budget_amount = $budget_amount;
        $budget->budget_description = $budget_description;

        $budget->save();

        return redirect()->back();
    }

    public function showBudgetById($id)
    {
        $user = auth()->user();
        $budget = Budget::firstWhere('user_id', $user->id)->where('id', $id)->get();

        return ['budget' => $budget];
    }

    public function showAllUserBudget(Request $request)
    {
        $user = auth()->user();

        $wallet_id = $request->wallet_id;

        if ($wallet_id == null) {
            $wallet = Wallet::firstWhere('user_id', $user->id);
            if ($wallet) {
                $wallet_id =  $wallet->id;
            }
        }

        $budgets = Budget::where('user_id', $user->id)
            ->where('wallet_id', $wallet_id)
            ->with(['category' => function ($query) use ($user) {
                $query->with(['transactions' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                }]);
            }])
            ->get();

        return [
            'budgets' => $budgets,
            'id_wallet' => $wallet_id
        ];
    }

    public function showReccommendedDailyExpense()
    {
        $user = auth()->user();
        $budget = Budget::firstWhere('user_id', $user->id)->get()->first()->budget_amount;
        $year = date('Y');
        $month = date('m');
        $day = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $rec_budget = $budget / $day;
        $rec_budget = (int)floor($rec_budget / 1000) * 1000;
        return ['budget' => number_format($rec_budget)];
    }

    public function showUserTopBudget()
    {
        $userId = auth()->user()->id;

        $budgets = Budget::where('user_id', $userId)->get();

        $budgetPercentages = $budgets->map(function ($budget) {
            $thisMonth = now()->month;

            $totalTransactionAmount = (int) $budget->Category->Transactions()
                ->where('wallet_id', $budget->wallet_id)
                ->whereMonth('transaction_date', $thisMonth)
                ->sum('transaction_amount');

            $percentage = $budget->budget_amount > 0 ? (abs($totalTransactionAmount) / $budget->budget_amount) * 100 : 0;

            $wallet = Wallet::where('id', $budget->wallet_id)->firstOrFail();
            $category = Category::where('id', $budget->category_id)->firstOrFail();

            return [
                'budget_name' => $budget->budget_name,
                'budget_amount' => $budget->budget_amount,
                'total_transaction_amount' => $totalTransactionAmount,
                'percentage' => $percentage,
                'wallet_name' => $wallet->wallet_name,
                'category' => $category,
            ];
        });

        $topBudgets = $budgetPercentages->sortByDesc('percentage')->take(5);

        return ['top_budgets' => $topBudgets];
    }
}
