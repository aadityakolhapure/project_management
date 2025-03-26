import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { task_id, user_id, content } = await req.json();

  const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL");

  if (!SLACK_WEBHOOK_URL) {
    return new Response("Slack webhook URL is not set", { status: 500 });
  }

  const message = {
    text: `📢 New Activity Added!\n
    **Task ID:** ${task_id}\n
    **User ID:** ${user_id}\n
    **Content:** ${JSON.stringify(content)}`
  };

  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    return new Response("Failed to send Slack notification", { status: 500 });
  }

  return new Response("Notification sent to Slack", { status: 200 });
});
