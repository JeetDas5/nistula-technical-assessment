export const determineAction = (score, queryType) => {
  if (!score || !queryType) {
    throw new Error(
      "Both score and queryType are required to determine action.",
    );
  }
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
