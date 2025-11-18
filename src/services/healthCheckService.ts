// Module Imports
import crypto from "crypto";

export const generateRandom = async (min: number, max: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        crypto.randomBytes(4, (err, buf) => {
            if (err) {
                reject(err);
            }
            const hex = buf.toString("hex");
            const myInt32 = parseInt(hex, 16);
            const randomNumber = myInt32 / (0xffffffff + 1);

            resolve(Math.floor(randomNumber * (max - min + 1)) + min);
        });
    });
};
