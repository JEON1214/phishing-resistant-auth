<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display the participant dashboard.
     */
    public function index(Request $request)
    {
        return response()->json([
            'message' => 'Participant dashboard.',
            'user' => new UserResource($request->user()),
        ]);
    }
}
