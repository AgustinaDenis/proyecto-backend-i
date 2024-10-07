function validData(req, res, next) {
  try {
    const { title, stock, price } = req.body;
    if (!title || !stock || !price) {
      const error = new Error("All data is required");
      error.statusCode = 400;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    throw error;
  }
}

export default validData;
