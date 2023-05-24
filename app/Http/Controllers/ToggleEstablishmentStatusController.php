<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;

class ToggleEstablishmentStatusController extends Controller
{
    public function __invoke(Establishment $establishment)
    {
        $establishment->update([
            'active' => !$establishment->active,
        ]);

        return response()->json(Establishment::with('user:id,name,email', 'location')->get());
    }
}
