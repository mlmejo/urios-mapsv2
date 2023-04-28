<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EstablishmentReviewController extends Controller
{
    public function store(Request $request, Establishment $establishment)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'rating' => ['required', Rule::in(range(1, 5))],
        ]);

        $review = new Review($validated);

        $review->user()->associate($request->user());
        $review->establishment()->associate($establishment);

        $review->save();

        return redirect()->route('establishments.show', $establishment);
    }
}
