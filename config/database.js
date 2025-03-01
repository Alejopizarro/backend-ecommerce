module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: env("DATABASE_URL"),
    ssl: {
      rejectUnauthorized: false, // Para evitar problemas de SSL en Render
    },
  },
});
