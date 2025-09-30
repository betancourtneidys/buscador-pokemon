<?php

namespace App\Http\Controllers;

use App\Services\PokemonService;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function __construct(
        private PokemonService $pokemonService
    ) {}

    public function search(Request $request)
    {
        $query = $request->get('q', '');
        
        // Validación simple
        if (!$query || (strlen($query) < 2 && !is_numeric($query))) {
            return response()->json(['error' => 'Mínimo 2 caracteres o un número'], 400);
        }

        try {
            $result = $this->pokemonService->searchPokemon($query);
            return response()->json($result);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en búsqueda'], 500);
        }
    }

    public function show(Request $request, string $name)
    {
        try {
            $pokemon = $this->pokemonService->getPokemonDetails($name);
            return response()->json($pokemon);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Pokémon no encontrado'], 404);
        }
    }
}