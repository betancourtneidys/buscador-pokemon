import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Stats {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
}

interface PokemonType {
    name: string;
    id: number;
    image: string;
}

interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    base_experience: number;
    stats: Stats;
    types: PokemonType[];
}

interface SearchResponse {
    results: Pokemon[];
    total: number;
}

export default function Welcome() {
    const [search, setSearch] = useState(''); // Texto de búsqueda
    const [searchResults, setSearchResults] = useState<Pokemon[]>([]); // Lista de resultados completos
    const [searchData, setSearchData] = useState<SearchResponse | null>(null); // Metadatos de búsqueda
    const [loading, setLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(''); // Mensajes de error
    const [showResults, setShowResults] = useState(false); // Mostrar/ocultar resultados

    // Función para buscar Pokémon por nombre parcial o ID
    const searchPokemon = async () => {
        // Validar entrada: mínimo 2 caracteres o un número
        if (!search.trim() || (search.length < 2 && !Number.isInteger(Number(search)))) {
            setError('Mínimo 2 caracteres o un número');
            return;
        }
        
        // Inicializar estados de búsqueda
        setLoading(true);
        setError('');
        setShowResults(false);
        
        try {
            // Llamar al endpoint de búsqueda
            const response = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
            const data = await response.json();
            
            if (response.ok) {
                // Mostrar resultados de búsqueda completos
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



    return (
        <>
            {/* Configuración del head de la página */}
            <Head title="Buscador Pokémon">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            {/* Contenedor principal con fondo */}
            <div className="bg-[url(/img/7027.jpg)] flex min-h-screen flex-col items-center p-6 text-white lg:justify-center lg:p-8">
                {/* Logo de PokéAPI */}
                <div className="">
                    <img
                        src={"https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                        alt={"PokéAPI"}
                        className="mx-auto mb-4"
                    />
                </div>
                
                {/* Contenedor principal de la aplicación */}
                <div className="w-full max-w-6xl space-y-6">                    
                    {/* Barra de búsqueda */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchPokemon()}
                            placeholder="Buscador Pokémon"
                            className="bg-[#05182fc4]  flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={searchPokemon}
                            disabled={loading}
                            className="px-6 py-2 bg-[#3761a8] rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>

                    {/* Mostrar errores si existen */}
                    {error && (
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Cards de Pokémon con detalles completos */}
                    {showResults && searchResults.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-center text-xl mb-6">Resultados ({searchData?.total}):</h3>
                            {/* Grilla de cards completas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {searchResults.map((pokemon) => (
                                    <div key={pokemon.id} className="p-6 bg-[#05182fc4] border-4 border-[#3761a8] rounded-lg shadow-lg text-center">
                                        {/* Cabecera con ID, nombre y PS */}
                                        <div className="flex justify-between items-center mb-4 text-sm font-bold">
                                            <p>ID: {pokemon.id}</p>
                                            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                                            <p>PS {pokemon.stats.hp}</p>
                                        </div>

                                        {/* Imagen oficial del Pokémon */}
                                        {pokemon.sprite ? (
                                            <img
                                                src={pokemon.sprite}
                                                alt={pokemon.name}
                                                className="w-32 h-32 mx-auto mb-4"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-600 text-xs">Sin imagen</span>
                                            </div>
                                        )}
                                        
                                        {/* Tipos del Pokémon con imágenes */}
                                        <div className="flex justify-center gap-2 mb-4">
                                            {pokemon.types.map((type) => (
                                                <img
                                                    key={type.name}
                                                    src={type.image}
                                                    alt={type.name}
                                                    className="h-6 w-auto"
                                                    title={type.name}
                                                />
                                            ))}
                                        </div>

                                        {/* Estadísticas del Pokémon */}
                                        <div className="text-left">
                                            <h4 className="font-bold mb-2 text-center">Stats:</h4>
                                            <div className="grid grid-cols-2 gap-1 text-xs font-semibold">
                                                <p>Ataque: {pokemon.stats.attack}</p>
                                                <p>Defensa: {pokemon.stats.defense}</p>
                                                <p>At. Esp: {pokemon.stats["special-attack"]}</p>
                                                <p>Def. Esp: {pokemon.stats["special-defense"]}</p>
                                                <p className="col-span-2 text-center">Velocidad: {pokemon.stats.speed}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mensaje cuando no se encuentran Pokémon */}
                    {showResults && searchResults.length === 0 && (
                        <div className="p-6 bg-[#05182fc4] border-2 border-[#3761a8] rounded-lg text-center">
                            <p className="text-lg">No se encontraron Pokémon con ese nombre o ID</p>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
