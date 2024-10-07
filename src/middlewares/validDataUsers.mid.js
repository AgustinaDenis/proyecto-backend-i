function validDataUsers(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and password is required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}



export default validDataUsers
