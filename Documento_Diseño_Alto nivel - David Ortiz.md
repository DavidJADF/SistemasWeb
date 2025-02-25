
# Documento de diseño de alto nivel de sistema "CameraReviews"
---
## Objetivo
Este documento describe la arquitectura y diseño del sistema backend para la predicción de efectivo en cajeros automáticos. El sistema tiene como objetivo optimizar la reposición de efectivo en ATMs, reduciendo costos operativos y evitando desabastecimientos.

## Casos de uso a soportar
El sistema soportará los siguientes casos de uso:
* 
    * Un administrador puede consultar el nivel proyectado de efectivo de un cajero.

    * El sistema generará alertas cuando se prediga un posible desabastecimiento.

    * Se podrá visualizar el historial de predicciones y compararlo con los valores reales.

    * Conexión en tiempo real con SQL Server para recibir datos de transacciones.


## Fuera de alcance
Los siguientes casos de uso no se abordarán en este documento:
* 
    * Registro de usuarios y autenticación de administradores.

    * Predicciones para otras operaciones financieras fuera de la administración de ATMs.


---

## Solución

El sistema utilizará una arquitectura basada en microservicios, con un backend desarrollado en Python y almacenamiento en PostgreSQL. Se integrará con SQL Server para la ingesta de datos en tiempo real.

### Diagrama de arquitectura

### Diagrama de secuencias "Publicación de Review"

### Diagrama de secuencias "Lectura de Review"
---