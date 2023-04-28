<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index()
    {
        return Inertia::render('Inquiries/Index');
    }

    public function create(Request $request, Establishment $establishment)
    {
        return Inertia::render('Inquiries/Index', [
            'establishment' => $establishment,
            'inquiries' => $establishment->inquiries
                ->load('user.image', 'establishment.image')
                ->where('user_id', $request->user()->id)->all(),
        ]);
    }

    public function store(Request $request, Establishment $establishment)
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $inquiry = new Inquiry($validated);

        $inquiry->establishment()->associate($establishment);
        $inquiry->user()->associate($request->user()->id);

        $inquiry->save();

        return redirect()->route('establishments.inquiries.create', $establishment);
    }
}
