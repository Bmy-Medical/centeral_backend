// utils/messageBroker.js
const publishMessage = (eventName, payload) => {
    console.log(`Event Published: ${eventName}`, payload);
    // Implement your message broker logic here, e.g., using RabbitMQ, Kafka, etc.
};

module.exports = { publishMessage };
