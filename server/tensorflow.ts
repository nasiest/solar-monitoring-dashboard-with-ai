import * as tf from '@tensorflow/tfjs';

// Load the pre-trained TensorFlow model
let model: tf.LayersModel | null = null;

async function loadModel() {
  try {
    // Use a relative URL from the Next.js public folder
    model = await tf.loadLayersModel('/model/solar_power_model/model.json');
    console.log('TensorFlow model loaded successfully!');
  } catch (error) {
    console.error('Error loading the TensorFlow model:', error);
  }
}

// Predict solar power using the model
export const predictSolarPower = (timeOfDay: number) => {
  if (!model) {
    throw new Error('Model not loaded');
  }

  // Prepare input tensor (1x1)
  const inputTensor = tf.tensor2d([timeOfDay], [1, 1]);

  // Get the prediction
  const prediction = model.predict(inputTensor) as tf.Tensor;

  return prediction.dataSync()[0];
};

// Load the model on server start
loadModel();



// import * as tf from '@tensorflow/tfjs-node';

// // Load the pre-trained model
// let model: tf.LayersModel | null = null;

// async function loadModel() {
//   model = await tf.loadLayersModel('file://./model/solar_power_model/model.json');
//   console.log('TensorFlow model loaded!');
// }

// // Predict solar power using the model
// export const predictSolarPower = (timeOfDay: number) => {
//   if (!model) {
//     throw new Error('Model not loaded');
//   }

//   const inputTensor = tf.tensor2d([timeOfDay], [1, 1]);
//   const prediction = model.predict(inputTensor) as tf.Tensor;
//   return prediction.dataSync()[0]; // Return the prediction value
// };

// loadModel(); // Load model on server startup
