const { v1: Uuidv1 } = require('uuid');
const JWT = require('../utils/jwtDecoder');
const logger = require('../utils/logger');

/**
 * The Journey Builder calls this method for each contact processed by the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.execute = async (req, res) => {
  // decode data
  const data = JWT(req.body);

  logger.info(data);

  try {
    console.log("saving data working inside execute ")
  } catch (error) {
    logger.error(error);
  }

  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user saves the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.save = async (req, res) => {
  console.log("Save")

  res.status(200).send({
    status: 'ok',
  });
};

/**
 *  Endpoint that receives a notification when a user publishes the journey.
 * @param req
 * @param res
 */
exports.publish = (req, res) => {
  console.log(req.body)
  console.log("publish")
  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user performs
 * some validation as part of the publishing process.
 * @param req
 * @param res
 */
exports.validate = (req, res) => {
  console.log(req.body)

  console.log("validate")
  res.status(200).send({
    status: 'ok',
  });
};
