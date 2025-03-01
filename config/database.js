const parse = require("pg-connection-string").parse;

module.exports = ({ env }) => {
  const dbConfig = parse(env("DATABASE_URL"));

  return {
    connection: {
      client: "postgres",
      connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password,
        ssl: env.bool("DATABASE_SSL", true)
          ? { rejectUnauthorized: false }
          : false,
      },
      pool: {
        min: 2,
        max: 10,
      },
    },
  };
};
