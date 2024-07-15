<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReminderController extends Controller
{
    public function showReminder(){
        $user = auth()->user();
        $reminder = Reminder::where('user_id', $user->id)->get();

        return Inertia::render('Welcome', ['reminder' => $reminder]);
    }
}
