// 'use strict';

// /*
//     Instalar dependencias con npm:
//         1. ari-client
//         2. mysql
//         3. google-tts-api
//         4. sox-audio
//         5. path
        
// */

// const rutaAudioMapu = '/var/lib/asterisk/sounds/custom/citaPrueba';

// const generarAudio = require('./js/googleTTS.js');
// const convertirAudio = require('./js/sox');


// var ari = require('ari-client');
// var mysql = require('mysql');



// // Configuración de la conexión MySQL
// const dbConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'clinic'
// }
// const dbConnection = mysql.createConnection(dbConfig);
// dbConnection.connect(
//     // Función para obtener las citas disponibles
//     function getCitasDisponibles() {
//         return new Promise((resolve, reject) => {
//             const query = 'SELECT * FROM appointments WHERE date >= CURDATE() ORDER BY date, time';
//             dbConnection.query(query, (error, results) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(results);
//                 }
//                 });
//         });
//     }
// );



// ari.connect('http://localhost:8088', 'adminari', '1234', clientLoaded);


// async function clientLoaded(err, client) {
//     if (err) {
//         throw err;
//     }

//     /** Listener Start Stasis */
//     client.on('StasisStart', (event, incoming) => {

//         // Send a Playback
//         incoming.answer((err, channel) => {

//             // Playback
//             play(incoming, 'sound:'+rutaAudioMapu, (err) => {
//                 // Playback Completed - Send a Hangup Channel
//                 incoming.hangup((err) => {
//                 });
//             });
//         });
//     });


//     let text = "hola mundo hola mundo";
//     await generarAudio(text);

//     await convertirAudio();

//     let citasDisponibles =  await getCitasDisponibles();

//     console.log(citasDisponibles);

//     /** Function for Playback a Sound */
//     function play(channel, sound, callback) {
//         var playback = client.Playback();
//         playback.once('PlaybackFinished',
//             function (event, instance) {
//                 if (callback) {
//                     callback(null);
//                 }
//             });
//         channel.play({ media: sound }, playback, (err, playback) => { });
//     }

//     client.start('cita-ivr');
// }

'use strict';

/*
    Instalar dependencias con npm:
        1. ari-client
        2. mysql
        3. google-tts-api
        4. sox-audio
        5. path
        
*/

const rutaAudioMapu = '/var/lib/asterisk/sounds/custom/citasGoogle';

const generarAudio = require('./js/googleTTS.js');
const convertirAudio = require('./js/sox');
const path = require('path');

const ari = require('ari-client');
const mysql = require('mysql');

// Configuración de la conexión MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinic'
};
const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect();

// Función para obtener las citas disponibles
function obtenerCitasDisponibles() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM appointments ORDER BY id';
        dbConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

ari.connect('http://localhost:8088', 'adminari', '1234', clientLoaded);

async function clientLoaded(err, client) {
    if (err) {
        throw err;
    }

    /** Listener Start Stasis */
    client.on('StasisStart', async (event, incoming) => {
        // Send a Playback
        incoming.answer((err, channel) => {
            // Playback
            play(incoming, `sound:${rutaAudioMapu}`, (err) => {
                // Playback Completed - Send a Hangup Channel
                incoming.hangup((err) => {});
            });
        });
    });

    const citas = await obtenerCitasDisponibles();

    let citasDisponibles = '';
    if(citas.length === 0){
        citasDisponibles = 'No hay citas disponibles en este momento';
    }
    else{
        citasDisponibles = 'Las citas disponibles para esta semana son las siguientes: '
        citas.forEach(cita => {
            citasDisponibles += `${cita.date} a las ${cita.time}, `;
        });
          
    }

    await generarAudio(citasDisponibles);

    await convertirAudio();


    /** Function for Playback a Sound */
    function play(channel, sound, callback) {
        const playback = client.Playback();
        playback.once('PlaybackFinished', (event, instance) => {
            if (callback) {
                callback(null);
            }
        });
        channel.play({ media: sound }, playback, (err, playback) => {});
    }

    client.start('cita-ivr');
}
