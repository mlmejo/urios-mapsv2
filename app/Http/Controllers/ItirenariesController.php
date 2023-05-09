<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItirenariesController extends Controller
{
    public function create()
    {
        return Inertia::render('Itineraries/Create', [
            'establishments' => Establishment::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'establishments' => 'required|array',
        ]);

        $establishments = Establishment::findMany($request->establishments);

        $itinerary = $request->user()->itineraries()->create();

        $itinerary->establishments()->sync($establishments);

        return redirect()->route('profile.edit');
    }
}
