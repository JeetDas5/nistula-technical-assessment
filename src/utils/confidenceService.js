export const calculateConfidence = (queryType) => {
  if(!queryType) {
    throw new Error("Query type is required to calculate confidence.");
  }
  switch (queryType) {
    case "pre_sales_availability":
      return 0.93;

    case "pre_sales_pricing":
      return 0.90;

    case "post_sales_checkin":
      return 0.88;

    case "general_enquiry":
      return 0.82;

    case "special_request":
      return 0.72;

    case "complaint":
      return 0.45;

    default:
      return 0.60;
  }
};