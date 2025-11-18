import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';


export const speedLimiter = slowDown({ 
    windowMs: 60 * 1000,    
    delayAfter: 30,         // allow 30 requests per minute, then slow down
    delayMs: 500            // add 500ms delay per request above 30
});

export const rateLimiter = rateLimit({ 
    windowMs: 60 * 1000,    // 1 minute
    max: 60,                 // limit each IP to 60 requests per minute
    message: "Too many requests from this IP, please try again later.",
});
