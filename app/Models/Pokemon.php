<?php

namespace App\Models;

class Pokemon
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $sprite,
        public ?int $baseExperience,
        public array $stats,
        public array $types
    ) {}

    public static function fromApiData(array $data): self
    {
        return new self(
            id: $data['id'],
            name: $data['name'],
            sprite: $data['sprite'],
            baseExperience: $data['base_experience'],
            stats: $data['stats'],
            types: $data['types']
        );
    }

}