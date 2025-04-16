"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, FileText, Copy, Check, ExternalLink } from "lucide-react";

interface ApiResponse {
  summary: string;
  cool_facts: string[];
}

export default function ApiDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [requestUrl] = useState(
    "https://dandi-chi.vercel.app/api/github-summarizer"
  );
  const [githubUrl, setGithubUrl] = useState(
    "https://github.com/assafelovic/gpt-researcher"
  );
  const [activeTab, setActiveTab] = useState("body");
  const [responseTab, setResponseTab] = useState("pretty");
  const [response, setResponse] = useState<ApiResponse>({
    summary:
      "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to produce detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
    cool_facts: [
      "The project leverages both 'gpt-4o-mini' and 'gpt-4o' (128K context) to complete research tasks, optimizing costs by using each only when necessary.",
      "The average research task using GPT Researcher takes around 2 minutes to complete and costs approximately $0.005.",
    ],
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // This would be a real API call in production
      // const response = await fetch(requestUrl, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ githubUrl })
      // })
      // const data = await response.json()

      // For demo purposes, generate a simulated response based on the URL
      const repoName = githubUrl.split("/").pop() || "";
      const simulatedResponse = {
        summary: `${repoName} is a powerful open-source project hosted on GitHub. It provides developers with tools and utilities to enhance their workflow and productivity. The repository contains well-structured code with comprehensive documentation.`,
        cool_facts: [
          `${repoName} has gained significant traction in the developer community, with contributions from developers across the globe.`,
          `The average response time for issues in ${repoName} is approximately 48 hours, showing active maintenance.`,
        ],
      };

      setResponse(simulatedResponse);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify({ githubUrl }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatJson = (json: ApiResponse) => {
    return JSON.stringify(json, null, 2);
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
                      // Remove quotes if they're included
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
                <span className="badge badge-success mr-2">200 OK</span>
                <span className="text-sm text-base-content/70">~1.2s</span>
              </div>
            </div>

            <div className="font-mono text-sm bg-base-200 p-4 rounded-md mx-4 mb-4 h-64 overflow-auto">
              {responseTab === "pretty" ? (
                <div>
                  <div className="mb-4">
                    <span className="text-primary-content/70">summary:</span>{" "}
                    <span className="text-success">{response.summary}</span>,
                  </div>
                  <div>
                    <span className="text-primary-content/70">cool_facts:</span>{" "}
                    [
                    {response.cool_facts.map((fact: string, index: number) => (
                      <div key={index} className="pl-4">
                        <span className="text-success">{fact}</span>
                        {index < response.cool_facts.length - 1 ? "," : ""}
                      </div>
                    ))}
                    ]
                  </div>
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
