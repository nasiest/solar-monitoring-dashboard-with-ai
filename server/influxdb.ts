import { InfluxDB, Point } from '@influxdata/influxdb-client';

// Initialize InfluxDB client
const client = new InfluxDB({
  url: 'http://localhost:8086', // InfluxDB server URL
  token: 'my-token',           // InfluxDB token (set in your InfluxDB setup)
});

// Get the write API for sending data
const writeApi = client.getWriteApi('my-org', 'solar_data', 'ns'); // Change 'my-org' and 'solar_data' to your own values

// Write power data to InfluxDB
export const writePowerData = (power: number) => {
  const point = new Point('solar_power')
    .tag('device', 'ESP32') // Tagging with the device name
    .floatField('value', power); // Power data field

  writeApi.writePoint(point);  // Write the data point to the InfluxDB
  writeApi.flush().catch((err) => console.error('Error writing data to InfluxDB:', err)); // Flush the buffer to make sure data is written
};

