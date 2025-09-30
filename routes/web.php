<?php

use App\Http\Controllers\PokemonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/api/pokemon/{name}', [PokemonController::class, 'show']);
Route::get('/api/search', [PokemonController::class, 'search']);