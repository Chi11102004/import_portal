document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const tableBody = document.getElementById('tableBody');

    // Hàm thực hiện tìm kiếm
    function performSearch() {
        const keyword = searchInput.value.toLowerCase().trim();
        const rows = tableBody.getElementsByTagName('tr');

        // Quét từng dòng trong bảng
        for (let i = 0; i < rows.length; i++) {
            let rowText = rows[i].textContent.toLowerCase();
            
            // Nếu dòng chứa từ khóa thì hiện, không thì ẩn
            if (rowText.includes(keyword)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }

    // Tìm kiếm khi bấm nút "Tìm kiếm"
    if(searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Tự động tìm kiếm khi người dùng vừa gõ phím chữ (tùy chọn cho xịn)
    if(searchInput) {
        searchInput.addEventListener('keyup', performSearch);
    }
});