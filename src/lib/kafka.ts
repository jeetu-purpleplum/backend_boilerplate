import { Kafka, logLevel } from "kafkajs";
import { config } from "../config/config";

export const kafka = new Kafka({
    clientId: config.kafka.clientId,
    brokers: (config.kafka.brokers).split(","),
    ssl: false, // set true for production if using SSL
    sasl: undefined, // add if needed
    logLevel: logLevel.INFO,
});

export const kafkaProducer = kafka.producer({
    allowAutoTopicCreation: true
});
export const kafkaConsumer = kafka.consumer({
    groupId: config.kafka.groupId,
    allowAutoTopicCreation: true
});

export const connectKafka = async () => {
    try {
        console.log("⏳ Connecting to Kafka...");
        await kafkaProducer.connect();
        await kafkaConsumer.connect();
        console.log("⚡ Kafka connected successfully");
    } catch (err) {
        console.error("❌ Kafka connection failed:", err);
    }
};
