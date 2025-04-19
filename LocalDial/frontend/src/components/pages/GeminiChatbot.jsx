// src/components/GeminiChat.jsx
import React, { useState } from "react";
import { fetchGeminiResponse } from "../apiCalls";

const GeminiChat = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetchGeminiResponse(prompt);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Gemini AI Chat</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", height: "100px", padding: "0.5rem" }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {output && (
        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f4f4f4", borderRadius: "5px" }}>
          <h3>Response:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
