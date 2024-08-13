<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function register(Request $request)
    {

        $request->validate([
            'username' => 'required|alpha_num|min:5|max:25',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[!@#$%^&*(),.?":{}|<>]/',
            ],
            'confirm_pass' => 'required_with:password|same:password',
        ]);

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return redirect('login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard'));
        }

        return redirect()->back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function editUserData(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'username' => 'required|alpha_num|min:5|max:25',
            'email' => 'required|email|unique:users,email',
        ]);

        $new_username = $request->username;
        $new_email = $request->email;

        $user = User::findOrFail($user->id);

        $user->username = $new_username;
        $user->email = $new_email;
        $user->updated_at = now();

        $user->save();
    }

    public function editPassword(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'current_password' => ['required', function ($value, $fail) use ($user) {
                if (!Hash::check($value, $user->password)) {
                    $fail('The current password is incorrect.');
                }
            }],
            'new_password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[!@#$%^&*(),.?":{}|<>]/',
            ],
            'confirm_password' => 'required_with:password|same:password',
        ]);

        $new_password = $request->password;

        $user_data = User::findOrFail($user->id);

        $user->password = $new_password;
        $user->updated_at = now();

        $user_data->save();

        return response()->json(['message' => 'Password updated successfully.']);
    }

    public function redirectWhenAppOpened()
    {
        if (Auth::check()) {
            return redirect('dashboard');
        }

        return redirect('login');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->flush();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('login');
    }
}
