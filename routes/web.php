<?php

use App\Http\Controllers\ApiEstablishmentInquriesController;
use App\Http\Controllers\EstablishmentBookingController;
use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\EstablishmentLocationController;
use App\Http\Controllers\EstablishmentReviewController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\ItirenariesController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToggleEstablishmentStatusController;
use App\Http\Controllers\UserEstablishmentController;
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

Route::resource('inquiries', InquiryController::class)
    ->middleware('auth');

Route::resource('establishments.bookings', EstablishmentBookingController::class)
    ->middleware('auth');

Route::get('/my-establishments', [UserEstablishmentController::class, 'index'])
    ->middleware('auth')
    ->name('my-establishments');

Route::post('/my-establishments', [UserEstablishmentController::class, 'store'])
    ->middleware('auth');

Route::get(
    '/api/establishments/{establishment}/inquiries',
    [ApiEstablishmentInquriesController::class, 'index']
)
    ->middleware('auth')
    ->name('api.establishments.inquiries');


Route::get('/itineraries/create', [ItirenariesController::class, 'create'])
    ->middleware('auth')
    ->name('itineraries.create');

Route::post('/itineraries', [ItirenariesController::class, 'store'])
    ->middleware('auth')
    ->name('itineraries.store');

Route::get('/guest', [GuestController::class, 'index'])
    ->name('guest.index');

require __DIR__ . '/auth.php';
