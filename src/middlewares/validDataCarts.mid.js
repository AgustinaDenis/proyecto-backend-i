function validDataCarts(req, res, next) {
    try {
      const { user_id, product_id, quantity } = req.body;
      if (!user_id || !product_id || !quantity) {
        const error = new Error("user, product and quantity is required");
        error.statusCode = 400;
        throw error;
      } else {
        return next();
      }
    } catch (error) {
      throw error;
    }
  }
  
  
  
  export default validDataCarts
  