<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    use HasFactory;

    protected $fillable = ['price'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function establishments()
    {
        return $this->belongsToMany(Establishment::class);
    }
}
