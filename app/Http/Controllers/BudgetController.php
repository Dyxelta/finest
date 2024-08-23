<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function addBudget(Request $request) {
        $request->validate([
            'budget_name' => 'required|unique:budgets',
            'budget_amount' => 'required|numeric',
            'budget_description' => 'required|max:250',
            'category_name' => 'required|string'
        ]);

        $user = auth()->user();
        $category = Category::where('category_name', $request->category_name)->firstOrFail();

        Budget::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'budget_name' => $request->budget_name,
            'budget_amount' => $request->budget_amount,
            'budget_description' => $request->budget_description
        ]);

        return redirect()->back();
    }

    public function deleteBudget(Request $request) {
        $budget = Budget::findOrFail($request->id);

        $budget->delete();
        return redirect()->back();
    }

    public function editBudget(Request $request) {
        $request->validate([
            'budget_name' => 'required',
            'budget_amount' => 'required|numeric',
            'budget_description' => 'required|max:250',
            'category_name' => 'required|string'
        ]);

        $budgetId = $request->id;
        $budget_name = $request->budget_name;
        $budget_amount = $request->budget_amount;
        $budget_description = $request->budget_description;
        $category_name = $request->category_name;

        $budget = Budget::findOrFail($budgetId);

        $budget->budget_name = $budget_name;
        $budget->category_id = Category::firstWhere('category_name', $category_name)->id;
        $budget->budget_amount = $budget_amount;
        $budget->budget_description = $budget_description;

        $budget->save();

        return redirect()->back();
    }

    public function showBudgetById($id) {
        $user = auth()->user();
        $budget = Budget::firstWhere('user_id', 1)->where('id', $id)->get();

        return ['budget' => $budget];
    }

    public function showAllUserBudget() {
        $user = auth()->user();
        $budgets = Budget::where('user_id', $user->id)->get();

        return ['budgets' => $budgets];
    }

    public function showReccommendedDailyExpense() {
        $user = auth()->user();
        $budget = Budget::firstWhere('user_id', $user->id)->get()->first()->budget_amount;
        $year = date('Y');
        $month = date('m');
        $day = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $rec_budget = $budget/$day;
        $rec_budget = (int)floor($rec_budget/1000)*1000;
        return ['budget' => number_format($rec_budget)];
    }
}
