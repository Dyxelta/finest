<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function addBudget(Request $request) {

        $request->validate([
            'budget_name' => 'required,unique:budgets',
            'budget_amount' => 'required|numeric',
            'budget_description' => 'required|max:250',
            'category_name' => 'required|string'
        ]);

        $user = auth()->user();
        
        Budget::create([
            'user_id' => $user->id,
            //fix: add budget firstWhere
            'category_id' => Category::firstWhere('category_name', $request->category_name)->id,
            'budget_name' => $request->budget_name,
            'budget_amount' => $request->budget_amount,
            'budget_description' => $request->budget_description,
        ]);

        return redirect()->back();
    }

    public function deleteBudget(Request $request) {
        $budget = Budget::findOrFail('id', $request->budget_id);

        $budget->delete();
        return redirect()->back();
    }

    public function editBudget(Request $request) {
        $request->validate([
            'budget_name' => 'required,unique:budgets',
            'budget_amount' => 'required|numeric',
            'budget_description' => 'required|max:250',
            'category_name' => 'required|string'
        ]);

        $budgetId = $request->id;
        $budget_name = $request->input('budget_name');
        $budget_amount = $request->input('budget_amount');
        $budget_description = $request->input('budget_description');
        $category_name = $request->input('category_name');

        $budget = Budget::findOrFail('budget_id', $budgetId);

        $budget->budget_name = $budget_name;
        $budget->category_id = Category::where('category_name', $category_name)->id;
        $budget->budget_amount = $budget_amount;
        $budget->budget_description = $budget_description;
        $budget->updated_at = now();

        $budget->save();

        return redirect()->back();
    }

    public function showBudgetById($id) {
        $user = auth()->user();
        $budget = Budget::firstWhere('user_id', 1)->where('id', $id)->get();

        return Inertia::render('Welcome', ['budget' => $budget]);
    }

    public function showAllUserBudget() {
        $user = auth()->user();
        $budgets = Budget::where('user_id', $user->id)->get();

        return Inertia::render('Welcome', ['budgets' => $budgets]);
    }

    public function showReccommendedDailyExpense() {
        
    }
}
