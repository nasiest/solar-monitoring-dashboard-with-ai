import mqtt from 'mqtt';
import { writePowerData } from './influxdb.js';
import { io } from 'socket.io-client'; // Ensure this matches the socket connection on your frontend

// Connect to the MQTT broker (use your own broker if necessary)
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');  // Public broker, or replace with your own broker

// MQTT topic where power data will be published
const topic = 'solar/power';

// Connect to the MQTT broker
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error('Failed to subscribe to topic', err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});

// Listen for messages on the subscribed topic
mqttClient.on('message', (topic, message) => {
  const power = parseFloat(message.toString()); // Parse the power data from the incoming MQTT message
  
  // Emit power data to Socket.io clients
  io.emit('powerData', { power });
  
  // Write power data to InfluxDB
  writePowerData(power);
  
  // Log the received power data
  console.log(`Received power data: ${power} kW`);
});


// import mqtt from 'mqtt';
// import { predictSolarPower } from './tensorflow';
// import { writePowerData } from './influxdb';
// import { io } from 'socket.io-client';

// const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

// const topic = 'solar/power';
// mqttClient.on('connect', () => {
//   console.log('Connected to MQTT broker');
//   mqttClient.subscribe(topic);
// });

// mqttClient.on('message', (topic, message) => {
//   const power = parseFloat(message.toString());

//   // Emit power data to Socket.io
//   io.emit('powerData', { power });

//   // Predict power using the TensorFlow model
//   const timeOfDay = new Date().getHours();
//   const predictedPower = predictSolarPower(timeOfDay);

//   // Emit predicted power data to Socket.io
//   io.emit('predictedPower', { predictedPower });

//   // Write power data to InfluxDB
//   writePowerData(power);

//   console.log(`Received power: ${power} kW, Predicted power: ${predictedPower} kW`);
// });
