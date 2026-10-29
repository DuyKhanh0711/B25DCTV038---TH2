export default function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button 
                onClick={() => onSelectGenre("")}
                style={{ padding: '8px 16px', background: selectedGenre === "" ? '#007bff' : '#e0e0e0', color: selectedGenre === "" ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Tất cả
            </button>
            {genres.map(genre => (
                <button 
                    key={genre}
                    onClick={() => onSelectGenre(genre)}
                    style={{ padding: '8px 16px', background: selectedGenre === genre ? '#007bff' : '#e0e0e0', color: selectedGenre === genre ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
}