[Readme in English](README.md) 

# Sistema de citas para una clínica

Este es un proyecto de sistema de citas para una clínica. Permite a los usuarios obtener información sobre las citas disponibles a través de llamadas telefónicas utilizando Asterisk ARI. La aplicación utiliza Google Text-to-Speech (TTS) para generar mensajes de audio y SoX para convertir los archivos de audio al formato requerido por Asterisk. La información de las citas se almacena en una base de datos MySQL.

## Instalación

1. Clona el repositorio del proyecto desde GitHub:
```
git clone https://github.com/tu-usuario/sistema-citas-clinica.git

```

2. Instala las dependencias ejecutando el siguiente comando en la carpeta del proyecto:

```
npm install

```
3. Asegúrate de tener Asterisk instalado y configurado correctamente en tu servidor.

4. Crea una base de datos MySQL llamada 'clinic' y asegúrate de tener las credenciales correctas en el archivo de configuración app.js

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar los siguientes parámetros:

1. Actualiza la configuración de conexión MySQL en el archivo app.js con las credenciales correctas (host, user, password).

2. Verifica que la ruta del archivo de audio en el archivo app.js sea correcta y accesible en tu servidor.

3. Ajusta las consultas SQL en el archivo app.js según la estructura de tu tabla de citas en la base de datos.

## Uso

1. Inicia la aplicación ejecutando el siguiente comando:

```
node app.js
```
2. Asegúrate de que Asterisk esté en funcionamiento y configurado para usar ARI.

3. Realiza una llamada a la extensión configurada para el sistema de citas.

4. Se reproducirá un mensaje de audio con las citas disponibles. El mensaje de audio se generará utilizando Google TTS y se convertirá al formato requerido por Asterisk (.gsm) utilizando SoX.

## Contribuciones

Este proyecto ha sido desarrollado como parte de un curso académico y no aceptamos contribuciones externas. Sin embargo, si encuentra algún error o problema en la aplicación, puede informarlo a través de los issues en este repositorio.
