const SoxCommand = require('sox-audio');

const convertirAudio = () => {
  return new Promise((resolve, reject) => {
    const command = SoxCommand()
      .input(__dirname + '/citas.mp3')
      .output('/home/jdcarvajal/ari-apps/cita-ivr/audio/citas.gsm')
      .outputFileType('gsm')  // Especifica el tipo de archivo de salida como GSM
      .outputSampleRate(8000) // Especifica la frecuencia de muestreo como 8000Hz
      .outputChannels(1);     // Especifica el número de canales como 1

    command.on('prepare', function (args) {
      console.log('Preparing sox command with args ' + args.join(' '));
    });

    command.on('start', function (commandLine) {
      console.log('Spawned sox with command ' + commandLine);
    });

    command.on('progress', function (progress) {
      console.log('Processing progress: ', progress);
    });

    command.on('error', function (err, stdout, stderr) {
      console.log('Cannot process audio: ' + err.message);
      console.log('Sox Command Stdout: ', stdout);
      console.log('Sox Command Stderr: ', stderr);
      // reject(err);
    });

    command.on('end', function () {
      resolve('Sox command succeeded!');
    });

    command.run();
  });
};

module.exports = convertirAudio;
