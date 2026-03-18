const logger = (req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);

  next(); // Passa para o próximo middleware ou rota
};

export default logger;
