# Planes Bíblicos - Estructura Oficial

Este repositorio contiene planes bíblicos estructurados para consumo en aplicaciones (Unity, mobile, web).

## Estructura de un plan

Cada plan sigue este formato:

- id
- title
- subtitle
- estimatedMinutes
- learningPoints[]
- days[]

### Día incluye:

- day
- title
- focusLine
- beforeReading
- references[]
- reflection
- question
- prayer
- action

### references:

- title
- reference
- bookId
- chapter
- startVerse/endVerse o verse

## Estructura del repositorio

```
planes/
  amar_herido.json

index.json
```

## index.json

Archivo para listar planes disponibles.
