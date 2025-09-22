const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default BASE_URL;

export async function api(path, options = {}) {
  const { method = "GET", body, headers = {}, isForm = false } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: isForm
      ? headers // don’t set content-type if sending FormData
      : {
          "Content-Type": "application/json",
          ...headers,
        },
    body: body
      ? isForm
        ? body // send FormData directly
        : JSON.stringify(body)
      : undefined,
  });

  // Try parsing JSON, but fallback to raw text
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}