<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    public function search(Request $request)
    {
        try {
            // Obtener parámetro de búsqueda
            $query = $request->get('q', '');
            
            // Validar entrada: mínimo 2 caracteres para texto o cualquier número
            if (strlen($query) < 2 && !is_numeric($query)) {
                return response()->json(['error' => 'Mínimo 2 caracteres o un número'], 400);
            }

            // Obtener lista completa de Pokémon desde PokeAPI (1302 es el total actual)
            $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=1302');
            if (!$response->successful()) {
                return response()->json(['error' => 'Error al obtener lista'], 500);
            }

            $allPokemon = $response->json()['results'];
            
            // Filtrar Pokémon por nombre parcial o ID exacto
            $filtered = array_filter($allPokemon, function($pokemon) use ($query) {
                // Extraer ID del Pokémon desde la URL
                $pokemonId = basename($pokemon['url']);
                // Buscar por nombre (parcial) o por ID (exacto)
                return str_contains(strtolower($pokemon['name']), strtolower($query)) || 
                       (is_numeric($query) && $pokemonId == $query);
            });

            // Obtener detalles completos de cada Pokémon encontrado
            $pokemonList = [];
            foreach ($filtered as $pokemon) {
                // Llamar a la API para obtener detalles completos de cada Pokémon
                $detailResponse = Http::get($pokemon['url']);
                if ($detailResponse->successful()) {
                    $detail = $detailResponse->json();
                    
                    // Convertir estadísticas a formato amigable
                    $stats = [];
                    foreach ($detail['stats'] as $stat) {
                        $stats[$stat['stat']['name']] = $stat['base_stat'];
                    }

                    // Obtener información de tipos con imágenes
                    $types = [];
                    foreach ($detail['types'] as $typeData) {
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
                    
                    // Guardar todos los datos completos
                    $pokemonList[] = [
                        'id' => $detail['id'],
                        'name' => $detail['name'],
                        'sprite' => $detail['sprites']['other']['official-artwork']['front_default'],
                        'base_experience' => $detail['base_experience'],
                        'stats' => $stats,
                        'types' => $types
                    ];
                }
            }

            // Devolver resultados con total de coincidencias
            return response()->json([
                'results' => $pokemonList,
                'total' => count($pokemonList)
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en búsqueda'], 500);
        }
    }

    public function show(Request $request, string $name)
    {
        try {
            // Obtener datos del Pokémon desde PokeAPI
            $response = Http::get("https://pokeapi.co/api/v2/pokemon/" . strtolower($name));
            
            if (!$response->successful()) {
                return response()->json(['error' => 'Pokémon no encontrado'], 404);
            }
            
            $pokemon = $response->json();

            // Convertir array de estadísticas en objeto más fácil de usar
            $stats = [];
            foreach ($pokemon['stats'] as $stat) {
                $stats[$stat['stat']['name']] = $stat['base_stat'];
            }

            // Obtener información detallada de cada tipo incluyendo imágenes
            $types = [];
            foreach ($pokemon['types'] as $typeData) {
                // Llamar a la API de tipos para obtener las imágenes
                $typeResponse = Http::get($typeData['type']['url']);
                if ($typeResponse->successful()) {
                    $typeInfo = $typeResponse->json();
                    $types[] = [
                        'name' => $typeInfo['name'],
                        'id' => $typeInfo['id'],
                        // Usar imágenes de la generación VIII (Sword/Shield)
                        'image' => $typeInfo['sprites']['generation-viii']['sword-shield']['name_icon']
                    ];
                }
            }

            // Devolver todos los datos necesarios para mostrar el Pokémon
            return response()->json([
                'id' => $pokemon['id'],
                'name' => $pokemon['name'],
                'base_experience' => $pokemon['base_experience'],
                'sprite' => $pokemon['sprites']['other']['official-artwork']['front_default'], // Imagen oficial
                'types' => $types, // Tipos con imágenes
                'stats' => $stats // Estadísticas organizadas
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al buscar Pokémon'], 500);
        }
    }
}
