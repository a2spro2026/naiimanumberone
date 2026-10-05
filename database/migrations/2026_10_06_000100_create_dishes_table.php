<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('name_ar', 120);
            $table->string('description', 500);
            $table->string('description_ar', 500);
            $table->string('image');
            $table->decimal('price_small', 8, 2);
            $table->decimal('price_medium', 8, 2);
            $table->decimal('price_large', 8, 2);
            $table->decimal('rating', 2, 1)->default(5);
            $table->string('prep_time', 20)->nullable();
            $table->boolean('popular')->default(false);
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dishes');
    }
};
