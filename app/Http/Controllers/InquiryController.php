<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Inquiries/Index', [
            'inquiries' => $request->user()
                ->inquiries->load('establishment.image'),
        ]);
    }

    public function create(Request $request, Establishment $establishment)
    {
        return Inertia::render('Inquiries/Index', [
            'establishment' => $establishment,
            'inquiries' => $request->user()
                ->inquiries->load('establishment.image'),
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
