interface Pokemon {
    id: number;
    name: string;
    sprite: string;
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

interface PokemonCardProps {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className="p-4 sm:p-6 bg-[#05182fc4] border-4 border-[#3761a8] rounded-lg shadow-lg text-center">
            {/* Cabecera con ID, nombre y PS */}
            <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs sm:text-sm font-bold">
                <p>ID: {pokemon.id}</p>
                <h2 className="text-lg sm:text-xl font-bold capitalize px-2">{pokemon.name}</h2>
                <p>PS {pokemon.stats.hp}</p>
            </div>

            {/* Imagen del Pokémon */}
            {pokemon.sprite ? (
                <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4"
                />
            ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-xs">Sin imagen</span>
                </div>
            )}
            
            {/* Tipos del Pokémon */}
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

            {/* Estadísticas */}
            <div className="text-left">
                <h4 className="font-bold mb-2 text-center text-sm sm:text-base">Stats:</h4>
                <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm font-semibold">
                    <p>Ataque: {pokemon.stats.attack}</p>
                    <p>Defensa: {pokemon.stats.defense}</p>
                    <p>At. Esp: {pokemon.stats["special-attack"]}</p>
                    <p>Def. Esp: {pokemon.stats["special-defense"]}</p>
                    <p className="col-span-2 text-center">Velocidad: {pokemon.stats.speed}</p>
                </div>
            </div>
        </div>
    );
}