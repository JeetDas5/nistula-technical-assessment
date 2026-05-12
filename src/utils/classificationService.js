export const classifyQuery = (message) => {
  if(!message) {
    throw new Error("Message is required for classification.");
  }
  const text = message.toLowerCase();

  if (text.includes("available")) {
    return "pre_sales_availability";
  }

  if (
    text.includes("rate") ||
    text.includes("price") ||
    text.includes("cost")
  ) {
    return "pre_sales_pricing";
  }

  if (text.includes("check in") || text.includes("wifi")) {
    return "post_sales_checkin";
  }

  if (text.includes("airport") || text.includes("early check")) {
    return "special_request";
  }

  if (
    text.includes("not working") ||
    text.includes("unhappy") ||
    text.includes("refund")
  ) {
    return "complaint";
  }

  return "general_enquiry";
};
