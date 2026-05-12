export const determineAction = (score, queryType) => {
  if (queryType === "complaint") {
    return "escalate";
  }

  if (score > 0.85) {
    return "auto_send";
  }

  if (score >= 0.6) {
    return "agent_review";
  }

  return "escalate";
};
