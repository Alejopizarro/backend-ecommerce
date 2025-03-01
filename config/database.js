module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: env("DATABASE_URL", ""),
    ssl: env.bool("DATABASE_SSL", true) ? { rejectUnauthorized: false } : false,
  },
});
