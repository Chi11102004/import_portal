document.addEventListener('DOMContentLoaded', function(){
  // Utility
  function debounce(fn, wait){let t;return function(...a){clearTimeout(t);t=setTimeout(()=>fn.apply(this,a),wait)}}

  // Generic search + pagination for tables with class .table or .notif-table
  function initList(containerSelector){
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container=>{
      const table = container.querySelector('table');
      if(!table) return;
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const paginationEl = container.querySelector('.pagination');
      const searchInput = container.querySelector('.search-input') || container.querySelector('#notif-search');
      const searchBtn = container.querySelector('#notif-search-btn') || container.querySelector('.search-btn');

      let pageSize = 10;
      let currentPage = 1;
      let filtered = rows.slice();

      function renderPage(){
        const start = (currentPage-1)*pageSize;
        const end = start+pageSize;
        rows.forEach(r=>r.style.display='none');
        filtered.slice(start,end).forEach(r=>r.style.display='table-row');
        renderPagination();
      }

      function renderPagination(){
        if(!paginationEl) return;
        paginationEl.innerHTML='';
        const info = document.createElement('div');
        info.textContent = `Hiển thị ${Math.min((currentPage-1)*pageSize+1, filtered.length)} đến ${Math.min(currentPage*pageSize, filtered.length)} trong tổng số ${filtered.length} kết quả`;
        paginationEl.appendChild(info);

        const controls = document.createElement('div');
        controls.style.marginLeft='auto';
        controls.style.display='flex';
        controls.style.gap='8px';

        const pageSizeLabel = document.createElement('div');
        pageSizeLabel.textContent='Hiển thị:';
        controls.appendChild(pageSizeLabel);

        const sizeSel = document.createElement('select');
        sizeSel.className='page-size';
        [5,10,20,50].forEach(n=>{const o=document.createElement('option');o.value=n;o.textContent=n; if(n===pageSize) o.selected=true; sizeSel.appendChild(o)});
        sizeSel.addEventListener('change',()=>{pageSize=parseInt(sizeSel.value,10);currentPage=1;renderPage()});
        controls.appendChild(sizeSel);

        const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize));

        const prev = document.createElement('button'); prev.className='page'; prev.textContent='←'; prev.disabled = currentPage===1; prev.addEventListener('click',()=>{ if(currentPage>1){currentPage--;renderPage()} }); controls.appendChild(prev);

        // show up to 5 page buttons
        const startPage = Math.max(1, currentPage-2);
        const endPage = Math.min(totalPages, startPage+4);
        for(let i=startPage;i<=endPage;i++){
          const b=document.createElement('button'); b.className='page'; b.textContent=i; if(i===currentPage){b.classList.add('active')}; b.addEventListener('click',()=>{currentPage=i;renderPage()}); controls.appendChild(b);
        }

        const next = document.createElement('button'); next.className='page'; next.textContent='→'; next.disabled = currentPage===totalPages; next.addEventListener('click',()=>{ if(currentPage<totalPages){currentPage++;renderPage()} }); controls.appendChild(next);

        paginationEl.appendChild(controls);
      }

      function applyFilter(q){
        const s = (q||'').trim().toLowerCase();
        if(!s){ filtered = rows.slice(); }
        else{ filtered = rows.filter(r=> r.textContent.toLowerCase().indexOf(s)!==-1 ); }
        currentPage = 1; renderPage();
      }

      if(searchInput){
        const onInput = debounce(()=> applyFilter(searchInput.value), 250);
        searchInput.addEventListener('input', onInput);
      }
      if(searchBtn){
        searchBtn.addEventListener('click', ()=> applyFilter(searchInput ? searchInput.value : ''));
      }

      // initialize
      applyFilter('');
    });
  }

  // Initialize for both pages: card container has class list-card or notif-card
  initList('.list-card');
  initList('.notif-card');
});
