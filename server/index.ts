import express from "express";
import http from "http";
import { Server } from "socket.io";
import mqtt from "mqtt";
import { writePowerData } from "./influxdb";
import { predictSolarPower } from "./tensorflow";

// ✅ Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// ✅ MQTT Setup
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");
const topic = "solar/power";

mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
  mqttClient.subscribe(topic);
});

mqttClient.on("message", (topic, message) => {
  const power = parseFloat(message.toString());
  io.emit("powerData", { power });

  writePowerData(power);
  const predictedPower = predictSolarPower(new Date().getHours());
  io.emit("predictedPower", { predictedPower });

  console.log(`⚡ Power: ${power} kW | 🔮 Predicted: ${predictedPower} kW`);
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("⚡ Socket.IO + MQTT Server Running");
});

// ✅ Start
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));
