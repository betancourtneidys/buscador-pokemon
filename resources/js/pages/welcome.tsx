import { Head } from '@inertiajs/react';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SearchBar } from '../components/SearchBar';
import { PokemonCard } from '../components/PokemonCard';
import { ErrorMessage } from '../components/ErrorMessage';

export default function Welcome() {
    const {
        searchResults,
        searchData,
        loading,
        error,
        showResults,
        searchPokemon
    } = usePokemonSearch();

    return (
        <>
            <Head title="Buscador Pokémon">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="bg-[url(/img/7027.jpg)] flex min-h-screen flex-col items-center p-6 text-white lg:justify-center lg:p-8">
                <div className="">
                    <img
                        src={"https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                        alt={"PokéAPI"}
                        className="mx-auto mb-4"
                    />
                </div>
                
                <div className="w-full max-w-6xl space-y-6">                    
                    <SearchBar onSearch={searchPokemon} loading={loading} />

                    {error && <ErrorMessage message={error} />}

                    {showResults && searchResults.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-center text-xl mb-6">Resultados ({searchData?.total}):</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {searchResults.map((pokemon) => (
                                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                                ))}
                            </div>
                        </div>
                    )}

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