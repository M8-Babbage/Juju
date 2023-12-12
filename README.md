# Juju - Rick & Morty

## Tabla de contenidos

1. [Informacion](#información)
2. [Tecnologias](#tecnologías)
3. [Ejecución](#ejecución)
4. [Tests](#tests)

## Información

Este proyecto está creado con el framework Angular 17, "Usanto tanto sintaxis de control flow como directivas", uso de reactividad en formularios, peticiones http, implementación de responsive y consumo de la API Rest de [Rick & Morty](https://rickandmortyapi.com/documentation), no se implementó ninguna librería externa para el desarrollo del aplicativo.

Estoy implementando:

Implementación de loader mientras se realiza la petición al backend.

Conventional commits para crear los commits. [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

Git Flow para crear una estrategia de ramas. [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/), "solo trabajé con main pero conozco el flujo de trabajo, feature/fix/release".

Semver para crear el versionamiento. [Semver](https://semver.org/).

Truncado de texto en las cards.

Variables de CSS un mejor mantenimiento o implementaciones de modos oscuros.

Implementación de Github Page para hacer deploy implementando un Hash Routing "ya que las rutas son manejadas desde el cliente".

Implementación de animaciones generadas con Animista.

Implementación de iconos svg manipulados como fuentes usando Icomoon.

## Tecnologías

Lista de tecnologías usadas en el proyecto

- [Node JS](https://nodejs.org/en/): Version v20.9.0
- [Angular](https://www.npmjs.com/package/@angular/cli): Version v17.0.0

## Ejecución

Una pequeña intro sobre la instalación.

1. Clone el repositorio: `git clone https://github.com/M8-Babbage/Juju`
2. Entre en la carpeta Juju: `cd Juju`
3. Instale las dependencias: `npm install`.
4. Ejecute en modo desarrollo: `npx ng serve`

## Tests

Para ver la cobertura de los test ejecutar los pasos anteriores sobre ejecución, el siguiente comando proporcionará las estadísticas de cobertura de los test, además, se generará una carpeta llamada coverage en el cual se podría navegar para revisar más a fondo la cobertura.

1. Ejecutar `npm run test`

![Coverage](https://github.com/M8-Babbage/juju/blob/main/src/assets/images/coverage.png)
