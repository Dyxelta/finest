<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function addWallet(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'wallet_name' => 'required|string|max:30|unique:wallets,wallet_name,NULL,id,user_id,' . $user->id,
            'wallet_balance' => 'required|numeric|min:1|max:1000000000000',
            'wallet_description' => 'nullable|string|max:255'
        ]);

        $user = auth()->user();

        Wallet::create([
            'user_id' => $user->id,
            'wallet_name' => $request->wallet_name,
            'wallet_balance' => $request->wallet_balance,
            'wallet_description' => $request->wallet_description ?? '',
        ]);
    }

    public function deleteWallet(Wallet $wallet)
    {
        $wallet->delete();

        return redirect()->back();
    }

    public function editWallet(Request $request)
    {
        $user = auth()->user();
        $walletId = $request->id;

        $request->validate([
            'wallet_name' => "required|string|max:30|unique:wallets,wallet_name,{$walletId},id,user_id,{$user->id}",
            'wallet_balance' => 'required|numeric|min:1|max:1000000000000',
            'wallet_description' => 'nullable|string|max:255',
        ]);

        $walletName = $request->wallet_name;
        $walletBalance = $request->wallet_balance;
        $walletDescription = $request->wallet_description ?? '';

        $wallet = Wallet::findOrFail($walletId);

        $wallet->wallet_name = $walletName;
        $wallet->wallet_balance = $walletBalance;
        $wallet->wallet_description = $walletDescription;

        $wallet->save();

        return redirect()->back();
    }

    public function showAllWalletByUserID()
    {
        $user = auth()->user();

        $wallets = Wallet::where('user_id', $user->id)->with(['transactions.category'])->get();

        return ['wallets' => $wallets];
    }

    public function showWalletById(Request $request)
    {
        $walletId = $request->id;

        $wallet = Wallet::where('id', $walletId)->get()->first();

        return ['wallet' => $wallet];
    }

    public function showUserWalletTotalBalance()
    {
        $userId = auth()->user()->id;

        $totalBalance = Wallet::where('user_id', $userId)->sum('wallet_balance');

        return ['total_balance' => $totalBalance];
    }
}
