import * as tf from '@tensorflow/tfjs-node';

// Load the pre-trained TensorFlow model
let model: tf.LayersModel | null = null;

async function loadModel() {
  try {
    model = await tf.loadLayersModel('file://./model/solar_power_model/model.json');
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

  // Prepare input tensor from time of day (you can include more features as needed)
  const inputTensor = tf.tensor2d([timeOfDay], [1, 1]);

  // Get the model prediction
  const prediction = model.predict(inputTensor) as tf.Tensor;
  
  // Return the predicted value (the first element of the prediction tensor)
  return prediction.dataSync()[0];
};

// Load the model when the server starts
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
