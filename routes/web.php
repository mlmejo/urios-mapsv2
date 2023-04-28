<?php

use App\Http\Controllers\EstablishmentBookingController;
use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\EstablishmentLocationController;
use App\Http\Controllers\EstablishmentReviewController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToggleEstablishmentStatusController;
use App\Models\Establishment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function (Request $request) {
    if (!$request->user()->roles->contains('name', 'admin')) {
        return redirect()->route('map');
    }

    return Inertia::render('Dashboard', [
        'establishments' => Establishment::with('user:id,name', 'location')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/map', MapController::class)
    ->middleware('auth')
    ->name('map');

Route::post('/establishments/{establishment}/status', ToggleEstablishmentStatusController::class)
    ->middleware('auth')
    ->name('establishments.toggle-status');

Route::resource('establishments', EstablishmentController::class)
    ->middleware('auth');

Route::resource('establishments.locations', EstablishmentLocationController::class)
    ->middleware('auth');

Route::resource('establishments.reviews', EstablishmentReviewController::class)
    ->middleware('auth');

Route::get('/establishments/{establishment}/inquiries', [InquiryController::class, 'create'])
    ->name('establishments.inquiries.create')
    ->middleware('auth');

Route::post('/establishments/{establishment}/inquiries', [InquiryController::class, 'store'])
    ->name('establishments.inquiries.store')
    ->middleware('auth');

Route::resource('inquiries', InquiryController::class)
    ->except(['create', 'store'])
    ->middleware('auth');

Route::resource('establishments.bookings', EstablishmentBookingController::class)
    ->middleware('auth');

require __DIR__ . '/auth.php';
