"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cv = sequelize.define(
    "Cv",
    {
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      adres: DataTypes.STRING,
      phone: DataTypes.STRING,
      driverLicance: DataTypes.STRING,
      martialStatus: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.STRING,
      armyStatus: DataTypes.STRING,
      linkednLink: DataTypes.STRING,
      websiteLink: DataTypes.STRING,
      description: DataTypes.STRING,
      workExperience: DataTypes.STRING,
      educationExperience: DataTypes.STRING,
      interests: DataTypes.STRING,
      references:DataTypes.STRING,
      skills: DataTypes.STRING,
    },
    {}
  );
  Cv.associate = function (models) {
    // associations can be defined here
  };
  return Cv;
};
