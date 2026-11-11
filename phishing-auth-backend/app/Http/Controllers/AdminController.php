<?php

namespace App\Http\Controllers;

use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Administrator dashboard.',
            'statistics' => [
                'total_users' => User::where('role', 'user')->count(),
                'total_admins' => User::where('role', 'admin')->count(),
            ],
        ]);
    }
}