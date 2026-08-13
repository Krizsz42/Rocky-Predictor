# Segmentación del Código - Rocky Predictor

## Resumen
El código ha sido segmentado para facilitar su mantenimiento y edición:

### Antes:
- `engine.js`: 5,825 líneas (monolítico)
- `index.html`: 3,340 líneas (con CSS y JS inline)

### Después:
- `engine.js`: ~90 líneas (loader de módulos)
- `index.html`: ~345 líneas (solo estructura HTML)
- `styles.css`: 615 líneas
- `js/inline_scripts.js`: 2,388 líneas (scripts específicos de UI)

## Módulos Creados (`js/modules/`)

| Archivo | Líneas | Responsabilidad |
|---------|--------|----------------|
| `teams_data.js` | ~310 | Datos de selecciones, clubes, banderas, utilidades |
| `competitions.js` | ~286 | Ligas, competiciones, clásicos/derbis |
| `match_engine.js` | ~63 | Modelo Dixon-Coles, simulación de partidos |
| `ui_functions.js` | ~515 | Funciones de interfaz, cálculos, imágenes |
| `team_picker.js` | ~60 | Selector visual de equipos |
| `history_learning.js` | ~808 | Historial, aprendizaje, búsqueda de resultados |
| `bracket_system.js` | ~1,645 | Sistema de torneos, bracket, en vivo |
| `idolo_career.js` | ~2,188 | Modo Ídolo/Carrera completo |

## Estructura de Archivos

```
/workspace/
├── index.html (345 líneas)           # Solo estructura HTML
├── styles.css (615 líneas)           # Todo el CSS separado
├── engine.js (~90 líneas)            # Loader de módulos
├── js/
│   └── modules/
│       ├── teams_data.js             # Datos + utilidades
│       ├── competitions.js           # Ligas y competiciones
│       ├── match_engine.js           # Motor de simulación
│       ├── ui_functions.js           # Funciones UI
│       ├── team_picker.js            # Selector de equipos
│       ├── history_learning.js       # Historial y ML
│       ├── bracket_system.js         # Torneos
│       └── idolo_career.js           # Modo carrera
└── js/inline_scripts.js              # Scripts inline restantes
```

## Ventajas

1. **Más fácil de editar**: Cada módulo tiene una responsabilidad clara
2. **Menos conflictos**: Diferentes personas pueden trabajar en módulos distintos
3. **Debugging más simple**: Errores localizados por módulo
4. **Carga modular**: Los scripts se cargan en orden de dependencia
5. **Mantenibilidad**: Cambios en un módulo no afectan a los demás

## Cómo Editar

- **Datos de equipos**: `js/modules/teams_data.js`
- **Reglas de simulación**: `js/modules/match_engine.js`
- **Interfaz/UI**: `js/modules/ui_functions.js` o `js/inline_scripts.js`
- **Modo Carrera**: `js/modules/idolo_career.js`
- **Estilos**: `styles.css`
- **Estructura HTML**: `index.html`

## Notas

- El archivo `index_old.html` contiene la versión original completa (backup)
- Los módulos se cargan automáticamente al abrir `index.html`
- Las variables globales están declaradas en `engine.js`
