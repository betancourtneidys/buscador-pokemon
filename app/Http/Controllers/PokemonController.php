<?php

namespace App\Http\Controllers;

use App\Http\Requests\PokemonSearchRequest;
use App\Services\PokemonService;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function __construct(
        private PokemonService $pokemonService
    ) {}

    public function search(PokemonSearchRequest $request)
    {
        try {
            $page = $request->get('page', 1);
            $perPage = $request->get('per_page', 12);
            $result = $this->pokemonService->searchPokemon($request->getQuery(), $page, $perPage);
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