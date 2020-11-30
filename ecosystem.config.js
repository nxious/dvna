module.exports = {
    apps : [{
      name: "DVNA",
      script: "server.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        MYSQL_USER:"root",
        MYSQL_DATABASE:"dvna",
        MYSQL_PASSWORD:"passw0rd",
        MYSQL_HOST:"127.0.0.1",
        MYSQL_PORT:"3306",
      }
    }]
  }
  