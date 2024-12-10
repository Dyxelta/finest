<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;

use App\Http\Controllers\RecurringTransactionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Foundation\Auth\EmailVerificationRequest;

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

Route::get('/email/verify', function () {
    return inertia('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::post('/forgot-password', function() {

});

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::get('/forgetPassword', function () {
        return Inertia::render('Auth/ForgetPass');
    })->name('forget');

    Route::get('/reset-password/{token}', function (string $token) {
        //return Inertia::render('Auth/ForgetPass');
    })->middleware('guest')->name('password.reset');

    Route::post('/create-account', [UserController::class, 'register'])->name('createAccount');

    Route::post('/login-user', [UserController::class, 'login'])->name('loginUser');

    Route::post('/forget-password', [UserController::class, 'forgetUserPassword'])->name('forgetpass');
});
Route::middleware(['auth'])->group(function () {
    //Authentication
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'verified'])->group(function () {

    //Authentication
    Route::put('/edit-profile', [UserController::class, 'editUserData'])->name('editProfile');
    Route::put('/edit-password', [UserController::class, 'editPassword'])->name('editPassword');

    //dashboard
    Route::get('/dashboard', function (Request $request) {
        $transactionData = app(TransactionController::class)->showAllUserTransaction($request);

        $summaryReportData = app(TransactionController::class)->showSummaryReportData($request);

        $walletData = app(WalletController::class)->showAllWalletByUserID();

        $totalWalletBalance = app(WalletController::class)->showUserWalletTotalBalance();

        $budgetData = app(BudgetController::class)->showAllUserBudget($request);

        $topBudgets = app(BudgetController::class)->showUserTopBudget();

        return Inertia::render('Dashboard', array_merge($transactionData, $summaryReportData, $walletData, $totalWalletBalance, $budgetData, $topBudgets));
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
    Route::get('/transactionRecords', function (Request $request) {
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $transactionData = app(TransactionController::class)->showTransactionByMonth($request);

        return Inertia::render('Transaction/TransactionRecords', array_merge($transactionData, $walletData));
    })->name('transactionPage');

    Route::get('/transaction/addTransaction', function () {
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $categories = app(CategoryController::class)->showAllCategories();

        return Inertia::render('Transaction/AddTransactionPage', array_merge($walletData, $categories));
    })->name('addTransaction');

    Route::get('/transaction/editTransaction/{transaction:id}', function (Transaction $transaction) {
        $transaction->load(['wallet', 'category']);

        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $categories = app(CategoryController::class)->showAllCategories();

        $transactionData = [
            'transaction' => $transaction,
            'wallet' => $transaction->wallet,
            'category' => $transaction->category,
        ];

        return Inertia::render('Transaction/EditTransactionPage', array_merge($walletData, $categories, $transactionData));
    })->name('editTransactionPage');

    Route::post('/create-transaction', [TransactionController::class, 'addTransaction'])->name('createTransaction');

    Route::put('/edit-transaction', [TransactionController::class, 'editTransaction'])->name('editTransaction');

    Route::delete('/delete-transaction/{transaction:id}', [TransactionController::class, 'deleteTransaction'])->name('deleteTransaction');

    //Recurring Transaction
    Route::get('/recurringTransaction', function (Request $request) {
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $recurringTransactionData = app(RecurringTransactionController::class)->showRecurringTransactionByWallet($request);
        $categoryData = app(CategoryController::class)->showAllCategories();

        return Inertia::render('RecurringTransaction/TransactionRecords', array_merge($recurringTransactionData, $walletData, $categoryData));
    })->name('recurringTransactionPage');

    Route::post('/create-recurring-transaction', [RecurringTransactionController::class, 'addRecurringTransaction'])->name('createRecurringTransaction');

    Route::put('/edit-recurring-transaction', [RecurringTransactionController::class, 'editRecurringTransaction'])->name('editRecurringTransaction');

    Route::delete('/delete-recurring-transaction/{recurringTransaction:id}', [RecurringTransactionController::class, 'deleteRecurringTransaction'])->name('deleteRecurringTransaction');

    //Budget
    Route::get('/budget', function (Request $request) {

        $budgetData = app(BudgetController::class)->showAllUserBudget($request);
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $categoryData = app(CategoryController::class)->showAllCategories();

        return Inertia::render('Budget/Budget', array_merge($budgetData, $walletData, $categoryData));
    })->name('budgetPage');

    Route::post('/create-budget', [BudgetController::class, 'addBudget'])->name('addBudget');

    Route::put('/edit-budget', [BudgetController::class, 'editBudget'])->name('editBudget');

    Route::delete('/delete-budget/{budget:id}', [BudgetController::class, 'deleteBudget'])->name('deleteBudget');

    //Transaction Report
    Route::get('/transactionReport', function (Request $request) {
        $transactionController = app(TransactionController::class);
        $transactionOverview = $transactionController->showTransactionOverview($request);
        $summaryReportData = $transactionController->showSummaryReportData($request);

        $transactionCategory = $transactionController->showTransactionByCategory($request);
        $walletData = app(WalletController::class)->showAllWalletByUserID();

        return Inertia::render('TransactionReport/TransactionReport', array_merge($transactionOverview, $summaryReportData, $transactionCategory, $walletData));
    })->name('transactionReportPage');

    //Transaction Analysis
    Route::get('/transactionAnalysis', function (Request $request) {
        $walletData = app(WalletController::class)->showAllWalletByUserID();
        $categoryData = app(CategoryController::class)->showAllCategories();

        $averageData = app(TransactionController::class)->getAnalysisData($request);

        return Inertia::render('TransactionAnalysis/TransactionAnalysis', array_merge($walletData, $categoryData, $averageData));
    })->name('transactionAnalysisPage');
});

require __DIR__ . '/auth.php';
