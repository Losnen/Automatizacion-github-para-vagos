# Automatización de Github para Vagos

## ¿Que hace?

Automatización de github para vagos es una herramienta que salió de este pequeño [script en python](https://github.com/Chinegua/automatizaci-n-github-para-vagos) que diseñó Aitor para ahorrarse los tres comandos necesarios para pushear. A partir de esa idea diseñamos esta herramienta que se instala mediante el comando :

``` npm install -g automatizacion-github-para-vagos```

Esta herramienta sirve para realizar algunas tareas básicas de github desde la línea de comandos, como crear un repo, pushear, crear un gist, debajo puedes ver la lista de opciones.

## Instrucciones

* ``` automatizacion-vagos -i ``` Genera el token con los permisos necesarios para usar la herramienta.
* ``` automatizacion-vagos -r [mi-repo] ``` Crea el repositorio *mi-repo*
* ``` automatizacion-vagos -b [mi-repo] ``` Borra el repositorio *mi-repo*
* ``` automatizacion-vagos -g [file.js] ``` Crea el gist con el fichero ```file.js```. Para subir el fichero es necesario crear un directorio ``` gist/ ``` con el fichero ``` file.js ```.
* ``` automatizacion-vagos -c [mi-repo] ``` Muestra los colaboradores de *mi-repo*
* ``` automatizacion-vagos -l [mi-repo] ``` Muestra los commits de *mi-repo*
* ``` automatizacion-vagos -m [mi-repo] ``` Muestra las ramas y hace la comparacion entre dos ramas de *mi-repo*
* ``` automatizacion-vagos -f [user/repo] ``` Hace un fork del repositorio *user/repo*
* ``` automatizacion-vagos -u [user] ``` Muestra la info del usuario  *user*
* ``` automatizacion-vagos -o  ``` Muestra las organizaciones a las que pertenece el usuario
* ``` automatizacion-vagos -a [commit] ``` Ejecuta git add, git commit y git push en un solo paso
* ``` automatizacion-vagos -v ``` Muestra la versión
* ``` automatizacion-vagos -h ``` Muestra la ayuda.

## Opciones del plugin para generar el PDF y subirlo a dropbox

* Ejecutar ```npm i -S subir-nube-vagos```
* ``` automatizacion-vagos -d -e ``` Genera un documento pdf a partir del README.md
* ``` automatizacion-vagos -d -p``` Sube el documento pdf a dropbox

## Autores

1. [Aitor Bernal Falcón](http://chinegua.github.io/)
2. [Samuel Ramos Barroso](http://losnen.github.io/)
3. [Joshua Pérez García](http://joshuape.github.io/)

## Repositorio

* [Repositorio de entrega](https://github.com/ULL-ESIT-SYTW-1617/proyecto-sytw-16-17-aitor-joshua-samuel)
* [Enlace a NPM del paquete](https://www.npmjs.com/package/automatizacion-github-para-vagos)
