'use strict';

/*
    Instalar dependencias con npm:
        1. ari-client
        2. mysql
        3. google-tts-api
        4. sox-audio
*/

const rutaAudioMapu = '/var/lib/asterisk/sounds/custom/citas';

const generarAudio = require('./js/googleTTS.js');
const convertirAudio = require('./js/sox');


var ari = require('ari-client');
const path = require('path');



ari.connect('http://localhost:8088', 'adminari', '1234', clientLoaded);


async function clientLoaded(err, client) {
    if (err) {
        throw err;
    }

    /** Listener Start Stasis */
    client.on('StasisStart', (event, incoming) => {

        // Send a Playback
        incoming.answer((err, channel) => {

            // Playback
            play(incoming, 'sound:'+rutaAudioMapu, (err) => {
                // Playback Completed - Send a Hangup Channel
                incoming.hangup((err) => {
                });
            });
        });
    });


    let text = "hola mundo";
    await generarAudio(text);

    // Convertir archivo descargado a formato GSM
    const inputFilePath = path.join(__dirname, './audio/mp3/citas.mp3');
    const outputFilePath = path.join(__dirname, './audio/gsm/citas.gsm');
    await convertirAudio(inputFilePath, outputFilePath);
      

    /** Function for Playback a Sound */
    function play(channel, sound, callback) {
        var playback = client.Playback();
        playback.once('PlaybackFinished',
            function (event, instance) {
                if (callback) {
                    callback(null);
                }
            });
        channel.play({ media: sound }, playback, (err, playback) => { });
    }

    client.start('cita-ivr');
}