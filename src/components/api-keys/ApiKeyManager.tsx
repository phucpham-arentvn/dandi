"use client";

import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    // TODO: Replace with actual API call
    const newKey: ApiKey = {
      id: Math.random().toString(36).substring(7),
      name: newKeyName,
      key: `dk_${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
    };

    setApiKeys((prev) => [...prev, newKey]);
    setNewKeyName("");
    setShowCreateForm(false);
  };

  const handleDeleteKey = async (id: string) => {
    // TODO: Replace with actual API call
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">API Keys</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create API Key
        </button>
      </div>

      {showCreateForm && (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Create New API Key</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Key Name</span>
              </label>
              <input
                type="text"
                id="keyName"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter key name"
              />
            </div>
            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => setShowCreateForm(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleCreateKey} className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          {apiKeys.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-base-content/60">
                No API keys found. Create one to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>API Key</th>
                    <th>Created</th>
                    <th>Last Used</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key) => (
                    <tr key={key.id}>
                      <td className="font-medium">{key.name}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <code className="bg-base-300 px-2 py-1 rounded">
                            {visibleKeys.has(key.id)
                              ? key.key
                              : "••••••••••••••••"}
                          </code>
                          <button
                            onClick={() => toggleKeyVisibility(key.id)}
                            className="btn btn-ghost btn-sm btn-square"
                          >
                            {visibleKeys.has(key.id) ? (
                              <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td>{new Date(key.createdAt).toLocaleDateString()}</td>
                      <td>
                        {key.lastUsed
                          ? new Date(key.lastUsed).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => handleDeleteKey(key.id)}
                          className="btn btn-ghost btn-sm btn-square text-error"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
