<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Establishment;
use Illuminate\Http\Request;

class EstablishmentBookingController extends Controller
{
    public function store(Request $request, Establishment $establishment)
    {
        $validated = $request->validate([
            'date' => 'required|date',
        ]);

        $booking = new Booking($validated);

        $booking->establishment()->associate($establishment);
        $booking->user()->associate($request->user());

        $booking->save();

        return redirect()->route('establishments.show', $establishment);
    }
}
