import { useState } from 'react';

interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    base_experience: number;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        "special-attack": number;
        "special-defense": number;
        speed: number;
    };
    types: Array<{
        name: string;
        id: number;
        image: string;
    }>;
}

interface SearchResponse {
    results: Pokemon[];
    total: number;
}

export function usePokemonSearch() {
    const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
    const [searchData, setSearchData] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showResults, setShowResults] = useState(false);

    const searchPokemon = async (query: string) => {
        if (!query.trim() || (query.length < 2 && !Number.isInteger(Number(query)))) {
            setError('Mínimo 2 caracteres o un número');
            return;
        }
        
        setLoading(true);
        setError('');
        setShowResults(false);
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            if (response.ok) {
                setSearchResults(data.results);
                setSearchData(data);
                setShowResults(true);
            } else {
                setError(data.error || 'Error al buscar Pokémon');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return {
        searchResults,
        searchData,
        loading,
        error,
        showResults,
        searchPokemon
    };
}