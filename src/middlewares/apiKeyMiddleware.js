export const validateApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if(!process.env.WEBHOOK_API_KEY) {
    console.warn("Warning: WEBHOOK_API_KEY is not set in environment variables. API key validation will be bypassed.");
    return next();
  }

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key missing",
    });
  }

  if (apiKey !== process.env.WEBHOOK_API_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};