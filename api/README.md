# Pasos para ejecutar el proyecto

Servicio de la app de manejo de ordenes de Melonn

## Configapp.json

En este archivo se deben llenar los siguientes campos para el correcto funcionamiento del servicio.

```json
"db": {
  "url": "Url de cnx de la base de datos en mongoDB"
},
"melonn": {
  "baseUrl": "Url de la API de Melonn",
  "key": "API KEY de la API de Melonn"
}
```

### `npm run build`

Antes de ejecutar el proyecto, se debe correr este comando para transpilar los archivos y poder lanzar el servicio.

### `npm start`

Comando para lanzar el servicio.
