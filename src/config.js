module.exports = {
PORT: process.env.PORT || 8080,
NODE_ENV: process.env.NODE_ENV || 'development',
DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/parkfinder',
JWT_SECRET: process.env.JWT_SECRET || 'parkfinder-app-jwt',
API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api",
}
