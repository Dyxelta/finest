<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Models\Transaction;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $transactionData = app(TransactionController::class)->showAllUserTransaction();

    $walletData = app(WalletController::class)->showAllWalletByUserID();

    $budgetData = app(BudgetController::class)->showAllUserBudget();

    return Inertia::render('Dashboard', array_merge($transactionData, $walletData, $budgetData));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('guest')->group(function() {
    Route::get('/login', function () {
        return Inertia::render('Login');
    })->name('login');

    Route::get('/register', function() {
        return Inertia::render('Register');
    })->name('register');
});

Route::post('/register-account', [UserController::class, 'register'])->name('register-account');

Route::post('/login-user', [UserController::class, 'login'])->name('login-user');

// punya wete
Route::get('/addTransaction', function () {
    return Inertia::render('AddTransactionPage');
})->middleware(['auth', 'verified'])->name('AddTransactionPage');

require __DIR__.'/auth.php';
