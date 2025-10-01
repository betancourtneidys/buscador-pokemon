<?php

use Illuminate\Support\Facades\Http;

test('buscar pokemon por nombre retorna resultados', function () {
    Http::fake([
        'https://pokeapi.co/api/v2/pokemon?limit=1302' => Http::response([
            'results' => [
                ['name' => 'pikachu', 'url' => 'https://pokeapi.co/api/v2/pokemon/25/']
            ]
        ]),
        'https://pokeapi.co/api/v2/pokemon/25/' => Http::response([
            'id' => 25,
            'name' => 'pikachu',
            'sprites' => [
                'front_default' => 'sprite.png',
                'other' => ['official-artwork' => ['front_default' => 'artwork.png']]
            ],
            'base_experience' => 112,
            'stats' => [['stat' => ['name' => 'hp'], 'base_stat' => 35]],
            'types' => [['type' => ['name' => 'electric', 'url' => 'type-url']]]
        ]),
        'type-url' => Http::response([
            'name' => 'electric',
            'id' => 13,
            'sprites' => ['generation-viii' => ['sword-shield' => ['name_icon' => 'icon.png']]]
        ])
    ]);

    $response = $this->get('/api/search?q=pika');

    $response->assertStatus(200)
             ->assertJsonStructure([
                 'results' => [
                     '*' => ['id', 'name', 'sprite', 'baseExperience', 'stats', 'types']
                 ],
                 'total'
             ]);
});

test('buscar pokemon por id retorna resultado', function () {
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

    $response = $this->get('/api/search?q=25');

    $response->assertStatus(200);
});

test('buscar sin parametros retorna error de validacion', function () {
    $response = $this->getJson('/api/search');

    $response->assertStatus(422)
             ->assertJsonValidationErrors(['q']);
});