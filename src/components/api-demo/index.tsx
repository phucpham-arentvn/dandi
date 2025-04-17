"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, FileText, Copy, Check, ExternalLink } from "lucide-react";

interface ApiResponse {
  summary?: string;
  cool_facts?: string[];
  error?: string;
}

export default function ApiDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [requestUrl] = useState("/api/github-summarizer");
  const [githubUrl, setGithubUrl] = useState(
    "https://github.com/assafelovic/gpt-researcher"
  );
  const [activeTab, setActiveTab] = useState("body");
  const [responseTab, setResponseTab] = useState("pretty");
  const [statusCode, setStatusCode] = useState<number>(0);
  const [response, setResponse] = useState<ApiResponse>({
    summary:
      "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to produce detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
    cool_facts: [
      "The project leverages both 'gpt-4o-mini' and 'gpt-4o' (128K context) to complete research tasks, optimizing costs by using each only when necessary.",
      "The average research task using GPT Researcher takes around 2 minutes to complete and costs approximately $0.005.",
    ],
  });

  const handleSubmit = async () => {
    if (!apiKey) {
      setResponse({ error: "API key is required" });
      setStatusCode(401);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ githubUrl }),
      });

      setStatusCode(response.status);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({
        error: "Failed to fetch data. Please check your API key and try again.",
      });
      setStatusCode(500);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify({ githubUrl }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatJson = (json: ApiResponse) => {
    return JSON.stringify(json, null, 2);
  };

  const getStatusText = (status: number): string => {
    switch (status) {
      case 200:
        return "OK";
      case 201:
        return "Created";
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 405:
        return "Method Not Allowed";
      case 500:
        return "Internal Server Error";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Try It Yourself</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          See how Dandi Github Analyzer works by testing our API directly. Enter
          any GitHub repository URL and get instant insights.
        </p>

        <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-xl overflow-hidden">
          {/* API Request Header */}
          <div className="flex items-center p-4 border-b">
            <div className="badge badge-primary mr-2">POST</div>
            <span className="font-mono text-sm flex-1 truncate">
              {requestUrl}
            </span>
            <button
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {!isLoading && <Send className="h-4 w-4 mr-2" />}
              Send
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "params" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => setActiveTab("params")}
            >
              Params
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "auth" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => setActiveTab("auth")}
            >
              Authorization
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "headers" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => setActiveTab("headers")}
            >
              Headers
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "body" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => setActiveTab("body")}
            >
              Body
            </button>
          </div>

          {/* Request Body */}
          {activeTab === "body" && (
            <div className="p-4 relative">
              <div className="flex mb-2">
                <div className="flex space-x-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="body-type"
                      className="radio radio-sm"
                      checked
                      readOnly
                    />
                    <span className="ml-2 text-sm">JSON</span>
                  </label>
                </div>
                <button
                  className="ml-auto text-sm text-primary hover:underline"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="font-mono text-sm bg-base-200 p-4 rounded-md h-40 overflow-auto">
                <pre className="whitespace-pre">{"{\n"}</pre>
                <pre className="whitespace-pre pl-4">{'"githubUrl": '}</pre>
                <pre className="whitespace-pre pl-4">
                  <input
                    type="text"
                    value={`"${githubUrl}"`}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.substring(1, value.length - 1);
                      }
                      setGithubUrl(value);
                    }}
                    className="bg-transparent border-b border-dashed border-primary focus:outline-none w-full"
                  />
                </pre>
                <pre className="whitespace-pre">{"}"}</pre>
              </div>
            </div>
          )}

          {/* Headers Tab Content */}
          {activeTab === "headers" && (
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-black">
                    x-api-key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="input input-bordered w-full text-black placeholder-gray-500"
                  />
                </div>
                <div className="font-mono text-sm bg-base-200 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-black/70">Content-Type:</div>
                    <div className="text-black">application/json</div>
                    <div className="text-black/70">x-api-key:</div>
                    <div className="text-black">
                      {apiKey ? "••••••••" : "<not set>"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Response Section */}
          <div className="border-t">
            <div className="flex justify-between items-center p-4">
              <div className="flex space-x-4">
                <button
                  className={`text-sm font-medium ${
                    responseTab === "pretty" ? "text-primary" : ""
                  }`}
                  onClick={() => setResponseTab("pretty")}
                >
                  Pretty
                </button>
                <button
                  className={`text-sm font-medium ${
                    responseTab === "raw" ? "text-primary" : ""
                  }`}
                  onClick={() => setResponseTab("raw")}
                >
                  Raw
                </button>
              </div>
              <div className="flex items-center">
                {statusCode > 0 && (
                  <span
                    className={`badge mr-2 ${
                      statusCode >= 200 && statusCode < 300
                        ? "badge-success"
                        : statusCode >= 400 && statusCode < 500
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {statusCode} {getStatusText(statusCode)}
                  </span>
                )}
                <span className="text-sm text-base-content/70">~1.2s</span>
              </div>
            </div>

            <div className="font-mono text-sm bg-base-200 p-4 rounded-md mx-4 mb-4 h-64 overflow-auto">
              {responseTab === "pretty" ? (
                <div>
                  <div className="mb-4">
                    <span className="text-black/70">summary:</span>{" "}
                    <span className="text-black">{response.summary}</span>
                    {response.cool_facts &&
                      response.cool_facts.length > 0 &&
                      ","}
                  </div>
                  {response.cool_facts && response.cool_facts.length > 0 && (
                    <div>
                      <span className="text-black/70">cool_facts:</span> [
                      {response.cool_facts.map(
                        (fact: string, index: number) => (
                          <div key={index} className="pl-4">
                            <span className="text-black">{fact}</span>
                            {index < response.cool_facts!.length - 1 ? "," : ""}
                          </div>
                        )
                      )}
                      ]
                    </div>
                  )}
                  {response.error && (
                    <div>
                      <span className="text-black/70">error:</span>{" "}
                      <span className="text-red-600">{response.error}</span>
                    </div>
                  )}
                </div>
              ) : (
                <pre>{formatJson(response)}</pre>
              )}
            </div>
          </div>

          {/* Documentation Button */}
          <div className="p-4 border-t flex justify-end">
            <Link href="/documentation" className="btn btn-outline btn-sm">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </Link>
          </div>
        </div>

        {/* API Information */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">
            Ready to integrate with your application?
          </h3>
          <p className="mb-6">
            Our API is simple to use and provides powerful insights for any
            GitHub repository. Check out our documentation for more details on
            endpoints, parameters, and response formats.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/documentation" className="btn btn-primary">
              <FileText className="h-4 w-4 mr-2" />
              API Documentation
            </Link>
            <Link href="/signup" className="btn btn-outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Get API Key
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
