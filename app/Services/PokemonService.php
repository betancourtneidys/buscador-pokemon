<?php

namespace App\Services;

use App\Models\Pokemon;
use Illuminate\Support\Facades\Http;

class PokemonService
{
    private const BASE_URL = 'https://pokeapi.co/api/v2';

    public function searchPokemon(string $query): array
    {
        // Obtener todos los Pokémon
        $allPokemon = $this->getAllPokemon();
        
        // Filtrar por nombre o ID
        $filtered = array_filter($allPokemon, function($pokemon) use ($query) {
            $pokemonId = basename($pokemon['url']);
            return str_contains(strtolower($pokemon['name']), strtolower($query)) || 
                   (is_numeric($query) && $pokemonId == $query);
        });

        // Obtener detalles de cada Pokémon encontrado
        $results = [];
        foreach ($filtered as $pokemon) {
            $pokemonData = $this->getPokemonData($pokemon['url']);
            $results[] = Pokemon::fromApiData($pokemonData);
        }

        return [
            'results' => $results,
            'total' => count($results)
        ];
    }

    public function getPokemonDetails(string $name): Pokemon
    {
        $data = $this->getPokemonData(self::BASE_URL . "/pokemon/{$name}");
        return Pokemon::fromApiData($data);
    }

    private function getAllPokemon(): array
    {
        $response = Http::get(self::BASE_URL . '/pokemon?limit=1302');
        return $response->successful() ? $response->json()['results'] : [];
    }

    private function getPokemonData(string $url): array
    {
        $response = Http::get($url);
        if (!$response->successful()) {
            throw new \Exception('Pokémon no encontrado');
        }

        $pokemon = $response->json();

        return [
            'id' => $pokemon['id'],
            'name' => $pokemon['name'],
            'sprite' => $this->getBestSprite($pokemon['sprites']),
            'base_experience' => $pokemon['base_experience'],
            'stats' => $this->formatStats($pokemon['stats']),
            'types' => $this->formatTypes($pokemon['types'])
        ];
    }

    private function getBestSprite(array $sprites): ?string
    {
        return $sprites['other']['official-artwork']['front_default'] 
            ?? $sprites['other']['home']['front_default']
            ?? $sprites['front_default']
            ?? null;
    }

    private function formatStats(array $stats): array
    {
        $formatted = [];
        foreach ($stats as $stat) {
            $formatted[$stat['stat']['name']] = $stat['base_stat'];
        }
        return $formatted;
    }

    private function formatTypes(array $types): array
    {
        $formatted = [];
        foreach ($types as $typeData) {
            $typeResponse = Http::get($typeData['type']['url']);
            if ($typeResponse->successful()) {
                $typeInfo = $typeResponse->json();
                $formatted[] = [
                    'name' => $typeInfo['name'],
                    'id' => $typeInfo['id'],
                    'image' => $typeInfo['sprites']['generation-viii']['sword-shield']['name_icon']
                ];
            }
        }
        return $formatted;
    }
}