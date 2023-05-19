import dotenv from "dotenv"


dotenv.config()

export const {
    GOOGLE_CLIENT_ID,
    GOOGLE_SCOPES,
    GOOGLE_REDIRECT_URI,
    GOOGLE_AUTH_URI,
    SERVER_PORT,
    GOOGLE_CLIENT_SECRET
} = process.env