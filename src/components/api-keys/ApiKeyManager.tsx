"use client";

import { useState, useEffect } from "react";
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
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import CreateApiKeyModal from "./CreateApiKeyModal";
import EditApiKeyModal from "./EditApiKeyModal";
import ViewApiKeyModal from "./ViewApiKeyModal";
import {
  useGetApiKeysQuery,
  useCreateApiKeyMutation,
  useUpdateApiKeyMutation,
  useDeleteApiKeyMutation,
  type ApiKey,
} from "@/redux/services/apiKeysApi";
import toast from "react-hot-toast";

export default function ApiKeyManager() {
  // RTK Query hooks
  const { data: apiKeys = [], isLoading: isLoadingKeys } = useGetApiKeysQuery();
  const [createApiKey, { isLoading: isCreating, isSuccess: isCreateSuccess }] =
    useCreateApiKeyMutation();
  const [updateApiKey, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useUpdateApiKeyMutation();
  const [deleteApiKey, { isSuccess: isDeleteSuccess }] =
    useDeleteApiKeyMutation();

  // Add useEffect hooks for success toasts
  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("API key created successfully");
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("API key updated successfully");
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("API key deleted successfully");
    }
  }, [isDeleteSuccess]);

  // Local state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [viewingKey, setViewingKey] = useState<ApiKey | null>(null);
  const [payAsYouGo, setPayAsYouGo] = useState(false);
  const [visibleKeyIds, setVisibleKeyIds] = useState<string[]>([]);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [copyingKeyId, setCopyingKeyId] = useState<string | null>(null);
  const [deletingKeyId, setDeletingKeyId] = useState<string | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null);

  const handleCreateKey = async (data: {
    name: string;
    type: "development" | "production";
    monthlyLimit?: number;
  }) => {
    await createApiKey(data);
    setShowCreateModal(false);
  };

  const handleSaveEdit = async (data: {
    id: string;
    name: string;
    type: "development" | "production";
    monthlyLimit?: number;
    enablePiiRestrictions?: boolean;
  }) => {
    await updateApiKey(data);
    setEditingKey(null);
  };

  const handleDeleteKey = async (id: string) => {
    setDeletingKeyId(id);
    await deleteApiKey(id);
    setKeyToDelete(null);
    setDeletingKeyId(null);
  };

  const handleCopyKey = async (key: string, id: string) => {
    try {
      setCopyingKeyId(id);
      await navigator.clipboard.writeText(key);
      setCopiedKeyId(id);
      toast.success("API key copied to clipboard");
      setTimeout(() => setCopiedKeyId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy API key");
    } finally {
      setCopyingKeyId(null);
    }
  };

  const handleToggleKeyVisibility = (id: string) => {
    setVisibleKeyIds((prev) =>
      prev.includes(id) ? prev.filter((keyId) => keyId !== id) : [...prev, id]
    );
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
            disabled={isCreating}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            {isCreating ? "Creating..." : "Create API Key"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {isLoadingKeys ? (
            <div className="text-center py-6">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : apiKeys.length === 0 ? (
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
                            disabled={copyingKeyId === key.id}
                            title="Copy key"
                          >
                            {copiedKeyId === key.id ? (
                              <CheckIcon className="h-4 w-4 text-success" />
                            ) : copyingKeyId === key.id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <ClipboardDocumentIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setEditingKey(key)}
                            className="btn btn-ghost btn-sm btn-square"
                            disabled={isUpdating}
                            title="Edit key"
                          >
                            {isUpdating && editingKey?.id === key.id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <PencilIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setKeyToDelete(key)}
                            className="btn btn-ghost btn-sm btn-square"
                            disabled={deletingKeyId === key.id}
                            title="Delete key"
                          >
                            {deletingKeyId === key.id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
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

      {/* Delete Confirmation Modal */}
      <dialog
        id="delete_confirm_modal"
        className={`modal ${keyToDelete ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <div className="flex items-center gap-3 text-error">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <h3 className="font-bold text-lg">Delete API Key</h3>
          </div>

          <p className="py-4">
            Are you sure you want to delete the API key &ldquo;
            {keyToDelete?.name}&rdquo;? This action cannot be undone.
          </p>

          <div className="modal-action">
            <button className="btn" onClick={() => setKeyToDelete(null)}>
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={() => keyToDelete && handleDeleteKey(keyToDelete.id)}
              disabled={!!deletingKeyId}
            >
              {deletingKeyId ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setKeyToDelete(null)}>close</button>
        </form>
      </dialog>

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
