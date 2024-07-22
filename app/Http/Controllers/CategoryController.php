<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function showAllCategories() {
        $expenseCategories = Category::where('category_is_income', false)->get();
        $incomeCategories = Category::where('category_is_income', true)->get();

        return [
            'expenseCategories' => $expenseCategories,
            'incomeCategories' => $incomeCategories
        ];
    }
}
