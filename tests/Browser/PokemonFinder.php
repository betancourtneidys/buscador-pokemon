<?php

test('the application returns a successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('Buscador Pokemon', function () {
    $page = visit('/');

    $page->assertSee('Buscar');
});