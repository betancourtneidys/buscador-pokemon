import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        onSearch(search);
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex gap-2">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscador Pokémon"
                className="bg-[#05182fc4] flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#3761a8] rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Buscando...' : 'Buscar'}
            </button>
        </form>
    );
}