import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  type: "development" | "production";
  usage?: number;
  monthlyLimit?: number;
  enablePiiRestrictions?: boolean;
}

interface ApiKeysState {
  items: ApiKey[];
  visibleKeyIds: string[];
  copiedKeyId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApiKeysState = {
  items: [],
  visibleKeyIds: [],
  copiedKeyId: null,
  loading: false,
  error: null,
};

export const apiKeysSlice = createSlice({
  name: "apiKeys",
  initialState,
  reducers: {
    // Create API Key
    createApiKey: (
      state,
      action: PayloadAction<{
        name: string;
        type: "development" | "production";
        monthlyLimit?: number;
      }>
    ) => {
      const newKey: ApiKey = {
        id: Math.random().toString(36).substring(7),
        name: action.payload.name,
        key: `dk_${Math.random().toString(36).substring(7)}`,
        createdAt: new Date().toISOString(),
        type: action.payload.type,
        monthlyLimit: action.payload.monthlyLimit,
      };
      state.items.push(newKey);
    },

    // Update API Key
    updateApiKey: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        type: "development" | "production";
        monthlyLimit?: number;
        enablePiiRestrictions?: boolean;
      }>
    ) => {
      const index = state.items.findIndex(
        (key) => key.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
      }
    },

    // Delete API Key
    deleteApiKey: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((key) => key.id !== action.payload);
    },

    // Toggle Key Visibility
    toggleKeyVisibility: (state, action: PayloadAction<string>) => {
      const index = state.visibleKeyIds.indexOf(action.payload);
      if (index === -1) {
        state.visibleKeyIds.push(action.payload);
      } else {
        state.visibleKeyIds.splice(index, 1);
      }
    },

    // Set Copied Key ID
    setCopiedKeyId: (state, action: PayloadAction<string | null>) => {
      state.copiedKeyId = action.payload;
    },

    // Set Loading State
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set Error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  createApiKey,
  updateApiKey,
  deleteApiKey,
  toggleKeyVisibility,
  setCopiedKeyId,
  setLoading,
  setError,
} = apiKeysSlice.actions;

// Selectors
export const selectApiKeys = (state: { apiKeys: ApiKeysState }) =>
  state.apiKeys.items;
export const selectVisibleKeyIds = (state: { apiKeys: ApiKeysState }) =>
  state.apiKeys.visibleKeyIds;
export const selectCopiedKeyId = (state: { apiKeys: ApiKeysState }) =>
  state.apiKeys.copiedKeyId;
export const selectLoading = (state: { apiKeys: ApiKeysState }) =>
  state.apiKeys.loading;
export const selectError = (state: { apiKeys: ApiKeysState }) =>
  state.apiKeys.error;

export default apiKeysSlice.reducer;
