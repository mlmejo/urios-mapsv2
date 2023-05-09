<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Establishment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'address',
        'active', 'opening_time', 'closing_time',
        'category', 'opening_days',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function location()
    {
        return $this->hasOne(Location::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function itineraries()
    {
        return $this->belongsToMany(Itinerary::class);
    }
}
