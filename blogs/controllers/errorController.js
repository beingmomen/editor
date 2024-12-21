const sendErrorDev = (err, res) => {
  console.warn('Error:', err.message);
  const errorsArr = {};

  // Handle different types of errors
  if (err.isOperational) {
    errorsArr.error = [err.message];
  } else if (err.name === 'JsonWebTokenError') {
    errorsArr.error = ['Invalid Token, please login again!'];
  } else if (err.name === 'TokenExpiredError') {
    errorsArr.error = ['Your token has expired, please login again!'];
  } else if (err.name === 'CastError') {
    errorsArr.error = ['Invalid Value'];
  } else if (err.message && err.message.includes('role')) {
    errorsArr.error = ['You do not have permission to perform this action'];
  } else if (
    err.message &&
    err.message.includes('images') &&
    err.message.includes('The system cannot find the file specified')
  ) {
    errorsArr.error = ['The system cannot find the specified image file'];
  } else if (err.name === 'MulterError') {
    errorsArr.error = ['You cannot add more than 3 images'];
  } else if (err.code === 'EMESSAGE') {
    errorsArr.error = [
      'Mail cannot be sent. The from address does not match a verified Sender Identity'
    ];
  } else if (err.errors) {
    // Handle validation errors
    try {
      for (const [key, value] of Object.entries(err.errors)) {
        errorsArr[key] = [value.message];
      }
    } catch (e) {
      errorsArr.error = ['Validation Error'];
    }
  } else if (err.isHandled && err.errmsg && err.keyValue) {
    // Handle duplicate key errors
    try {
      const key = err.errmsg.split(' { ')[1].split(':')[0];
      errorsArr[key] = [
        `The ${key} ((${
          err.keyValue[key]
        })) already exists. Please choose a different ${key}.`
      ];
    } catch (e) {
      errorsArr.error = ['Duplicate Entry Error'];
    }
  } else {
    // Handle unknown errors
    errorsArr.error = ['Something went wrong'];
  }

  // Send error response
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    statusCode: err.statusCode || 500,
    errors: errorsArr
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.code === 11000) {
    err.isHandled = true;
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};
