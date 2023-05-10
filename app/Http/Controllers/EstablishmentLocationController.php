<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;

class EstablishmentLocationController extends Controller
{
    public function store(Request $request, Establishment $establishment)
    {
        $validated = $request->validate([
            'longitude' => 'required',
            'latitude' => 'required',
        ]);

        $establishment->location()->update($validated);

        return redirect()->route('dashboard');
    }
}
