"use client";

import { useState } from "react";
import { useCheckApiKeyMutation } from "@/redux/services/apiKeysApi";
import { toast } from "react-hot-toast";

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("");
  const [checkApiKey, { isLoading: isChecking }] = useCheckApiKeyMutation();
  const [checkResult, setCheckResult] = useState<{
    valid: boolean;
    message?: string;
    keyDetails?: {
      type: "development" | "production";
      name: string;
      usage: number;
      monthlyLimit?: number;
    };
  } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCheckApiKey = async () => {
    if (!apiKey.trim()) return;
    try {
      const result = await checkApiKey(apiKey).unwrap();
      setCheckResult(result);
    } catch (error) {
      console.error("Error checking API key:", error);
      setCheckResult({
        valid: false,
        message: "Error checking API key",
      });
    }
  };

  const handleCopyResult = async () => {
    if (!checkResult) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(checkResult, null, 2));
      setIsCopied(true);
      toast.success("Response copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy response");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-70">Pages</span>
          <span className="text-sm opacity-70">/</span>
          <span className="text-sm">API Playground</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-8">API Playground</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="join flex-1">
              <input
                className="input input-bordered join-item flex-1"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">API configuration</span>
            </label>
            <select className="select select-bordered w-full">
              <option value="default">Default</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Extract depth</span>
              <span className="label-text-alt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </span>
            </label>
            <select className="select select-bordered w-full">
              <option value="developer">Developer</option>
              <option value="production">Production</option>
            </select>
          </div>

          <button
            onClick={handleCheckApiKey}
            disabled={isChecking || !apiKey.trim()}
            className="btn btn-primary w-full"
          >
            {isChecking && <span className="loading loading-spinner"></span>}{" "}
            Send Request
          </button>

          <p className="text-sm opacity-70">
            Response time ranges from 1-10 seconds depending on the extraction
            depth and whether images are included.
          </p>
        </div>

        {/* Right Panel */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Response</h2>
              <button
                onClick={handleCopyResult}
                disabled={!checkResult}
                className="btn btn-ghost btn-sm gap-2"
              >
                {isCopied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-success"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                    />
                  </svg>
                )}
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-base-300 rounded-lg p-4">
              {checkResult && (
                <pre className="whitespace-pre-wrap text-gray-800">
                  {JSON.stringify(checkResult, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
