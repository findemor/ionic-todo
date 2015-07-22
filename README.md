# ionic creator

## crear app movil

Actualizar ionic y cordova

> npm update -g ionic cordova

En la carpeta en la que vamos a crear el proyecto, descargamos desde creator

> ionic start myTodoApp creator:7c34bc7eebf9

Abrimos el servidor web de ionic

> ionic serve

## crear app server

En la carpeta del proyecto

> npm init

preparamos las dependencias

> npm install --save express body-parser morgan mongodb

## ejecutar

### emulacion

> ionic platform add android  
> ionic build android  
> phonegap run android -e

### en dispositivo

> adb devices  
> phonegap run android --device=<device-code-here>  

# Enlaces

* [ionic-creator](http://creator.ionic.io)
* [tutorial ionic-creator](http://thejackalofjavascript.com/ionic-creator-beta/)
* [configurar SO android](http://revolucion.mobi/2014/02/11/guia-instalacion-android-sdk/)
