const googleTTS = require('gtts');

const generarAudio = ( texto ) => {

    const tts = googleTTS(texto, 'es');

    return new Promise( (resolve, reject) => {

        tts.save('audio/mp3/citas.mp3', function(err, result) {

            if(err) return resolve(err)
            resolve('Texto a Voz convertido');
        });
    });
}

module.exports = generarAudio;