import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ViewApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: {
    id: string;
    name: string;
    key: string;
    type: "development" | "production";
    createdAt: string;
    lastUsed?: string;
    usage?: number;
    monthlyLimit?: number;
    enablePiiRestrictions?: boolean;
  } | null;
}

export default function ViewApiKeyModal({
  isOpen,
  onClose,
  apiKey,
}: ViewApiKeyModalProps) {
  const [showKey, setShowKey] = useState(false);

  if (!isOpen || !apiKey) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 mx-4">
        <h2 className="text-2xl font-bold mb-6">API Key Details</h2>

        <div className="space-y-6">
          {/* Key Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Key Information</h3>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="font-medium">{apiKey.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">API Key</label>
                <div className="flex items-center gap-2">
                  <code className="px-2 py-1 rounded bg-gray-100 font-mono text-sm flex-1">
                    {showKey ? apiKey.key : "••••••••••••••••"}
                  </code>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="btn btn-ghost btn-sm btn-square"
                  >
                    {showKey ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Environment</label>
                <p className="font-medium capitalize">{apiKey.type}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Rate Limit</label>
                <p className="font-medium">
                  {apiKey.type === "production"
                    ? "1,000 requests/minute"
                    : "100 requests/minute"}
                </p>
              </div>

              {apiKey.monthlyLimit && (
                <div>
                  <label className="text-sm text-gray-500">Monthly Limit</label>
                  <p className="font-medium">
                    {apiKey.monthlyLimit.toLocaleString()} requests
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Usage Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Usage Information</h3>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-gray-500">Created</label>
                <p className="font-medium">{formatDate(apiKey.createdAt)}</p>
              </div>

              {apiKey.lastUsed && (
                <div>
                  <label className="text-sm text-gray-500">Last Used</label>
                  <p className="font-medium">{formatDate(apiKey.lastUsed)}</p>
                </div>
              )}

              <div>
                <label className="text-sm text-gray-500">Total Usage</label>
                <p className="font-medium">
                  {(apiKey.usage || 0).toLocaleString()} requests
                </p>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Security Settings</h3>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-gray-500">
                  PII Restrictions
                </label>
                <p className="font-medium">
                  {apiKey.enablePiiRestrictions ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
