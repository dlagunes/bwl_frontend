# ProyectoBWL

## Instalaciones recomendadas:

NodeJS
https://nodejs.org/es/
Visual Studio Code
https://code.visualstudio.com/
PostMan
https://www.getpostman.com/
AngularCLI
https://cli.angular.io/


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development server

Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Despliegue en Firebase
Crear cuenta de firebase. Crear proyecto. En el apartado Desarrollo selecciona hosting y sigue el tutorial.

Pasos para firebase functions
Instalar herramientas de Firebase:

en abrir terminar Mac/Linux: `sudo npm install -g firebase-tools`

en Windows abrir la cmd como administrardor y corre: `npm install -g firebase-tools`

Correr el comando: `firebase login`
he ingresa tus datos de usuario de firebase.

Correr el comando: `firebase init`
    selecciona hosting con la tecla space y enter para guardar la selección.

Despues te preguntará `What do you want to use as your public directory` ./dist/proyectoBWL

Configure as a single-page app (rewrite all urls to /index.html)? (y/N)  N

? File ./dist/goty/index.html already exists. Overwrite? No

run ´ng build --prod´

Correr el comando: `firebase deploy`