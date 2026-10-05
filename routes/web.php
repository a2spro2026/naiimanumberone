<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DishController;
use Illuminate\Support\Facades\Route;

$serveSpa = function () {
    $spa = public_path('spa/index.html');

    if (! file_exists($spa)) {
        abort(503, 'Site en cours de déploiement. Lancez: cd frontend && npm run build');
    }

    return response()->file($spa);
};

// Landing React + toutes les routes admin (SPA)
Route::get('/', $serveSpa);
Route::get('/admin/{any?}', $serveSpa)->where('any', '.*')->middleware('no-store');

Route::get('api/dishes', [DishController::class, 'index'])->middleware('no-store');

// API de l'espace admin (session + CSRF via le cookie XSRF-TOKEN)
Route::prefix('api/admin')->middleware('no-store')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::get('me', [AuthController::class, 'me']);

    Route::middleware('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);

        Route::post('dishes', [DishController::class, 'store']);
        // POST (pas PUT) : PHP ne lit pas les fichiers envoyés en multipart avec PUT.
        Route::post('dishes/{dish}', [DishController::class, 'update']);
        Route::delete('dishes/{dish}', [DishController::class, 'destroy']);

        Route::middleware('admin')->group(function () {
            Route::get('users', [UserController::class, 'index']);
            Route::post('users', [UserController::class, 'store']);
            Route::put('users/{user}', [UserController::class, 'update']);
            Route::delete('users/{user}', [UserController::class, 'destroy']);
        });
    });
});

// Ancienne landing Blade (arabe) conservée
Route::view('/legacy', 'home');
