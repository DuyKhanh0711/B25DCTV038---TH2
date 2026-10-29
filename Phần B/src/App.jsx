import { useState, useEffect } from 'react';
import Header from './components/Header';
import GenreFilter from './components/GenreFilter';
import Section from './components/Section';
import BookList from './components/BookList';
import Footer from './components/Footer';

const API_URL = "https://6ad637e7f71f154ac486aa01.mockapi.io/books"; // Thay link MockAPI của bạn vào đây

export default function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favoriteIds, setFavoriteIds] = useState(() => {
        return JSON.parse(localStorage.getItem('favoriteIds')) || [];
    });
    const [selectedGenre, setSelectedGenre] = useState("");

    // Gọi API khi component được mount lần đầu
    useEffect(() => {
        async function fetchBooks() {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Không thể tải dữ liệu từ server.");
                const data = await response.json();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    // Lưu state yêu thích vào localStorage mỗi khi thay đổi
    useEffect(() => {
        localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
    }, [favoriteIds]);

    // Lấy danh sách thể loại duy nhất dùng Set
    const genres = [...new Set(books.map(b => b.genre || b.Genre))];

    // Xử lý chuyển đổi trạng thái yêu thích
    const handleToggleFavorite = (id) => {
        if (favoriteIds.includes(id)) {
            setFavoriteIds(favoriteIds.filter(favId => favId !== id));
        } else {
            setFavoriteIds([...favoriteIds, id]);
        }
    };

    // Lọc sách theo thể loại được chọn (hỗ trợ cả trường viết thường và viết hoa từ MockAPI)
    const filteredBooks = selectedGenre === "" 
        ? books 
        : books.filter(book => (book.genre || book.Genre) === selectedGenre);

    return (
        <div style={{ backgroundColor: '#f4f4f9', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <Header favoriteCount={favoriteIds.length} />
                
                <main style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px' }}>
                    {/* Dòng trạng thái tải dữ liệu */}
                    {loading && <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>Đang tải...</p>}
                    {error && <p style={{ color: 'red', marginBottom: '15px' }}>Lỗi: {error}</p>}

                    {!loading && !error && (
                        <>
                            <Section title="Bộ lọc thể loại">
                                <GenreFilter 
                                    genres={genres} 
                                    selectedGenre={selectedGenre} 
                                    onSelectGenre={setSelectedGenre} 
                                />
                            </Section>

                            <Section title={`Danh sách sách (${filteredBooks.length} / ${books.length} cuốn)`}>
                                <BookList 
                                    books={filteredBooks} 
                                    favoriteIds={favoriteIds} 
                                    onToggleFavorite={handleToggleFavorite} 
                                />
                            </Section>
                        </>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}