import { Head } from '@inertiajs/react';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SearchBar } from '../components/SearchBar';
import { PokemonCard } from '../components/PokemonCard';
import { ErrorMessage } from '../components/ErrorMessage';

export default function Welcome() {
    const {
        displayedResults,
        totalResults,
        loading,
        loadingMore,
        error,
        showResults,
        hasMore,
        searchPokemon,
        loadMore
    } = usePokemonSearch();

    return (
        <>
            <Head title="Buscador Pokémon">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="bg-[url(/img/7027.jpg)] bg-cover bg-center bg-fixed flex min-h-screen flex-col items-center p-4 sm:p-6 text-white lg:justify-center lg:p-8">
                <div className="mb-6 lg:mb-8">
                    <img
                        src={"https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                        alt={"PokéAPI"}
                        className="mx-auto w-32 sm:w-48 md:w-64 h-auto"
                    />
                </div>
                
                <div className="w-full max-w-7xl space-y-4 sm:space-y-6">                    
                    <SearchBar onSearch={searchPokemon} loading={loading} />

                    {error && <ErrorMessage message={error} />}

                    {showResults && displayedResults.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-center text-lg sm:text-xl mb-4 sm:mb-6">Mostrando {displayedResults.length} de {totalResults} resultados:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {displayedResults.map((pokemon) => (
                                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                                ))}
                            </div>
                            {hasMore && (
                                <div className="text-center mt-6">
                                    <button
                                        onClick={loadMore}
                                        disabled={loadingMore}
                                        className="px-6 py-3 bg-[#3761a8] rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors"
                                    >
                                        {loadingMore ? 'Cargando...' : 'Ver más'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {showResults && displayedResults.length === 0 && (
                        <div className="p-4 sm:p-6 bg-[#05182fc4] border-2 border-[#3761a8] rounded-lg text-center">
                            <p className="text-base sm:text-lg">No se encontraron Pokémon con ese nombre o ID</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}