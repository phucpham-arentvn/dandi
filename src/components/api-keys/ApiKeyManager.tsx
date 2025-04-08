"use client";

import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import CreateApiKeyModal from "./CreateApiKeyModal";
import EditApiKeyModal from "./EditApiKeyModal";
import ViewApiKeyModal from "./ViewApiKeyModal";
import {
  selectApiKeys,
  selectVisibleKeyIds,
  selectCopiedKeyId,
  createApiKey,
  updateApiKey,
  deleteApiKey,
  toggleKeyVisibility,
  setCopiedKeyId,
  type ApiKey,
} from "@/redux/features/apiKeys/apiKeysSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function ApiKeyManager() {
  const dispatch = useAppDispatch();
  const apiKeys = useAppSelector(selectApiKeys);
  const visibleKeyIds = useAppSelector(selectVisibleKeyIds);
  const copiedKeyId = useAppSelector(selectCopiedKeyId);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [viewingKey, setViewingKey] = useState<ApiKey | null>(null);
  const [payAsYouGo, setPayAsYouGo] = useState(false);

  const handleCreateKey = async (data: {
    name: string;
    type: "development" | "production";
    monthlyLimit?: number;
  }) => {
    dispatch(createApiKey(data));
    setShowCreateModal(false);
  };

  const handleSaveEdit = async (data: {
    id: string;
    name: string;
    type: "development" | "production";
    monthlyLimit?: number;
    enablePiiRestrictions?: boolean;
  }) => {
    dispatch(updateApiKey(data));
    setEditingKey(null);
  };

  const handleDeleteKey = async (id: string) => {
    dispatch(deleteApiKey(id));
  };

  const handleCopyKey = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key);
      dispatch(setCopiedKeyId(id));
      setTimeout(() => dispatch(setCopiedKeyId(null)), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleToggleKeyVisibility = (id: string) => {
    dispatch(toggleKeyVisibility(id));
  };

  return (
    <div className="space-y-6">
      <CreateApiKeyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateKey={handleCreateKey}
      />

      <EditApiKeyModal
        isOpen={!!editingKey}
        onClose={() => setEditingKey(null)}
        onSave={handleSaveEdit}
        apiKey={editingKey}
      />

      <ViewApiKeyModal
        isOpen={!!viewingKey}
        onClose={() => setViewingKey(null)}
        apiKey={viewingKey}
      />

      {/* Current Plan Card */}
      <div className="card bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">
                CURRENT PLAN
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Researcher
              </h2>
            </div>
            <button className="btn btn-outline">Manage Plan</button>
          </div>

          <div className="space-y-4 w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                API Usage
              </span>
              <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
            </div>

            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white/50 h-2 rounded-full"
                style={{
                  width: `${Math.min((apiKeys.length / 100) * 100, 100)}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Plan</span>
              <span>{apiKeys.length}/100 API Keys</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={payAsYouGo}
                    onChange={(e) => setPayAsYouGo(e.target.checked)}
                  />
                  <span className="label-text">Pay as you go</span>
                  <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">API Keys</h3>
            <p className="text-sm text-gray-600">
              The key is used to authenticate your requests to the Research API.
              <a
                href="/documentation"
                className="text-primary hover:underline ml-1"
              >
                Learn more in the documentation
              </a>
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create API Key
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {apiKeys.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">
                No API keys found. Create one to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gray-50">
                    <th>NAME</th>
                    <th>TYPE</th>
                    <th>USAGE</th>
                    <th>KEY</th>
                    <th className="text-right">OPTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key) => (
                    <tr key={key.id} className="border-t">
                      <td className="font-medium">{key.name}</td>
                      <td>{key.type}</td>
                      <td>{key.usage || 0}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 rounded bg-gray-100 font-mono text-sm">
                            {visibleKeyIds.includes(key.id)
                              ? key.key
                              : "••••••••••••••••"}
                          </code>
                          <button
                            onClick={() => handleToggleKeyVisibility(key.id)}
                            className="btn btn-ghost btn-sm btn-square"
                          >
                            {visibleKeyIds.includes(key.id) ? (
                              <EyeSlashIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setViewingKey(key)}
                            className="btn btn-ghost btn-sm btn-square"
                            title="View key details"
                          >
                            <DocumentMagnifyingGlassIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCopyKey(key.key, key.id)}
                            className="btn btn-ghost btn-sm btn-square"
                            title="Copy key"
                          >
                            {copiedKeyId === key.id ? (
                              <CheckIcon className="h-4 w-4 text-success" />
                            ) : (
                              <ClipboardDocumentIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setEditingKey(key)}
                            className="btn btn-ghost btn-sm btn-square"
                            title="Edit key"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteKey(key.id)}
                            className="btn btn-ghost btn-sm btn-square"
                            title="Delete key"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-gray-600">
          Have any questions, feedback or need support?
        </p>
        <button className="btn btn-outline">Contact us</button>
      </div>
    </div>
  );
}
