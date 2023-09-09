const Sequelize = require("sequelize");

const sequelize = new Sequelize("appointment_app", "root", "yusha1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = sequelize;
