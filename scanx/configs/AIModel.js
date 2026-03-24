export const sendMessage = async (message, signal) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "AI request failed");
  }

  const data = await response.json();
  return data.text;
};
