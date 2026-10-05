<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dishes', function (Blueprint $table) {
            $table->json('meals')->nullable()->after('popular');
        });

        // Plats existants : servis au déjeuner et au dîner.
        DB::table('dishes')->whereNull('meals')->update(['meals' => json_encode(['lunch', 'dinner'])]);
    }

    public function down(): void
    {
        Schema::table('dishes', function (Blueprint $table) {
            $table->dropColumn('meals');
        });
    }
};
