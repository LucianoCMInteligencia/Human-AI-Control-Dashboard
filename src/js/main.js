/* ============================================
   Main.js - Lógica principal de la Dashboard
   Router SPA, gestión de eventos, renderizado
   dinámico y control de módulos
   ============================================ */

class Dashboard {
    constructor() {
        this.currentPage = 'home';
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    // Inicialización
    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupRouter();
        this.updateTime();
        this.renderHome();
        this.initCharts();
        setInterval(() => this.updateTime(), 1000);
    }

    // ---- CONFIGURACIÓN DE TEMA ----
    setupTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-theme');
            const themeIcon = document.getElementById('themeToggle');
            if (themeIcon) themeIcon.textContent = '☀️';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        document.body.classList.toggle('light-theme');
        
        const themeIcon = document.getElementById('themeToggle');
        if (themeIcon) {
            themeIcon.textContent = this.theme === 'light' ? '☀️' : '🌙';
        }
    }

    // ---- CONFIGURACIÓN DE EVENTOS ----
    setupEventListeners() {
        // Botón de tema
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Botón Override
        const overrideBtn = document.getElementById('overrideBtn');
        if (overrideBtn) {
            overrideBtn.addEventListener('click', () => this.triggerOverride());
        }

        // Avatar de usuario
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.addEventListener('click', () => this.showUserProfile());
        }

        // Filtros de streams
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterStreams(e.target.dataset.filter));
        });

        // Sliders de configuración
        const autonomySlider = document.getElementById('autonomySlider');
        if (autonomySlider) {
            autonomySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.querySelector('.setting-value').textContent = value + '%';
                localStorage.setItem('autonomyLevel', value);
            });
        }

        const approvalSlider = document.getElementById('approvalSlider');
        if (approvalSlider) {
            approvalSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.querySelectorAll('.setting-value')[1].textContent = value + '%';
                localStorage.setItem('approvalLevel', value);
            });
        }
    }

    // ---- ROUTER SPA ----
    setupRouter() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const route = item.dataset.route;
                this.navigate(route);
            });
        });

        // Manejo de navegación por hash
        window.addEventListener('hashchange', () => {
            const route = window.location.hash.substring(1) || 'home';
            this.navigate(route);
        });
    }

    navigate(route) {
        // Actualizar página activa
        this.currentPage = route;

        // Actualizar nav activo
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.route === route) {
                item.classList.add('active');
            }
        });

        // Ocultar todas las páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Mostrar página correspondiente
        const pageElement = document.getElementById(`page-${route}`);
        if (pageElement) {
            pageElement.classList.add('active');
        }

        // Actualizar título
        const titles = {
            home: 'Panel de Control',
            streams: 'Streams en Vivo',
            programming: 'Programación de Publicaciones',
            analytics: 'Analítica y Reportes',
            settings: 'Ajustes del Sistema'
        };
        document.querySelector('.page-title').textContent = titles[route] || 'Dashboard';

        // Actualizar window.location.hash
        window.location.hash = route;

        // Renderizar contenido según la página
        switch (route) {
            case 'home':
                this.renderHome();
                break;
            case 'streams':
                this.renderStreams('all');
                break;
            case 'programming':
                this.renderProgramming();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    // ---- RENDERIZADO DE PÁGINAS ----

    renderHome() {
        // Renderizar insights
        const insightsContainer = document.getElementById('insightsContainer');
        if (insightsContainer) {
            insightsContainer.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const insight = getRandomInsight();
                const item = document.createElement('div');
                item.className = 'insight-item';
                item.innerHTML = `
                    <strong>Insight ${i + 1}:</strong><br>
                    ${insight}
                `;
                insightsContainer.appendChild(item);
            }
        }
    }

    renderStreams(filter) {
        const streamsContainer = document.getElementById('streamsContainer');
        const streams = filterStreams(filter);

        streamsContainer.innerHTML = '';
        streams.forEach(stream => {
            const card = document.createElement('div');
            card.className = 'stream-card';
            card.innerHTML = `
                <div class="stream-header">
                    <div class="stream-avatar">${stream.author.charAt(0)}</div>
                    <div class="stream-info">
                        <div class="stream-author">${stream.author}</div>
                        <div class="stream-type">${stream.type}</div>
                    </div>
                    <div class="stream-timestamp">${stream.timestamp}</div>
                </div>
                <div class="stream-content">${stream.content}</div>
                <div class="stream-footer">
                    <span>❤️ ${stream.reactions}</span>
                    <span>💬 Responder</span>
                    <span>📤 Compartir</span>
                </div>
            `;
            streamsContainer.appendChild(card);
        });
    }

    renderProgramming() {
        // Renderizar calendario
        const calendarElement = document.getElementById('calendar');
        const calendarData = getCalendarEvents();
        
        calendarElement.innerHTML = '';
        const daysInMonth = new Date(calendarData.currentYear, calendarData.currentMonth, 0).getDate();
        
        // Encabezados de días
        const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'];
        dayLabels.forEach(label => {
            const headerDay = document.createElement('div');
            headerDay.className = 'calendar-day';
            headerDay.style.fontWeight = 'bold';
            headerDay.textContent = label;
            calendarElement.appendChild(headerDay);
        });

        // Días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // Verificar si tiene eventos
            const eventDay = calendarData.daysWithEvents.find(d => d.day === day);
            if (eventDay && eventDay.hasEvents) {
                dayElement.classList.add('has-events');
            }

            calendarElement.appendChild(dayElement);
        }

        // Renderizar publicaciones programadas
        const scheduledList = document.getElementById('scheduledList');
        const scheduled = getScheduledPosts();
        
        scheduledList.innerHTML = '';
        scheduled.forEach(item => {
            const scheduledItem = document.createElement('div');
            scheduledItem.className = 'scheduled-item';
            scheduledItem.innerHTML = `
                <div class="scheduled-item-time">${item.date} - ${item.time}</div>
                <div class="scheduled-item-title">${item.title}</div>
                <div class="scheduled-item-desc">${item.description}</div>
            `;
            scheduledList.appendChild(scheduledItem);
        });
    }

    renderAnalytics() {
        // Gráfico de actividad
        this.drawActivityChart();
        // Gráfico de categorías
        this.drawCategoryChart();
    }

    renderSettings() {
        // Obtener y mostrar última actualización
        const lastUpdate = document.getElementById('lastUpdate');
        if (lastUpdate) {
            lastUpdate.textContent = getFormattedDate();
        }

        // Cargar valores guardados
        const autonomySlider = document.getElementById('autonomySlider');
        const approvalSlider = document.getElementById('approvalSlider');
        
        const savedAutonomy = localStorage.getItem('autonomyLevel');
        const savedApproval = localStorage.getItem('approvalLevel');
        
        if (savedAutonomy && autonomySlider) {
            autonomySlider.value = savedAutonomy;
        }
        if (savedApproval && approvalSlider) {
            approvalSlider.value = savedApproval;
        }
    }

    // ---- GRÁFICOS ----
    initCharts() {
        // Los gráficos se inicializan cuando se navega a analytics
    }

    drawActivityChart() {
        const canvas = document.getElementById('activityChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const chartData = getActivityChartData();
        
        // Dimensiones
        const padding = 40;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        // Limpiar canvas
        ctx.fillStyle = 'rgba(10, 15, 31, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Encontrar máximo valor
        const maxValue = Math.max(...chartData.data);
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();

        // Dibujar línea del gráfico
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 2;
        ctx.beginPath();

        chartData.data.forEach((value, index) => {
            const x = padding + (index / (chartData.data.length - 1)) * chartWidth;
            const y = canvas.height - padding - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();

        // Dibujar puntos
        ctx.fillStyle = '#7B61FF';
        chartData.data.forEach((value, index) => {
            const x = padding + (index / (chartData.data.length - 1)) * chartWidth;
            const y = canvas.height - padding - (value / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Etiquetas en X
        ctx.fillStyle = 'rgba(168, 160, 160, 0.8)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        chartData.labels.forEach((label, index) => {
            const x = padding + (index / (chartData.labels.length - 1)) * chartWidth;
            ctx.fillText(label, x, canvas.height - padding + 20);
        });
    }

    drawCategoryChart() {
        const canvas = document.getElementById('categoryChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const chartData = getCategoryChartData();
        
        // Limpiar canvas
        ctx.fillStyle = 'rgba(10, 15, 31, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 70;

        const colors = ['#00E5FF', '#7B61FF', '#10B981', '#F59E0B'];
        
        let currentAngle = -Math.PI / 2;
        const total = chartData.data.reduce((a, b) => a + b, 0);

        chartData.data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            // Dibujar slice
            ctx.fillStyle = colors[index] || colors[0];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Dibujar etiqueta
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

            ctx.fillStyle = '#1A2238';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(chartData.labels[index], labelX, labelY);
            ctx.fillText(value, labelX, labelY + 15);

            currentAngle += sliceAngle;
        });

        // Leyenda
        ctx.fillStyle = 'rgba(168, 160, 160, 0.8)';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        chartData.labels.forEach((label, index) => {
            const y = 20 + index * 20;
            ctx.fillStyle = colors[index] || colors[0];
            ctx.fillRect(10, y, 12, 12);
            ctx.fillStyle = 'rgba(168, 160, 160, 0.8)';
            ctx.fillText(label + ': ' + chartData.data[index], 30, y + 10);
        });
    }

    // ---- FUNCIONES DE CONTROL ----

    triggerOverride() {
        const message = '🛑 CONTROL HUMANO ACTIVADO\n\nSe ha iniciado un override manual del sistema. El operador humano toma el control total.';
        alert(message);
        
        // Aquí se podría enviar una notificación o realizar una acción
        console.log('Override activado por operador humano');
    }

    showUserProfile() {
        alert('👤 Perfil de Usuario\n\nNombre: Operador Principal\nNivel: Administrador\nÚltimo acceso: Ahora');
    }

    filterStreams(filter) {
        // Actualizar botones activos
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Renderizar streams filtrados
        this.renderStreams(filter);
    }

    updateTime() {
        const timeElement = document.getElementById('footerTime');
        if (timeElement) {
            timeElement.textContent = getCurrentTime();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});
