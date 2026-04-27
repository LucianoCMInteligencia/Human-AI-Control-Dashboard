/* ============================================
   Datos simulados para la dashboard
   JSON local con información para cada módulo
   ============================================ */

const DATA = {
    // Streams de actividad
    streams: [
        {
            id: 1,
            author: "Usuario Alpha",
            type: "mensaje",
            content: "Nueva estrategia de IA aprobada por supervisión humana. Mejora esperada del 25%.",
            timestamp: "hace 5 min",
            category: "messages",
            reactions: 12
        },
        {
            id: 2,
            author: "Sistema IA",
            type: "mención",
            content: "Se menciona a Control Humano en análisis de parámetros críticos",
            timestamp: "hace 12 min",
            category: "mentions",
            reactions: 8
        },
        {
            id: 3,
            author: "Monitor Beta",
            type: "actividad",
            content: "Proceso de validación completado. Requiere confirmación humana.",
            timestamp: "hace 23 min",
            category: "activity",
            reactions: 5
        },
        {
            id: 4,
            author: "Usuario Gamma",
            type: "mensaje",
            content: "Override aplicado correctamente. Sistema estable bajo control.",
            timestamp: "hace 47 min",
            category: "messages",
            reactions: 15
        },
        {
            id: 5,
            author: "Sistema IA",
            type: "mención",
            content: "Reporte de anomalía detectada. Escalando a operador humano.",
            timestamp: "hace 1 h",
            category: "mentions",
            reactions: 9
        },
        {
            id: 6,
            author: "Usuario Delta",
            type: "actividad",
            content: "Protocolo de seguridad verificado. Todos los sistemas bajo supervisión.",
            timestamp: "hace 2 h",
            category: "activity",
            reactions: 7
        }
    ],

    // Tareas programadas
    scheduled: [
        {
            id: 1,
            title: "Análisis de Tendencias",
            description: "Procesamiento de datos de mercado con validación humana",
            date: "2026-04-28",
            time: "09:00",
            status: "pendiente"
        },
        {
            id: 2,
            title: "Reporte Semanal",
            description: "Compilación automática con aprobación requerida",
            date: "2026-04-28",
            time: "14:30",
            status: "pendiente"
        },
        {
            id: 3,
            title: "Optimización de Parámetros",
            description: "Ajuste automático supervisado de variables críticas",
            date: "2026-04-29",
            time: "10:00",
            status: "programado"
        },
        {
            id: 4,
            title: "Auditoría del Sistema",
            description: "Revisión completa de logs y decisiones de IA",
            date: "2026-04-30",
            time: "08:00",
            status: "programado"
        }
    ],

    // Insights de IA (generados pero supervisados)
    insights: [
        "La actividad actual indica un patrón anómalo que requiere confirmación humana antes de actuar.",
        "Se recomienda ajustar parámetros de autonomía. La decisión final corresponde al operador.",
        "Capacidad de procesamiento en 98.5%. Recomendación: mantener supervisión activa.",
        "Detección de dos opciones estratégicas. Se espera input humano para la selección final."
    ],

    // Datos para gráficos
    charts: {
        activity: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            data: [12, 8, 25, 45, 52, 38, 20]
        },
        categories: {
            labels: ['Automático', 'Supervisor', 'Manual', 'Sistema'],
            data: [35, 28, 22, 15]
        }
    },

    // Calendario de eventos
    calendar: {
        currentMonth: 4,
        currentYear: 2026,
        daysWithEvents: [
            { day: 25, hasEvents: true, eventCount: 2 },
            { day: 27, hasEvents: true, eventCount: 1 },
            { day: 28, hasEvents: true, eventCount: 3 },
            { day: 30, hasEvents: true, eventCount: 1 }
        ]
    }
};

// Función para obtener insights aleatorios
function getRandomInsight() {
    const randomIndex = Math.floor(Math.random() * DATA.insights.length);
    return DATA.insights[randomIndex];
}

// Función para filtrar streams
function filterStreams(category) {
    if (category === 'all') {
        return DATA.streams;
    }
    return DATA.streams.filter(stream => stream.category === category);
}

// Función para obtener streams de hoy
function getTodayStreams() {
    return DATA.streams.slice(0, 3);
}

// Función para obtener publicaciones programadas
function getScheduledPosts() {
    return DATA.scheduled;
}

// Función para generar datos de gráfico de línea
function getActivityChartData() {
    return DATA.charts.activity;
}

// Función para generar datos de gráfico de pastel/barras
function getCategoryChartData() {
    return DATA.charts.categories;
}

// Función para obtener días con eventos
function getCalendarEvents() {
    return DATA.calendar;
}

// Función para obtener hora actual formateada
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
}

// Función para obtener fecha formateada
function getFormattedDate() {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return new Date().toLocaleDateString('es-ES', options);
}

// Función para generar datos de ejemplo para un rango de tiempo
function generateTimeSeriesData(days = 7) {
    const data = [];
    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toISOString().split('T')[0],
            value: Math.floor(Math.random() * 100) + 20
        });
    }
    return data;
}
