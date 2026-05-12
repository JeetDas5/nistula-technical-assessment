import { messageSchema } from "../validations/messageValidator.js";
import {
  classifyQuery,
  normalizeMessage,
  generateReply,
  calculateConfidence,
} from "../utils/index.js";
import { determineAction } from "../actions/index.js";
import { pool } from './../config/db/index.js';

export const handleMessage = async (req, res) => {
  console.log("Received message:", req.body);
  try {
    // 1. Validate Request Body
    const validatedData = messageSchema.parse(req.body);
    console.log("Validated message data:", validatedData);

    // 2. Classify Query
    const queryType = classifyQuery(validatedData.message);
    console.log("Classified query type:", queryType);

    // 3. Normalize Message
    const normalizedMessage = normalizeMessage(validatedData, queryType);
    console.log("Normalized message data:", normalizedMessage);

    // 4. Generate AI Reply
    const draftedReply = await generateReply(normalizedMessage);
    console.log("Drafted AI reply:", draftedReply);

    // 5. Calculate Confidence Score
    const confidenceScore = calculateConfidence(queryType);
    console.log("Calculated confidence score:", confidenceScore);

    // 6. Determine Action
    const action = determineAction(confidenceScore, queryType);
    console.log("Determined action:", action);

    // 7. Store in PostgreSQL
    const insertQuery = `
      INSERT INTO messages (
        message_id,
        guest_name,
        source,
        message_text,
        query_type,
        drafted_reply,
        confidence_score,
        action
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;

    const values = [
      normalizedMessage.message_id,
      normalizedMessage.guest_name,
      normalizedMessage.source,
      normalizedMessage.message_text,
      normalizedMessage.query_type,
      draftedReply,
      confidenceScore,
      action,
    ];

    await pool.query(insertQuery, values);

    // 8. Return Response
    return res.status(200).json({
      message_id: normalizedMessage.message_id,
      query_type: normalizedMessage.query_type,
      drafted_reply: draftedReply,
      confidence_score: confidenceScore,
      action,
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    // Zod Validation Error
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Invalid request payload",
        errors: error.issues[0].message,
      });
    }

    // PostgreSQL Error
    if (error.code) {
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    // Claude/API Error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
