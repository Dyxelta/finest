<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Models\Transaction;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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

Route::get('/', [UserController::class, 'redirectWhenAppOpened']);

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::post('/create-account', [UserController::class, 'register'])->name('createAccount');

    Route::post('/login-user', [UserController::class, 'login'])->name('loginUser');
});

Route::middleware('auth')->group(function () {

    //Authentication
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');


    //dashboard
    Route::get('/dashboard', function () {
        $transactionData = app(TransactionController::class)->showAllUserTransaction();

        $walletData = app(WalletController::class)->showAllWalletByUserID();

        $budgetData = app(BudgetController::class)->showAllUserBudget();

        return Inertia::render('Dashboard', array_merge($transactionData, $walletData, $budgetData));
    })->name('dashboard');


    //wallet
    Route::get('/wallets', function () {
        $walletData = app(WalletController::class)->showAllWalletByUserID();

        return Inertia::render('Wallet/WalletPage', $walletData);
    })->name('walletPage');

    Route::post('/create-wallet', [WalletController::class, 'addWallet'])->name('createWallet');

    Route::put('/edit-wallet', [WalletController::class, 'editWallet'])->name('editWallet');

    Route::delete('/delete-wallet/{wallet:id}', [WalletController::class, 'deleteWallet'])->name('deleteWallet');

    //transaction
    Route::get('/transaction', function(Request $request) {
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $transactionData = app(TransactionController::class)->showTransactionByMonth($request);

        return Inertia::render('Transaction/TransactionRecords', array_merge($transactionData, $walletData));
    })->name('transactionPage');

    Route::get('/transaction/add-transaction', function () {
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $categories = app(CategoryController::class)->showAllCategories();

        return Inertia::render('Transaction/AddTransactionPage', array_merge($walletData, $categories));
    })->name('addTransasction');

    Route::get('/transaction/edit-transaction/{transaction:id}', function (Transaction $transaction) {
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $categories = app(CategoryController::class)->showAllCategories();
        $transactionData = ['transaction' => $transaction];

        return Inertia::render('Transaction/EditTransactionPage', array_merge($walletData, $categories, $transactionData));
    })->name('editTransactionPage');

    Route::post('/create-transaction', [TransactionController::class, 'addTransaction'])->name('createTransaction');

    Route::put('/edit-transaction', [TransactionController::class, 'editTransaction'])->name('editTransaction');

    Route::delete('/delete-transaction/{transaction:id}', [TransactionController::class, 'deleteTransaction'])->name('deleteTransaction');


    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
