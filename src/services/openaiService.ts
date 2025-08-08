// Central OpenAI API service for all AI features

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function callOpenAI(endpoint: string, body?: any) {
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not set.");
  }
  // If body is a string, treat it as a prompt
  let payload: any = {};
  if (typeof body === "string") {
    payload = { prompt: body };
  } else if (body) {
    payload = body;
  }
  const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }
  return response.json();
}
