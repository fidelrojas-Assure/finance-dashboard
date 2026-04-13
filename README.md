# Finance Dashboard

Panel personal de finanzas construido con **React**, **Vite** y **Tailwind CSS v4**. Incluye tema oscuro, tarjetas con estilo *glassmorphism*, datos mock realistas y gráficos derivados de esas transacciones.

## Demo en vivo

Instancia publicada en Vercel: [https://finance-dashboard-rosy-xi.vercel.app/](https://finance-dashboard-rosy-xi.vercel.app/)

## Características

- **Resumen**: saldo total (libro + flujo del periodo), ingresos y gastos en una ventana móvil de **30 días**.
- **Gráfico de barras**: gastos agrupados por **semana** (lunes a domingo), calculados a partir de las transacciones del periodo.
- **Movimientos recientes**: lista ordenada por fecha con categorías e iconos.
- **Insights**: consejos estáticos según patrones de gasto (sin API externa).
- **UI**: Lucide React, Chart.js / react-chartjs-2, tipografías DM Sans y Outfit.

## Requisitos

- [Node.js](https://nodejs.org/) 20+ (recomendado la LTS actual).

## Instalación y uso

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

## Scripts

| Comando        | Descripción                          |
| -------------- | ------------------------------------ |
| `npm run dev`  | Servidor de desarrollo con HMR       |
| `npm run build` | Compilación para producción (`dist/`) |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | ESLint sobre el proyecto             |

## Estructura del código

```
src/
  App.jsx                 # Layout y cableado de datos derivados
  components/             # Tarjetas, gráfico, lista, insights, GlassCard
  data/financeData.js     # Transacciones mock (fechas relativas a “hoy”)
  utils/financeDerived.js # Filtro 30 días, agregación semanal, resumen
  utils/insights.js       # Reglas para los textos de “AI insights”
```

Los datos viven en `financeData.js`: **10 transacciones** de ejemplo (categorías como Food, Transport, Entertainment, Utilities, Health e Income). `financeDerived.js` filtra los últimos 30 días, suma ingresos/gastos y alimenta el gráfico y el resumen de forma **dinámica**.

## Stack técnico

- [Vite](https://vite.dev/) 8 · [React](https://react.dev/) 19  
- [Tailwind CSS](https://tailwindcss.com/) 4 con [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite)  
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)  
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)  

## Personalización

- Ajusta montos, categorías o número de filas en `src/data/financeData.js`.
- Cambia la ventana de análisis con `WINDOW_DAYS` en `src/utils/financeDerived.js`.
- Modifica umbrales y mensajes de insights en `src/utils/insights.js`.

---

Proyecto de demostración; sustituye los mocks por una API o persistencia real cuando integres backend.
