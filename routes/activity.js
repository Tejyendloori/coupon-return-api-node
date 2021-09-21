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
  console.log("execute")
  console.log(req.body)
  // decode data
  const data = JWT(req.body);
  console.log(data)

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
  console.log("stringfy", req.body.toString())
  const data = JWT(req.body);
  console.log(data)
  console.log(data)
  console.log("-----------------Save")

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
  console.log("publish")
  console.log("stringfy", req.body.toString())
  console.log("-----------------publish")
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
  console.log("stringfy", req.body.toString())
  console.log("-----------------validate")
  res.status(200).send({
    status: 'ok',
  });
};
