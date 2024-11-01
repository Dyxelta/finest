<?php

namespace App\Providers;

use App\Models\Transaction;
use App\Observers\TransactionObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Routing\UrlGenerator;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url)
    {
        if(env('APP_ENV') !== 'local')
        {
            $url->forceSchema('https');
        }
        Transaction::observe(TransactionObserver::class);
    }
}
