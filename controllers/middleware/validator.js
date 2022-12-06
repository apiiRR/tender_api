const { body, validationResult } = require('express-validator')

const userRegisterValidationRules = () => {
  return [
    body('username').not().isEmpty().trim().escape(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
  ];
}

// function to validate login user
const userLoginValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
  ]
}

// function to validate create new data patient
const patientInsertValidationRules = () => {
  return [
    body('name').not().isEmpty().trim().escape(),
    body('phone').isInt(),
    body('address').not().isEmpty().trim().escape(),
    body('status').isIn(['positive', 'recovered', 'dead']),
    body('in_date_at').isDate(),
    body('out_date_at').isDate()
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userLoginValidationRules,
  userRegisterValidationRules,
  patientInsertValidationRules,
  validate
}