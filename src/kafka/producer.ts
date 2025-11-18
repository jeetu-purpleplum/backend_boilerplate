import { kafkaProducer } from "../lib/kafka";

export const sendMessage = async (topic: string, message: any) => {
    try {
        await kafkaProducer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify(message),
                },
            ],
        });

        console.log(`📤 Message sent to topic: ${topic}`);
    } catch (err) {
        console.error("❌ Error sending Kafka message:", err);
    }
};
