module.exports = {
  HOST: "db",  // This must be the service name in Docker Compose
  USER: "postgres",
  PASSWORD: "password",
  DB: "test",
  PORT: 5432,  // Use internal PostgreSQL port (5432 inside the container)
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
