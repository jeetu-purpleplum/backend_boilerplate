import { kafkaConsumer } from "../lib/kafka";
import { KAFKA_TOPICS } from "./topics";

export const registerKafkaConsumers = async () => {
    // Subscribe to all your topics here
    await kafkaConsumer.subscribe({
        topic: KAFKA_TOPICS.USER_CREATED,
        fromBeginning: false,
    });

    await kafkaConsumer.subscribe({
        topic: KAFKA_TOPICS.PAYMENT_COMPLETED,
        fromBeginning: false,
    });

    // Listener
    await kafkaConsumer.run({
        eachMessage: async ({ topic, message }) => {
            const value = message.value?.toString();
            console.log(`Message received from ${topic}:`, value);

            if (topic === KAFKA_TOPICS.USER_CREATED) {
                // handle user-created event
            }

            if (topic === KAFKA_TOPICS.PAYMENT_COMPLETED) {
                // handle payment-completed event
            }
        },
    });

    console.log("👂 Kafka consumers registered");
};
