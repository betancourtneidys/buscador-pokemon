<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PokemonSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'q' => 'required|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'q.required' => 'El término de búsqueda es requerido',
            'q.min' => 'Mínimo 1 carácter o número',
        ];
    }

    public function getQuery(): string
    {
        return $this->validated()['q'];
    }
}