export default (err, req, res, next) => {
  console.error("Err❌ : " + err.message);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(statusCode).json({ message: errorMessage });
};
