<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('establishments', function (Blueprint $table) {
            $table->string('opening_days');
            $table->time('opening_time');
            $table->time('closing_time');
            $table->enum('category', ['Restaurant', 'Hotel', 'Tourist Spot']);
            $table->enum('pricing', ['low', 'medium', 'high']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('establishments', function (Blueprint $table) {
            $table->dropColumn('opening_days');
            $table->dropColumn('opening_time');
            $table->dropColumn('closing_time');
            $table->dropColumn('category');
        });
    }
};
