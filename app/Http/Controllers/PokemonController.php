<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    public function show(Request $request, string $name)
    {
        try {
            $response = Http::get("https://pokeapi.co/api/v2/pokemon/" . strtolower($name));
            
            if (!$response->successful()) {
                return response()->json(['error' => 'Pokémon no encontrado'], 404);
            }
            
            $pokemon = $response->json();
            
            return response()->json([
                'id' => $pokemon['id'],
                'name' => $pokemon['name'],
                'sprite' => $pokemon['sprites']['front_default'],
                'types' => collect($pokemon['types'])->pluck('type.name')->toArray()
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al buscar Pokémon'], 500);
        }
    }
}
