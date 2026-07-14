<?php

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
Route::get('/admin/{any?}', $serveSpa)->where('any', '.*');

// Ancienne landing Blade (arabe) conservée
Route::view('/legacy', 'home');
