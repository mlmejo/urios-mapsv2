<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Establishments/Index', [
            'establishments' => Establishment::with(
                'image:imageable_id,path',
                'user:id,name',
            )
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Establishments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:' . Establishment::class,
            'description' => 'required|string',
            'address' => 'required|string',
            'image' => 'required|image'
        ]);

        $establishment = $request->user()->establishments()
            ->create($request->except('image'));

        $establishment->location()->create();

        $path = $request->file('image')->store('images');

        $establishment->image()->create(compact('path'));

        return redirect()->route('establishments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Establishment $establishment)
    {
        return Inertia::render('Establishments/Show', [
            'establishment' => Establishment::with(
                'image:imageable_id,path',
                'user:id,name',
                'reviews.user',
            )
                ->find($establishment->id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Establishment $establishment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Establishment $establishment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Establishment $establishment)
    {
        //
    }
}
