# Part 3 - Thinking Questions

## Question A - Immediate Response

### AI Reply

Hi, I'm really sorry you're facing this issue, especially so late at night and before your guests arrive for breakfast. I've marked this issue as urgent and immediately alerted the operations team to inspect the hot water system right now. We'll keep you updated as quickly as possible, and our team will also review appropriate compensation once the issue is resolved. Thank you for bringing this to our attention.

### Why I Chose This Wording

The response prioritizes empathy, urgency, and reassurance without making unrealistic promises. The guest is frustrated and stressed, so the message acknowledges the inconvenience, confirms immediate escalation, and reassures them that the issue is being actively handled. Mentioning compensation review shows accountability while avoiding committing to refunds before human intervention.

---

# Question B - System Design

Beyond sending an AI-generated reply, the platform should trigger a full operational escalation workflow.

### Immediate System Actions

1. Mark the message as:
   - priority = critical
   - query_type = complaint
   - sentiment = negative

2. Automatically notify:
   - operations manager
   - manager responsible for maintenance
   - maintenance engineer

3. Create:
   - incident ticket
   - escalation log
   - internal alert dashboard entry

4. Disable auto-send workflows for further guest communication until a human agent reviews the conversation.

5. Trigger retry escalation logic:
   - if no staff acknowledgement within 15 minutes then resend alerts
   - if unresolved within 30 minutes then escalate to senior manager

6. Log all events:
   - timestamps
   - incident details
   - response times
   - assigned personnel
   - resolution status

### Additional Operational Safeguards

The system should maintain a complete audit trail for accountability and future service analysis. If maintenance confirms a hardware issue, the platform should automatically attach prior complaints and maintenance history for the same property to assist faster troubleshooting.

---

# Question C - Learning and Prevention

Since this is the third hot water complaint in two months, the platform should identify this as a recurring operational issue rather than isolated guest dissatisfaction.

### System Improvements

1. Build recurring issue detection:
   - aggregate complaints by property and category
   - identify abnormal complaint frequency trends

2. Trigger preventive maintenance workflows:
   - automatic inspection scheduling
   - engineering escalation
   - maintenance reminders

3. Create operational analytics dashboards:
   - complaint frequency per property
   - average resolution time
   - recurring infrastructure failures

4. Add predictive maintenance alerts:
   - if repeated hot water complaints occur within a defined threshold(eg, 3 complaints in 7 days), automatically flag the property as "high operational risk"

5. Feed insights into property quality scoring:
   - repeated unresolved issues should reduce operational reliability scores and require management review.

The goal is for the system to evolve from immediate support into active operational intelligence that prevents repeated failures before they occur to reduce user complaints and improve property quality.
