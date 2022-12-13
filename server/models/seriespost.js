module.exports = (sequelize, DataTypes) => {
  const SeriesPost = sequelize.define(
    "SeriesPost",
    {
      index: {
        type: DataTypes.INTEGER, // 정수
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return SeriesPost;
};
