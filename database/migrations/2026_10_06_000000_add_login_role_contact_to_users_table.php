<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('contact', 50)->nullable()->after('name');
            $table->string('role', 30)->default('employe')->index()->after('contact');
            $table->string('login', 60)->unique()->after('role');
            $table->string('email')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['login']);
            $table->dropIndex(['role']);
            $table->dropColumn(['contact', 'role', 'login']);
            $table->string('email')->nullable(false)->change();
        });
    }
};
