// Configuración global
let chart = null;
const API_URL = "https://www.datos.gov.co/resource/th2j-fh7f.json";

// Función principal
async function loadChart() {
  try {
    // 1. Cargar datos
    const response = await fetch(API_URL);
    const rawData = await response.json();
    
    console.log("Datos brutos:", rawData); // Verifica en consola

    // 2. Filtrar datos (versión robusta)
    const filteredData = rawData.filter(item => {
      const depto = item.departamento_nombre?.toUpperCase() || '';
      const vehiculo = item.clase?.toUpperCase() || '';
      return depto.includes("ANTIOQUIA") && vehiculo.includes("MOTOCICLETA");
    });

    console.log("Datos filtrados:", filteredData);

    // 3. Si no hay datos, mostrar demo
    if (filteredData.length === 0) {
      console.warn("Usando datos demo");
      showDemoChart();
      return;
    }

    // 4. Procesar datos reales
    processData(filteredData);
    
  } catch (error) {
    console.error("Error:", error);
    showDemoChart(); // Mostrar gráfico demo en caso de error
  }
}

function processData(data) {
  // Extraer años y valores
  const years = data.map(item => item.año || "Año no especificado");
  const deaths = data.map(item => {
    const num = parseInt(item.total_muertes || "0");
    return isNaN(num) ? 0 : num;
  });

  console.log("Años:", years);
  console.log("Muertes:", deaths);

  // Crear gráfico
  createChart(years, deaths);
}

function createChart(labels, values) {
  const ctx = document.getElementById('myChart').getContext('2d');

  // Destruir gráfico anterior si existe
  if (chart) chart.destroy();

  // Generar colores dinámicos
  const baseColors = [
    'rgb(150, 4, 36)',
    'rgba(250, 158, 37, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(7, 153, 250, 0.7)'
  ];

  const backgroundColors = values.map((_, i) => baseColors[i % baseColors.length]);
  const borderColors = backgroundColors.map(color => color.replace('0.7', '1'));

  // Crear el gráfico con colores individuales por barra
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Muertes en moto (Antioquia)',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Función de respaldo (si no hay datos)
function showDemoChart() {
  const demoData = [
    { año: "2020", total_muertes: "15" },
    { año: "2021", total_muertes: "20" }
  ];
  processData(demoData);
}

// Event listeners
document.getElementById('tipoGrafico').addEventListener('change', (e) => {
  if (chart) {
    chart.config.type = e.target.value;
    chart.update();
  }
});

// Iniciar al cargar la página
document.addEventListener('DOMContentLoaded', loadChart);