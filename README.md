# Human-AI Control Dashboard 🤖👤

Una plataforma futurista estilo IA supervisada por humanos, diseñada como un panel de control intuitivo donde la IA procesa información pero **los humanos siempre toman las decisiones finales**.

## 🎯 Características Principales

### Diseño Visual
- **Glassmorphism**: Tarjetas con efecto vidrio translúcido con blur
- **Tema Dual**: Modo oscuro (default) y modo claro
- **Colores Neón**: Cyan (#00E5FF) y Púrpura (#7B61FF) con fondo oscuro profesional
- **100% Responsive**: Mobile-first, adaptado a todos los tamaños de pantalla
- **Animaciones Sutiles**: Transiciones smooth y efectos hover dinámicos

### Módulos Funcionales

1. **Home - Panel de Control**
   - Indicadores de estado del sistema
   - Últimas acciones de control humano
   - Insights de IA generados (supervisados)
   - Dashboard visual con métricas clave

2. **Streams en Vivo**
   - Monitoreo de actividad en tiempo real
   - Filtros por categoría (Mensajes, Menciones, Actividad)
   - Tarjetas dinámicas con información detallada
   - Timestamps relativos

3. **Programación**
   - Calendario visual integrado
   - Publicaciones programadas con detalles
   - Vista de próximas tareas
   - Estados de ejecución

4. **Analítica**
   - Gráfico de línea: Actividad por hora
   - Gráfico circular: Distribución de categorías
   - Métricas clave (Engagement, Alcance, Conversiones)
   - Indicadores de cambio positivo/negativo

5. **Ajustes**
   - Control de autonomía de IA (0-100%)
   - Umbral de aprobación humana
   - Configuración de notificaciones
   - Información del sistema

## 📁 Estructura del Proyecto

```
Human-AI-Control-Dashboard/
├── index.html                 # HTML5 semántico completo
├── README.md                  # Este archivo
├── src/
│   ├── css/
│   │   └── style.css         # Estilos con variables CSS
│   └── js/
│       ├── main.js           # Lógica principal y router SPA
│       └── data.js           # Datos simulados en JSON
└── assets/                    # (Carpeta para recursos futuros)
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Marcado semántico limpio
- **CSS3**: Variables, Flexbox, Grid, Media Queries
- **JavaScript Vanilla**: Sin frameworks (modular y limpio)
- **Canvas API**: Para renderizado de gráficos
- **LocalStorage**: Para persistencia de preferencias

## 🎨 Características Técnicas

### CSS Variables
```css
--color-primary: #00E5FF        /* Cyan principal */
--color-secondary: #7B61FF      /* Púrpura */
--color-dark: #0A0F1F           /* Fondo oscuro */
--glass-color: rgba(26, 34, 56, 0.6)  /* Efecto vidrio */
```

### Glassmorphism
- Backdrop filter con blur(10px)
- Bordes translúcidos
- Fondo semi-transparente
- Sombras suaves

### Router SPA
Sistema de enrutamiento simple sin librerías:
- Navegación sin recargas
- Hash-based routing (#home, #streams, etc.)
- Transiciones suaves entre páginas
- Estados activos sincronizados

## 📱 Responsive Design

- **Desktop** (1025px+): Sidebar expandido, layout completo
- **Tablet** (769-1024px): Ajustes de grid
- **Mobile** (481-768px): Sidebar colapsado, navegación simplificada
- **Mobile pequeño** (≤480px): Interfaz comprimida, single-column

## 🚀 Cómo Usar

### Local
1. Descargar o clonar el proyecto
2. Abrir `index.html` en navegador (no requiere servidor)
3. Navegar por los módulos usando el sidebar o hash URLs

```bash
# Ejemplos de URLs
http://localhost/index.html#home
http://localhost/index.html#streams
http://localhost/index.html#programming
```

### Vercel (Deployment Recomendado)

#### Paso 1: Preparar el proyecto
```bash
# Crear carpeta del proyecto
mkdir Human-AI-Control-Dashboard
cd Human-AI-Control-Dashboard

# Copiar todos los archivos
# (Descargar o copiar los archivos del proyecto)
```

#### Paso 2: Crear archivo `vercel.json`
```json
{
  "buildCommand": "",
  "installCommand": "",
  "outputDirectory": ".",
  "routes": [
    {
      "src": "/(?!.*\\.).*",
      "destination": "/index.html"
    }
  ]
}
```

#### Paso 3: Deploy en Vercel
```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Deploy (requiere cuenta en vercel.com)
vercel

# O conectar el repositorio a GitHub y linkear a Vercel
# a través de https://vercel.com/new
```

#### Paso 4: Configurar GitHub (si usas Git)
```bash
# Inicializar repositorio
git init
git add .
git commit -m "Initial commit: Human-AI Control Dashboard"
git branch -M main
git remote add origin https://github.com/tu-usuario/Human-AI-Control-Dashboard.git
git push -u origin main
```

Luego:
- Ir a https://vercel.com/new
- Seleccionar "Import Git Repository"
- Pegar URL del repo
- Vercel automáticamente detectará el proyecto
- Click en "Deploy"

**URL resultante**: `https://tu-proyecto.vercel.app`

## 🔧 Configuración y Personalización

### Cambiar Colores
Editar variables CSS en `src/css/style.css`:
```css
:root {
    --color-primary: #00E5FF;      /* Cambiar color principal */
    --color-secondary: #7B61FF;    /* Cambiar color secundario */
}
```

### Agregar Nuevos Datos
Editar `src/js/data.js` en el objeto `DATA`:
```javascript
const DATA = {
    streams: [ /* nuevos datos */ ],
    scheduled: [ /* nuevos datos */ ],
    // ... más secciones
};
```

### Agregar Nuevas Páginas
1. Crear sección en `index.html`: `<section id="page-nombre" class="page">`
2. Agregar ruta en sidebar: `<a href="#nombre" data-route="nombre">`
3. Agregar caso en `main.js` en el método `navigate()`

## 📊 Datos Simulados

Todos los datos están almacenados en `data.js` como JSON local:
- **Streams**: 6 entradas de ejemplo
- **Scheduled**: 4 publicaciones programadas
- **Insights**: 4 mensajes de IA simulada
- **Charts**: Datos para gráficos de actividad y categorías
- **Calendar**: Configuración de mes actual con eventos

## 🎭 Tema Claro/Oscuro

El sistema detecta y guarda la preferencia:
- Click en botón 🌙/☀️ en sidebar
- Se guarda en `localStorage` con clave `theme`
- Cambios en CSS variables automáticos

```javascript
// En localStorage
localStorage.getItem('theme')  // 'dark' o 'light'
```

## 🔐 Control Humano - Características de Supervisión

1. **Override Humano**: Botón rojo para control manual inmediato
2. **Indicador IA Online**: Muestra estado del sistema
3. **Parámetros Ajustables**: Control de autonomía y umbrales
4. **Logs de Acciones**: Registro de todas las decisiones humanas
5. **Insights Supervisados**: Recomendaciones de IA esperando aprobación

## 🌐 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Dispositivos**: Desktop, Tablet, Smartphone
- **Tamaños de pantalla**: 320px - 2560px

## 📝 Notas Técnicas

- **Sin dependencias externas**: Código 100% vanilla JavaScript
- **Performance**: Canvas para gráficos (sin Chart.js)
- **Accesibilidad**: Focus states, labels en formularios, ARIA ready
- **SEO**: HTML5 semántico, Meta tags
- **Bundle Size**: ~150KB total (HTML + CSS + JS)

## 🚀 Mejoras Futuras Sugeridas

- [ ] Backend API para datos reales
- [ ] WebSocket para updates en tiempo real
- [ ] Exportar reportes a PDF
- [ ] Sistema de notificaciones push
- [ ] Dark mode con más variaciones de color
- [ ] Autenticación y roles de usuario
- [ ] Base de datos de logs
- [ ] Integración con APIs externas

## 📄 Licencia

Este proyecto es de uso libre y puede ser modificado según necesidades.

## 👨‍💻 Autor

**Human-AI Control Dashboard v1.0**
- Diseño moderno y responsivo
- Enfoque en control humano supervisado
- Estética futurista con glassmorphism
- 100% JavaScript vanilla

---

**¿Preguntas?** Revisa el código comentado en cada archivo para más detalles.

**¡Feliz coding!** 🚀
#   P a n e l   d e   c o n t r o l   d e   I A   h u m a n a  
 