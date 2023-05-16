const soxCommand = require('sox-audio');

const convertirAudio = (inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
      const command = soxCommand()
        .input(inputFilePath)
        .output(outputFilePath)
        .outputFileType('gsm');
  
      command.on('end', function () {
        resolve('Sox command succeeded');
      });
  
      command.on('error', function (err) {
        reject(err);
      });
  
      command.run();
    });
};
  
module.exports = convertirAudio;
