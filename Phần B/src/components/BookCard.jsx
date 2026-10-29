export default function BookCard({ book, isFavorite, onToggleFavorite }) {
    return (
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
                <h3 style={{ color: '#007bff', marginBottom: '10px' }}>{book.name}</h3>
                <p>Tác giả: {book.author}</p>
                <p>Thể loại: {book.genre}</p>
                <p>Năm XB: {book.year}</p>
            </div>
            <button 
                onClick={() => onToggleFavorite(book.id)}
                style={{ marginTop: '15px', padding: '8px 12px', background: isFavorite ? '#ff5722' : '#ffc107', color: isFavorite ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                {isFavorite ? '❤️ Đã thích' : '🤍 Yêu thích'}
            </button>
        </div>
    );
}