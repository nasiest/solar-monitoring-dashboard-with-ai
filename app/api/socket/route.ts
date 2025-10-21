//app/api/socket.ts

import express from "express";
import http from "http";
import { Server } from "socket.io";
import mqtt from "mqtt";
import { writePowerData } from "../../../server/influxdb";
import { predictSolarPower } from "../../../server/tensorflow";

// ✅ Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO server (not client)
const io = new Server(server, {
  cors: {
    origin: "*", // Allow any origin (adjust for production)
    methods: ["GET", "POST"],
  },
});

// ✅ MQTT setup
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");
const topic = "solar/power";

mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error("❌ Failed to subscribe to topic", err);
    } else {
      console.log(`📡 Subscribed to topic: ${topic}`);
    }
  });
});

mqttClient.on("message", (topic, message) => {
  const power = parseFloat(message.toString());

  // Broadcast real-time power data to all connected clients
  io.emit("powerData", { power });

  // Write to InfluxDB
  writePowerData(power);

  // Predict using TensorFlow model
  const timeOfDay = new Date().getHours();
  const predictedPower = predictSolarPower(timeOfDay);

  // Emit the prediction
  io.emit("predictedPower", { predictedPower });

  console.log(`⚡ Power: ${power} kW | 🔮 Predicted: ${predictedPower} kW`);
});

// ✅ API route handler
export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Socket.IO backend server running" });
  }
  res.status(404).send("Not Found");
}

// ✅ Start Express server (avoid duplicate start in Next.js dev mode)
const PORT = 3001;
if (!server.listening) {
  server.listen(PORT, () => {
    console.log(`🚀 Socket.IO server running at http://localhost:${PORT}`);
  });
}



// import { IncomingMessage, ServerResponse } from 'http';
// import express from 'express';
// import http from 'http';
// import socketIo from 'socket.io';
// import mqtt from 'mqtt';
// import { InfluxDB, Point } from '@influxdata/influxdb-client';
// import * as tf from '@tensorflow/tfjs-node';

// // Initialize Express and Socket.io
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // InfluxDB Setup
// const influxClient = new InfluxDB({
//   url: 'http://localhost:8086',
//   token: 'my-token',
// });
// const influxWriteApi = influxClient.getWriteApi('my-org', 'solar_data', 'ns');

// // MQTT Setup
// const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
// const mqttTopic = 'solar/power';
// mqttClient.on('connect', () => {
//   console.log('Connected to MQTT broker');
//   mqttClient.subscribe(mqttTopic);
// });

// // TensorFlow Model Setup
// let model: tf.LayersModel | null = null;
// const loadModel = async () => {
//   model = await tf.loadLayersModel('file://./model/solar_power_model/model.json');
//   console.log('TensorFlow model loaded!');
// };
// loadModel();

// // Handle incoming MQTT messages
// mqttClient.on('message', (topic, message) => {
//   const power = parseFloat(message.toString());

//   // Emit power data to Socket.io
//   io.emit('powerData', { power });

//   // Write power data to InfluxDB
//   const point = new Point('solar_power').tag('device', 'ESP32').floatField('value', power);
//   influxWriteApi.writePoint(point);
//   influxWriteApi.flush().catch(err => console.error('Error writing to InfluxDB:', err));

//   // Predict power with TensorFlow model
//   if (model) {
//     const timeOfDay = new Date().getHours();
//     const inputTensor = tf.tensor2d([timeOfDay], [1, 1]);
//     const prediction = model.predict(inputTensor) as tf.Tensor;
//     const predictedPower = prediction.dataSync()[0];
//     io.emit('predictedPower', { predictedPower });
//   }
// });

// // API Route for backend logic
// export default (req: IncomingMessage, res: ServerResponse) => {
//   if (req.method === 'GET') {
//     return res.status(200).json({ message: 'Socket.io server started' });
//   }
//   res.status(404).send('Not Found');
// };

// // Start the Express server
// server.listen(3001, () => {
//   console.log('Server running on http://localhost:3001');
// });
