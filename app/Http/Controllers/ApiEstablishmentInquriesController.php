<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ApiEstablishmentInquriesController extends Controller
{
    public function index(Request $request, Establishment $establishment)
    {
        $request->validate([
            't' => ['nullable', Rule::exists(User::class, 'id')],
        ]);

        $inquiries = null;

        $t = User::find($request->t);

        if ($establishment->user_id == $request->user()->id) {
            $inquiries = Inquiry::where('establishment_id', $request->establishment)
                ->orWhere('receiver_id', $request->user()->id)
                ->orWhere('sender_id', $request->user()->id)
                ->orWhere('receiver_id', $request->t)
                ->orWhere('sender_id', $request->t)
                ->get()
                ->load('receiver.image', 'sender.image');
        } else {
            $inquiries = Inquiry::where('establishment_id', $request->establishment)
                ->orWhere('sender_id', $request->user()->id)
                ->orWhere('receiver_id', $request->user()->id)
                ->orWhere('sender_id', $request->t)
                ->orWhere('receiver_id', $request->t)
                ->get()
                ->load('receiver.image', 'sender.image');
        }

        return response()->json($inquiries);
    }
}
