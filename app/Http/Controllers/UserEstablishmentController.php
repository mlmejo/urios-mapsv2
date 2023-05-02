<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserEstablishmentController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('UserEstablishments', [
            'establishments' => $request->user()->establishments->load('image'),
        ]);
    }
}
