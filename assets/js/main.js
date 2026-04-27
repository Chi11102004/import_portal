document.addEventListener('click', function(event) {
    // Tìm các phần tử trên Header (Dùng Event Delegation vì header được load sau)
    const avatarBtn = event.target.closest('#adminDropdownBtn');
    const dropdownMenu = document.getElementById('adminDropdownMenu');
    const chevIcon = document.getElementById('chevIcon');

    // Nếu Menu tồn tại trên trang
    if (dropdownMenu) {
        if (avatarBtn) {
            // 1. Nhấp vào khu vực Avatar -> Bật/Tắt menu
            dropdownMenu.classList.toggle('show');
            
            // 2. Đổi biểu tượng mũi tên (Quay lên / Quay xuống)
            if(dropdownMenu.classList.contains('show')) {
                chevIcon.classList.remove('fa-chevron-down');
                chevIcon.classList.add('fa-chevron-up');
            } else {
                chevIcon.classList.remove('fa-chevron-up');
                chevIcon.classList.add('fa-chevron-down');
            }
        } else {
            // 3. Nhấp ra chỗ khác ngoài Avatar -> Tự động giấu menu đi
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
                chevIcon.classList.remove('fa-chevron-up');
                chevIcon.classList.add('fa-chevron-down');
            }
        }
    }
});