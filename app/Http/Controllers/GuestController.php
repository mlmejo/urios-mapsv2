<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function index()
    {
        return Inertia::render('Guest', [
            'establishments' => Establishment::with('location', 'image')
                ->where('active', true)->get(),
        ]);
    }
}
