<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class DeleteUnverifiedUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-unverified-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete users who have not verified their email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $oneHourAgo = now()->subHour();

        $deletedUsers = User::where('email_verified_at', null)
            ->where('created_at', '<', $oneHourAgo)
            ->delete();

        $this->info("Deleted {$deletedUsers} unverified users.");
    }
}
