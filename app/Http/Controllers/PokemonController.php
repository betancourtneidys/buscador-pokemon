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

            // Convertir el array de stats en un objeto más amigable (Ayuda Amazon Q)
            $stats = [];
            foreach ($pokemon['stats'] as $stat) {
                $stats[$stat['stat']['name']] = $stat['base_stat'];
            }

            // Obtener datos de tipos con imágenes desde la API (Ayuda Amazon Q)
            $types = [];
            foreach ($pokemon['types'] as $typeData) {
                $typeResponse = Http::get($typeData['type']['url']);
                if ($typeResponse->successful()) {
                    $typeInfo = $typeResponse->json();
                    $types[] = [
                        'name' => $typeInfo['name'],
                        'id' => $typeInfo['id'],
                        'image' => $typeInfo['sprites']['generation-viii']['sword-shield']['name_icon']
                    ];
                }
            }

            return response()->json([
                'id' => $pokemon['id'],
                'name' => $pokemon['name'],
                'base_experience' => $pokemon['base_experience'],
                'sprite' => $pokemon['sprites']['other']['official-artwork']['front_default'],
                'types' => $types,
                'stats' => $stats
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al buscar Pokémon'], 500);
        }
    }
}
