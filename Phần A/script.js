const API_URL = "https://6ad637e7f71f154ac486aa01.mockapi.io/books"; 
let books = [];
let favoriteIds = JSON.parse(localStorage.getItem('favoriteIds')) || [];

const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const statusBar = document.getElementById('statusBar');
const bookGrid = document.getElementById('bookGrid');
const favoriteCount = document.getElementById('favoriteCount');
const addBookForm = document.getElementById('addBookForm');

async function fetchBooks() {
    try {
        statusBar.textContent = "Đang tải...";
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Không thể tải dữ liệu từ server.");
        
        books = await response.json();
        initGenres();
        renderBooks();
    } catch (error) {
        statusBar.textContent = "Lỗi: Không thể kết nối đến máy chủ!";
        console.error(error);
    }
}

function initGenres() {
    const genres = new Set(books.map(b => b.genre));
    genreFilter.innerHTML = '<option value="">Tất cả thể loại</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

function renderBooks() {
    const keyword = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesName = book.name.toLowerCase().includes(keyword);
        const matchesGenre = selectedGenre === "" || book.genre === selectedGenre;
        return matchesName && matchesGenre;
    });

    statusBar.textContent = `Đang hiển thị ${filteredBooks.length} / ${books.length} cuốn`;

    bookGrid.innerHTML = "";
    if (filteredBooks.length === 0) {
        bookGrid.textContent = "Không tìm thấy cuốn sách nào phù hợp.";
        return;
    }

    filteredBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.id;

        const infoDiv = document.createElement('div');
        
        const title = document.createElement('h3');
        title.textContent = book.name;

        const author = document.createElement('p');
        author.textContent = `Tác giả: ${book.author}`;

        const genre = document.createElement('p');
        genre.textContent = `Thể loại: ${book.genre}`;

        const year = document.createElement('p');
        year.textContent = `Năm XB: ${book.year}`;

        infoDiv.appendChild(title);
        infoDiv.appendChild(author);
        infoDiv.appendChild(genre);
        infoDiv.appendChild(year);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'book-actions';

        const isFav = favoriteIds.includes(book.id);
        const btnFav = document.createElement('button');
        btnFav.className = `btn-fav ${isFav ? 'active' : ''}`;
        btnFav.textContent = isFav ? '❤️ Đã thích' : '🤍 Yêu thích';
        btnFav.dataset.action = 'favorite';

        const btnDel = document.createElement('button');
        btnDel.className = 'btn-delete';
        btnDel.textContent = 'Xóa';
        btnDel.dataset.action = 'delete';

        actionsDiv.appendChild(btnFav);
        actionsDiv.appendChild(btnDel);

        card.appendChild(infoDiv);
        card.appendChild(actionsDiv);
        bookGrid.appendChild(card);
    });

    updateFavoriteCounter();
}

searchInput.addEventListener('input', renderBooks);
genreFilter.addEventListener('change', renderBooks);

bookGrid.addEventListener('click', async (e) => {
    const target = e.target;
    const card = target.closest('.book-card');
    if (!card) return;
    const bookId = card.dataset.id;

    if (target.dataset.action === 'delete') {
        const confirmed = confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?");
        if (!confirmed) return;

        try {
            const res = await fetch(`${API_URL}/${bookId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Xóa thất bại!");
            
            books = books.filter(b => b.id !== bookId);
            favoriteIds = favoriteIds.filter(id => id !== bookId);
            localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
            renderBooks();
        } catch (err) {
            alert("Lỗi khi xóa sách trên server.");
            console.error(err);
        }
    }

    if (target.dataset.action === 'favorite') {
        if (favoriteIds.includes(bookId)) {
            favoriteIds = favoriteIds.filter(id => id !== bookId);
        } else {
            favoriteIds.push(bookId);
        }
        localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
        renderBooks();
    }
});

function updateFavoriteCounter() {
    favoriteCount.textContent = favoriteIds.length;
}

addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const authorInput = document.getElementById('author');
    const genreInput = document.getElementById('genre');
    const yearInput = document.getElementById('year');

    let isValid = true;
    const currentYear = new Date().getFullYear();

    if (nameInput.value.trim().length < 3) {
        document.getElementById('error-name').textContent = "Tên sách phải từ 3 ký tự trở lên.";
        isValid = false;
    } else {
        document.getElementById('error-name').textContent = "";
    }

    if (authorInput.value.trim() === "") {
        document.getElementById('error-author').textContent = "Tác giả không được để trống.";
        isValid = false;
    } else {
        document.getElementById('error-author').textContent = "";
    }

    if (genreInput.value === "") {
        document.getElementById('error-genre').textContent = "Vui lòng chọn thể loại.";
        isValid = false;
    } else {
        document.getElementById('error-genre').textContent = "";
    }

    const yearVal = Number(yearInput.value);
    if (!yearVal || yearVal < 1900 || yearVal > currentYear) {
        document.getElementById('error-year').textContent = `Năm xuất bản phải từ 1900 đến ${currentYear}.`;
        isValid = false;
    } else {
        document.getElementById('error-year').textContent = "";
    }

    if (!isValid) return;

    const newBook = {
        name: nameInput.value.trim(),
        author: authorInput.value.trim(),
        genre: genreInput.value,
        year: yearVal
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) throw new Error("Thêm sách thất bại!");

        const createdBook = await response.json();
        books.unshift(createdBook); // Thêm lên đầu danh sách
        initGenres();
        renderBooks();
        addBookForm.reset();
        alert("Thêm sách thành công!");
    } catch (err) {
        alert("Có lỗi xảy ra khi thêm sách.");
        console.error(err);
    }
});

fetchBooks();