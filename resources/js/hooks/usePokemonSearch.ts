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

export function usePokemonSearch() {
    const [displayedResults, setDisplayedResults] = useState<Pokemon[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    
    const RESULTS_PER_PAGE = 12;

    const searchPokemon = async (query: string) => {
        if (!query.trim() || (query.length < 2 && !Number.isInteger(Number(query)))) {
            setError('Mínimo 2 caracteres o un número');
            setDisplayedResults([]);
            setTotalResults(0);
            setShowResults(false);
            return;
        }
        
        setLoading(true);
        setError('');
        setShowResults(false);
        setDisplayedResults([]);
        setTotalResults(0);
        setCurrentPage(1);
        setHasMorePages(false);
        setLastQuery(query);
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=1`);
            const data = await response.json();
            
            if (response.ok) {
                setDisplayedResults(data.results);
                setTotalResults(data.total);
                setHasMorePages(data.has_more);
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

    const loadMore = async () => {
        if (!hasMorePages || loadingMore) return;
        
        setLoadingMore(true);
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(lastQuery)}&page=${currentPage + 1}`);
            const data = await response.json();
            
            if (response.ok) {
                setDisplayedResults(prev => [...prev, ...data.results]);
                setCurrentPage(currentPage + 1);
                setHasMorePages(data.has_more);
            }
        } catch (err) {
            setError('Error cargando más resultados');
        } finally {
            setLoadingMore(false);
        }
    };
    
    const hasMore = hasMorePages;

    return {
        displayedResults,
        totalResults,
        loading,
        loadingMore,
        error,
        showResults,
        hasMore,
        searchPokemon,
        loadMore
    };
}