module.exports = {
PORT: process.env.PORT || 8000,
NODE_ENV: process.env.NODE_ENV || 'development',
DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/parkfinder',
JWT_SECRET: process.env.JWT_SECRET || 'parkfinder-app-jwt',
API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
API_TOKEN: "d93f7b91-6364-4a5a-9d12-42ec5906fd79"
}
