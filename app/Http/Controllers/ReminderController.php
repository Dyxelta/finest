<?php

namespace App\Http\Controllers;

use App\Models\Reminder;

class ReminderController extends Controller
{
    public function showReminder(){
        $user = auth()->user();
        $reminder = Reminder::where('user_id', $user->id)->get();

        return ['reminder' => $reminder];
    }
}
