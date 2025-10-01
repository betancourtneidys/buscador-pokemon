<?php

use App\Services\PokemonService;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

uses(TestCase::class);

test('pokemon service busca correctamente', function () {
    Http::fake([
        'https://pokeapi.co/api/v2/pokemon?limit=1302' => Http::response([
            'results' => [
                ['name' => 'pikachu', 'url' => 'https://pokeapi.co/api/v2/pokemon/25/']
            ]
        ]),
        'https://pokeapi.co/api/v2/pokemon/25/' => Http::response([
            'id' => 25,
            'name' => 'pikachu',
            'sprites' => ['front_default' => 'sprite.png'],
            'base_experience' => 112,
            'stats' => [],
            'types' => []
        ])
    ]);

    $service = new PokemonService();
    $result = $service->searchPokemon('pika');

    expect($result)->toHaveKey('results')
                  ->and($result)->toHaveKey('total')
                  ->and($result['total'])->toBe(1);
});

test('pokemon service obtiene detalles', function () {
    Http::fake([
        'https://pokeapi.co/api/v2/pokemon/pikachu' => Http::response([
            'id' => 25,
            'name' => 'pikachu',
            'sprites' => ['front_default' => 'sprite.png'],
            'base_experience' => 112,
            'stats' => [],
            'types' => []
        ])
    ]);

    $service = new PokemonService();
    $pokemon = $service->getPokemonDetails('pikachu');

    expect($pokemon)->toBeInstanceOf(\App\Models\Pokemon::class)
                   ->and($pokemon->name)->toBe('pikachu')
                   ->and($pokemon->id)->toBe(25);
});