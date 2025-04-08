import { useState } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

interface CreateApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateKey: (data: {
    name: string;
    type: "development" | "production";
    monthlyLimit?: number;
  }) => void;
}

export default function CreateApiKeyModal({
  isOpen,
  onClose,
  onCreateKey,
}: CreateApiKeyModalProps) {
  const [keyName, setKeyName] = useState("");
  const [keyType, setKeyType] = useState<"development" | "production">(
    "development"
  );
  const [hasMonthlyLimit, setHasMonthlyLimit] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState("1000");

  const handleSubmit = () => {
    if (!keyName.trim()) return;

    onCreateKey({
      name: keyName.trim(),
      type: keyType,
      ...(hasMonthlyLimit ? { monthlyLimit: parseInt(monthlyLimit) } : {}),
    });

    // Reset form
    setKeyName("");
    setKeyType("development");
    setHasMonthlyLimit(false);
    setMonthlyLimit("1000");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 mx-4">
        <h2 className="text-2xl font-bold mb-4">Create a new API key</h2>
        <p className="text-gray-600 mb-6">
          Enter a name and limit for the new API key.
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
            <span className="text-gray-500">
              {" "}
              — Choose the environment for this key
            </span>
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
            * If the combined usage of all your keys exceeds your plan's limit,
            all requests will be rejected.
          </p>
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
