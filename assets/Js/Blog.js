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
  
  // Destruir gráfico anterior
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Muertes en moto (Antioquia)',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
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