import BookCard from './BookCard';

export default function BookList({ books, favoriteIds, onToggleFavorite }) {
    if (books.length === 0) {
        return <p style={{ fontStyle: 'italic', color: '#555' }}>Không tìm thấy cuốn sách nào phù hợp.</p>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {books.map(book => (
                <BookCard 
                    key={book.id} // Bắt buộc phải có key duy nhất
                    book={book}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
}