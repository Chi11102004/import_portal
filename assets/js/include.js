document.addEventListener("DOMContentLoaded", function() {
    console.log("🤖 include.js đã được kích hoạt!");

    const includes = document.querySelectorAll('[data-include]');
    
    includes.forEach(el => {
        const file = el.getAttribute('data-include');
        
        fetch(file)
            .then(res => {
                if (res.ok) {
                    return res.text();
                }
                throw new Error('Không tìm thấy: ' + file);
            })
            .then(data => {
                // Nhúng HTML vào trang
                el.innerHTML = data;
                
                // ==========================================
                // TÍNH NĂNG TỰ ĐỘNG TÔ MÀU MENU CHUẨN XÁC
                // ==========================================
                if (file.includes('sidebar.html')) {
                    // Lấy tên file đang mở trên URL (Ví dụ: danhSachhoso.html)
                    let currentPage = window.location.pathname.split('/').pop();
                    
                    // Nếu là trang gốc (không có tên file) thì mặc định là dashboard
                    if (currentPage === '') currentPage = 'dashboard.html';

                    const navItems = el.querySelectorAll('.nav-item');
                    
                    navItems.forEach(item => {
                        // 1. Tắt hết màu xanh ở tất cả các menu
                        item.classList.remove('active');
                        
                        // 2. Kiểm tra cái nào có href khớp với trang hiện tại thì bật màu xanh lên
                        if (item.getAttribute('href') === currentPage) {
                            item.classList.add('active');
                        }
                    });
                }
                // ==========================================
            })
            .catch(err => {
                console.error("Lỗi nhúng file:", err);
                el.innerHTML = `<div style="padding: 20px; color: red; border: 2px dashed red; font-weight: bold;">
                                    ❌ LỖI: Không thể tải được file <code>${file}</code>. <br>
                                    Vui lòng kiểm tra lại đường dẫn!
                                </div>`;
            });
    });
});