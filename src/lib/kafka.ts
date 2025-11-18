import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || "backend-boilerplate",
    brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
    ssl: false, // set true for production if using SSL
    sasl: undefined, // add if needed
    logLevel: logLevel.INFO,
});

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID || "boilerplate-group",
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
