// Configuración global
let chart = null;
const API_URL = "https://datosabiertos.metropol.gov.co/dataset/f2c142b3-b5c1-4c62-9902-797f04aee252/api";

// Función principal para cargar y procesar la gráfica
async function loadChart() {
  try {
    // 1. Cargar datos de la API
    const response = await fetch(API_URL);
    const rawData = await response.json();

    console.log("Datos brutos:", rawData);

    // 2. Extraer el array de registros
    const records = rawData.result.records;

    // 3. Filtrar datos: solo accidentes en Antioquia con motocicletas
    const filteredData = records.filter(item => {
      const depto = item.departamento?.toUpperCase() || '';
      const vehiculo = item.tipo_vehiculo?.toUpperCase() || '';
      return depto.includes("ANTIOQUIA") && vehiculo.includes("MOTOCICLETA");
    });

    console.log("Datos filtrados:", filteredData);

    // 4. Si no hay datos, usar datos de demostración
    if (filteredData.length === 0) {
      console.warn("Usando datos demo");
      showDemoChart();
      return;
    }

    // 5. Procesar datos reales
    processData(filteredData);

  } catch (error) {
    console.error("Error cargando datos:", error);
    showDemoChart();
  }
}

// Procesar los datos filtrados para graficar
function processData(data) {
  const years = data.map(item => item.año || "Sin año");
  const deaths = data.map(item => {
    const num = parseInt(item.total_muertes || "0");
    return isNaN(num) ? 0 : num;
  });

  console.log("Años:", years);
  console.log("Muertes:", deaths);

  createChart(years, deaths);
}

// Crear la gráfica
function createChart(labels, values) {
  const ctx = document.getElementById('myChart').getContext('2d');

  if (chart) chart.destroy(); // Destruir el gráfico anterior si existe

  const baseColors = ['rgb(150, 4, 36)', 'rgba(250, 158, 37, 0.7)'];
  const backgroundColors = values.map((_, i) => baseColors[i % baseColors.length]);
  const borderColors = backgroundColors.map(color => color.replace('0.7', '1'));

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Muertes en Moto (Antioquia)',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Mostrar un gráfico de demostración si falla la carga
function showDemoChart() {
  const demoData = [
    { año: "2020", total_muertes: "15" },
    { año: "2021", total_muertes: "20" }
  ];
  processData(demoData);
}

// Cambiar tipo de gráfico dinámicamente
document.getElementById('tipoGrafico').addEventListener('change', (e) => {
  if (chart) {
    chart.config.type = e.target.value;
    chart.update();
  }
});

// Iniciar cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', loadChart);

document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.fa-search');
  const searchBox = document.getElementById('search-box');
  const searchInput = document.getElementById('search-input');

  // Mostrar/ocultar caja de búsqueda al hacer clic en la lupa
  searchIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que se cierre al hacer clic en la lupa
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
      searchBox.style.display = 'flex';
      searchInput.focus();
    } else {
      searchBox.style.display = 'none';
    }
  });

  // Buscar al presionar Enter
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  });

  // Función para buscar
  window.performSearch = function() {
    const query = searchInput.value.trim();
    if (query) {
      alert('Buscando: ' + query);
    }
  };

  // Cerrar búsqueda al hacer clic fuera del cuadro
  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && e.target !== searchIcon) {
      searchBox.style.display = 'none';
    }
  });
});

// Simulación de función carrito (opcional)
function toggleCart() {
  alert('Carrito abierto');
}