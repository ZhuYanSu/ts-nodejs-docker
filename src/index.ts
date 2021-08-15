import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

if (!PORT) {
    console.error(`[*] Failed to start server on port ${PORT}`);
} else {
    const app = express();
    app.listen(PORT, () => {
        console.log(`[*] server running on port ${PORT}`);
    });
}
