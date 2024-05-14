export default function getUserIdFromtoken(token?: string) {
  let id = undefined;

  if (!token) return id;

  try {
    // Decode the payload part of the JWT token
    const decodedPayload = atob(token.split(".")[1]);

    // Replace '+' with '/' and '_' with '-' to convert from Base64Url to Base64
    const base64Payload = decodedPayload
      .replace(/\+/g, "/")
      .replace(/\-/g, "+");

    // Parse the Base64 payload to get the JSON object
    const payload = JSON.parse(base64Payload);

    // Extract the 'id' from the payload
    id = payload.id;
  } catch (e) {
    if (process.env.NODE_ENV != "production") {
      console.error("Error extracting ID from JWT:", e);
    }
  }

  return id;
}
