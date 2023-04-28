<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminExistence
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $request->merge(['isAdmin' => false]);

        if (!User::whereHas('roles', function (Builder $query) {
            $query->where('name', 'admin');
        })->exists()) {
            $request->merge(['isAdmin' => true]);
        }

        return $next($request);
    }
}
