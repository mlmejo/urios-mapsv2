<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Locations', [
            'establishments' => Establishment::with('location', 'image')
                ->where('active', true)->get(),
        ]);
    }
}
