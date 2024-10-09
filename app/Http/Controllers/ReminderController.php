<?php

namespace App\Http\Controllers;

use App\Models\Reminder;

class ReminderController extends Controller
{
    public function showReminder()
    {
        $user = auth()->user();
        $reminder = Reminder::where('user_id', $user->id)
            ->whereMonth('created_at', now()->month)
            ->get();

        return ['reminder' => $reminder];
    }
}
