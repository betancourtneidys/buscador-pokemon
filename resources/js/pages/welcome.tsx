import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    types: string[];
}

export default function Welcome() {
    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchPokemon = async () => {
        if (!search.trim()) return;
        
        setLoading(true);
        setError('');
        setPokemon(null);
        
        try {
            const response = await fetch(`/api/pokemon/${search.toLowerCase()}`);
            const data = await response.json();
            
            if (response.ok) {
                setPokemon(data);
            } else {
                setError(data.error || 'Error al buscar Pokémon');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Buscador Pokémon">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center p-6 text-[#1b1b18] lg:justify-center lg:p-8">
                <div className="">
                    <img
                        src={"https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                        alt={"PokéAPI"}
                        className="mx-auto mb-4"
                    />
                </div>
                <div className="w-full max-w-md space-y-6">                    
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchPokemon()}
                            placeholder="Buscador Pokémon"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={searchPokemon}
                            disabled={loading}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {pokemon && (
                        <div className="p-6 bg-white border rounded-lg shadow-lg text-center">
                            <img
                                src={pokemon.sprite}
                                alt={pokemon.name}
                                className="w-32 h-32 mx-auto mb-4"
                            />
                            <h2 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
                            <p className="text-gray-600 mb-2">ID: {pokemon.id}</p>
                            <div className="flex justify-center gap-2">
                                {pokemon.types.map((type) => (
                                    <span
                                        key={type}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
