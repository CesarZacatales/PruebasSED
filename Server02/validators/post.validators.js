const { body, param } = require("express-validator");
const validators = {};

validators.createPostValidator = [
  body("image")
    .optional()
    .notEmpty().withMessage("Debes de enviar una imagen")
    .isURL().withMessage("La imagen debe de ser una URL"),
    body("title")
    .notEmpty().withMessage("El título no debe de ser vacío"),
    body("precio").notEmpty().withMessage("El precio no debe de ir vacío")
];

validators.findPostByIdValidator = [
  param("identifier")
    .notEmpty().withMessage("El id no debe de ir vacío")
    .isMongoId().withMessage("El id debe de ser de mongo")
]

validators.findBookBytituloValidator = [
  param("title").notEmpty().withMessage("El titulo no debe de ir vacío"),
];


module.exports = validators;
