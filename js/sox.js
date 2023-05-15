const soxCommand = require('sox-audio');

const convertirAudio = () => {

    return new Promise((resolve, reject) => {

        const command = soxCommand()
            .input('audio/mp3/citas.mp3')
            .output('audio/gsm/citas.gsm');
        
        command.on('end', function(){
            resolve('Sox command succeeded')
        });

        command.run();
    })
}

module.exports = convertirAudio;