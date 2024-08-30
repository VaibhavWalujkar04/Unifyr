// backend/utils/vector_utils.js
const { spawn } = require('child_process');

async function generateVectors(basicInfo) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['utils/embeddings.py', JSON.stringify(basicInfo)]);
    
    pythonProcess.stdout.on('data', (data) => {
      resolve(JSON.parse(data.toString()));
    });

    pythonProcess.stderr.on('data', (data) => {
      reject(data.toString());
    });
  });
}

module.exports = { generateVectors };
