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
            'establishments' => Establishment::with('image', 'location')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'establishments' => 'required|array',
            'price' => 'required',
        ]);

        $establishments = Establishment::findMany($request->establishments);

        $itinerary = $request->user()->itineraries()->create([
            'price' => $request->price,
        ]);

        $itinerary->establishments()->sync($establishments);

        return redirect()->route('profile.edit');
    }
}
