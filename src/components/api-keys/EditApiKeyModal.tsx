import { useState, useEffect } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

interface EditApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    id: string;
    name: string;
    type: "development" | "production";
    monthlyLimit?: number;
    enablePiiRestrictions?: boolean;
  }) => void;
  apiKey: {
    id: string;
    name: string;
    type: "development" | "production";
    monthlyLimit?: number;
    enablePiiRestrictions?: boolean;
  } | null;
}

export default function EditApiKeyModal({
  isOpen,
  onClose,
  onSave,
  apiKey,
}: EditApiKeyModalProps) {
  const [keyName, setKeyName] = useState("");
  const [keyType, setKeyType] = useState<"development" | "production">(
    "development"
  );
  const [hasMonthlyLimit, setHasMonthlyLimit] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState("1000");
  const [enablePiiRestrictions, setEnablePiiRestrictions] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setKeyName(apiKey.name);
      setKeyType(apiKey.type);
      setHasMonthlyLimit(!!apiKey.monthlyLimit);
      setMonthlyLimit(apiKey.monthlyLimit?.toString() || "1000");
      setEnablePiiRestrictions(!!apiKey.enablePiiRestrictions);
    }
  }, [apiKey]);

  const handleSubmit = () => {
    if (!keyName.trim() || !apiKey) return;

    onSave({
      id: apiKey.id,
      name: keyName.trim(),
      type: keyType,
      ...(hasMonthlyLimit ? { monthlyLimit: parseInt(monthlyLimit) } : {}),
      enablePiiRestrictions: enablePiiRestrictions,
    });
  };

  if (!isOpen || !apiKey) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 mx-4">
        <h2 className="text-2xl font-bold mb-4">Edit API key</h2>
        <p className="text-gray-600 mb-6">
          Enter a new limit for the API key and configure PII restrictions.
        </p>

        {/* Key Name */}
        <div className="mb-6">
          <label className="block mb-2">
            <span className="text-lg font-medium">Key Name</span>
            <span className="text-gray-500">
              {" "}
              — A unique name to identify this key
            </span>
          </label>
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="Key Name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Key Type */}
        <div className="mb-6">
          <label className="block mb-2">
            <span className="text-lg font-medium">Key Type</span>
            <span className="text-gray-500"> — Environment for this key</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer ${
                keyType === "production"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
              onClick={() => setKeyType("production")}
            >
              <div className="flex items-center gap-3 mb-2">
                <RocketLaunchIcon className="h-5 w-5 text-primary" />
                <span className="font-medium">Production</span>
              </div>
              <p className="text-sm text-gray-500">
                Rate limited to 1,000 requests/minute
              </p>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer ${
                keyType === "development"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
              onClick={() => setKeyType("development")}
            >
              <div className="flex items-center gap-3 mb-2">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">Development</span>
              </div>
              <p className="text-sm text-gray-500">
                Rate limited to 100 requests/minute
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Usage Limit */}
        <div className="mb-6">
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={hasMonthlyLimit}
              onChange={(e) => setHasMonthlyLimit(e.target.checked)}
            />
            <span>Limit monthly usage*</span>
          </label>

          {hasMonthlyLimit && (
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              className="input input-bordered w-full"
              min="1"
            />
          )}

          <p className="text-sm text-gray-500 mt-2">
            * If the combined usage of all your keys exceeds your plan&apos;s
            limit, all requests will be rejected.
          </p>
        </div>

        {/* PII Restrictions */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={enablePiiRestrictions}
              onChange={(e) => setEnablePiiRestrictions(e.target.checked)}
            />
            <span className="flex gap-2">
              <span>Enable PII Restrictions</span>
              <span className="text-gray-500">
                — Configure how to handle Personal Identifiable Information
                (PII) in user queries
              </span>
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={!keyName.trim()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
