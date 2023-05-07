<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class ApiEstablishmentInquriesController extends Controller
{
    public function index(Request $request, Establishment $establishment)
    {
        $inquiries = null;

        if ($establishment->user_id == $request->user()->id) {
            $inquiries = Inquiry::where('sender_id', $request->user()->id)
                ->where('receiver_id', $request->user)
                ->get();
        } else {
            $inquiries = Inquiry::where('sender', $request->user()->id)
                ->where('establishment_id', $establishment)
                ->get();
        }

        return response()->json($inquiries);
    }
}
