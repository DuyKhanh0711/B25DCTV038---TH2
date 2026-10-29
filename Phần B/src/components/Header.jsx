export default function Header({ favoriteCount }) {
    return (
        <header style={{ background: '#007bff', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Thư viện của lớp (React)</h1>
            <div>❤️ Sách yêu thích: <span>{favoriteCount}</span></div>
        </header>
    );
}