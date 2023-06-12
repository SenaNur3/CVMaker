const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const cv = {
    photo: req.body.photo,
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    lastPosition: req.body.lastPosition,
    email: req.body.email,
    adres: req.body.adres,
    phone: req.body.phone,
    driverLicance: req.body.driverLicance,
    martialStatus: req.body.martialStatus,
    gender: req.body.gender,
    birthday: req.body.birthday,
    armyStatus: req.body.armyStatus,
    linkednLink: req.body.linkednLink,
    websiteLink: req.body.websiteLink,
    description: req.body.description,
    workExperience: JSON.stringify(req.body.workExperience),
    educationExperience: JSON.stringify(req.body.educationExperience),
    interests: JSON.stringify(req.body.interests),
    references: JSON.stringify(req.body.references),
    skills: JSON.stringify(req.body.skills),
  };

  const schema = {
    photo:{ type: "string", optional: true, max: "100" },
    username: { type: "string", optional: false, max: "100" },
    name: { type: "string", optional: false, max: "100" },
    surname: { type: "string", optional: false, max: "100" },
    lastPosition: { type: "string", optional: false, max: "300" },
    email: { type: "string", optional: false, max: "100" },
    adres: { type: "string", optional: true, max: "100" },
    phone: { type: "string", optional: true, max: "100" },
    driverLicance: { type: "string", optional: true, max: "100" },
    martialStatus: { type: "string", optional: true, max: "100" },
    gender: { type: "string", optional: true, max: "100" },
    birthday: { type: "string", optional: true, max: "100" },
    armyStatus: { type: "string", optional: true, max: "100" },
    linkednLink: { type: "string", optional: true, max: "100" },
    websiteLink: { type: "string", optional: true, max: "100" },
    description: { type: "string", optional: true, max: "300" },
    workExperience: { type: "string", optional: true },
    educationExperience: { type: "string", optional: true },
    interests: { type: "string", optional: true },
    references: { type: "string", optional: true },
    skills: { type: "string", optional: true },
  };

  const v = new Validator();
  const validationResponse = v.validate(cv, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Cv.create(cv)
    .then((result) => {
      res.status(201).json({
        message: "CV created successfully",
        cv: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function show(req, res) {
  const username = req.params.username;
  console.log("username: ", username);

  const promise = models.Cv.findAll({
    limit: 1,
    where: { username: username },
});
  promise
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "CV not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function index(req, res) {
  models.Cv.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  const updatedPost = {
    username: req.body.username,
    photo: req.body.photo,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    adres: req.body.adres,
    phone: req.body.phone,
    driverLicance: req.body.driverLicance,
    martialStatus: req.body.martialStatus,
    gender: req.body.gender,
    birthday: req.body.birthday,
    armyStatus: req.body.armyStatus,
    linkednLink: req.body.linkednLink,
    websiteLink: req.body.websiteLink,
    description: req.body.description,
    workExperience: req.body.workExperience,
    educationExperience: req.body.educationExperience,
    interests: req.body.interests,
    references: req.body.references,
    skills: req.body.skills,
  };

  const userName = req.body.username;

  const schema = {    
    username: { type: "string", optional: false, max: "300" },
    photo: { type: "string", optional: true, max: "300" },
    name: { type: "string", optional: false, max: "100" },
    surname: { type: "string", optional: false, max: "100" },
    email: { type: "string", optional: false, max: "100" },
    adres: { type: "string", optional: true, max: "100" },
    phone: { type: "string", optional: true, max: "100" },
    driverLicance: { type: "string", optional: true, max: "100" },
    martialStatus: { type: "string", optional: true, max: "100" },
    gender: { type: "string", optional: true, max: "100" },
    birthday: { type: "string", optional: true, max: "100" },
    armyStatus: { type: "string", optional: true, max: "100" },
    linkednLink: { type: "string", optional: true, max: "100" },
    websiteLink: { type: "string", optional: true, max: "100" },
    description: { type: "string", optional: true, max: "300" },
    workExperience: { type: "string", optional: true },
    educationExperience: { type: "string", optional: true },
    interests: { type: "string", optional: true },
    references: { type: "string", optional: true },
    skills: { type: "string", optional: true },
  };

  const v = new Validator();
  const validationResponse = v.validate(updatedPost, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Cv.update(updatedPost, { where: { username: userName } })
    .then((result) => {
      res.status(200).json({
        message: "Post updated successfully",
        cv: updatedPost,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;
  const userId = 1;

  models.Cv.destroy({ where: { id: id, username: userName } })
    .then((result) => {
      res.status(200).json({
        message: "Post deleted successfully",
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destroy: destroy,
};
