<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Inquiries/Index', [
            'conversations' => Inquiry::where('receiver_id', $request->user()->id)
                ->orWhere('sender_id', $request->user()->id)
                ->get()
                ->load('establishment.user', 'establishment.image', 'sender.image'),
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'establishment' => ['required', Rule::exists(Establishment::class, 'id')],
            't' => ['nullable', Rule::exists(User::class, 'id')],
        ]);

        $establishment = Establishment::find($request->establishment);

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

        return Inertia::render('Inquiries/Index', [
            'establishment' => $establishment->load('user'),
            'inq' => $inquiries,
            'conversations' => Inquiry::where('receiver_id', $request->user()->id)
                ->orWhere('sender_id', $request->user()->id)
                ->get()
                ->load('establishment.user', 'establishment.image', 'sender.image'),
            't' => $t,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'establishment' => ['required', Rule::exists(User::class, 'id')],
            't' => [Rule::exists(User::class, 'id')],
        ]);

        $establishment = Establishment::find($request->establishment);

        Inquiry::create([
            'message' => $request->message,
            'receiver_id' => $request->t,
            'sender_id' => $request->user()->id,
            'establishment_id' => $request->establishment,
        ]);
    }
}
