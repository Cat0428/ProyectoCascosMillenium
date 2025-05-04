document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.fa-search');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
  
    // Mostrar/ocultar caja de búsqueda al hacer clic en la lupa
    searchIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'flex';
        searchInput.focus();
      } else {
        searchBox.style.display = 'none';
      }
    });
  
    // Ejecutar búsqueda al presionar Enter
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  
    // Ejecutar búsqueda con botón
    searchButton.addEventListener('click', () => {
      performSearch();
    });
  
    // Función de búsqueda
    function performSearch() {
      const query = searchInput.value.trim();
      if (query) {
        alert('Buscando: ' + query);
        // Aquí podrías redirigir si lo deseas:
        // window.location.href = `/buscar.html?q=${encodeURIComponent(query)}`;
      }
    }
  
    // Cerrar búsqueda al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target) && e.target !== searchIcon) {
        searchBox.style.display = 'none';
      }
    });
  });
  