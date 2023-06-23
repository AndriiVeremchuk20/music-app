/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    FIREBASE_API_KEY: "",
    FIREBASE_AUTH_DOMAIN: "",
    FIREBASE_PROJECT_ID: "",
    FIREBASE_STORAGE_BUCKET: "",
    FIREBASE_MESSAGING_SENDER_ID: "",
    FIREBASE_APP_ID: "",
    FIREBASE_MEASUREMENT_ID: "",
    API_BASE_URL: "",
  },
  images: {
    domains: ['music-app-media-data.s3.eu-north-1.amazonaws.com', 'lh3.googleusercontent.com'],

  },
}

module.exports = nextConfig
