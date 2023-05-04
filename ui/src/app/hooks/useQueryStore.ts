import { create } from "zustand";

export type QueryKey =
  | "lastBattleQuery"
  | "battlesByBeastQuery"
  | "battlesByTxHashQuery"
  | "beastByIdQuery"
  | "latestDiscoveriesQuery"
  | "discoveryByTxHashQuery"
  | "adventurersByOwnerQuery"
  | "adventurerByIdQuery"
  | "adventurersByGoldQuery"
  | "unclaimedItemsByAdventurerQuery"
  | "latestMarketItemsNumberQuery"
  | "latestMarketItemsQuery"
  | "adventurersInListQuery"
  | "itemsByAdventurerQuery";

type QueriesState = {
  data: Record<QueryKey, any>;
  isLoading: Record<QueryKey, boolean>;
  isDataUpdated: Record<QueryKey, boolean> & { global: boolean };
  refetchFunctions: Record<QueryKey, () => Promise<any>>;
  updateData: (
    queryKey: QueryKey,
    newData: any,
    loading: boolean,
    refetch: () => Promise<void>
  ) => void;
  refetch: (queryKey: QueryKey) => Promise<void>;
  resetDataUpdated: (queryKey?: QueryKey) => void;
};

const initialData: Record<QueryKey, any> = {
  lastBattleQuery: null,
  battlesByBeastQuery: null,
  battlesByTxHashQuery: null,
  beastByIdQuery: null,
  latestDiscoveriesQuery: null,
  discoveryByTxHashQuery: null,
  adventurersByOwnerQuery: null,
  adventurerByIdQuery: null,
  adventurersByGoldQuery: null,
  unclaimedItemsByAdventurerQuery: null,
  latestMarketItemsNumberQuery: null,
  latestMarketItemsQuery: null,
  adventurersInListQuery: null,
  itemsByAdventurerQuery: null,
};

const initialLoading: Record<QueryKey, boolean> = {
  lastBattleQuery: false,
  battlesByBeastQuery: false,
  battlesByTxHashQuery: false,
  beastByIdQuery: false,
  latestDiscoveriesQuery: false,
  discoveryByTxHashQuery: false,
  adventurersByOwnerQuery: false,
  adventurerByIdQuery: false,
  adventurersByGoldQuery: false,
  unclaimedItemsByAdventurerQuery: false,
  latestMarketItemsNumberQuery: false,
  latestMarketItemsQuery: false,
  adventurersInListQuery: false,
  itemsByAdventurerQuery: false,
};

const initialIsDataUpdated: Record<QueryKey, boolean> & { global: boolean } = {
  lastBattleQuery: false,
  battlesByBeastQuery: false,
  battlesByTxHashQuery: false,
  beastByIdQuery: false,
  latestDiscoveriesQuery: false,
  discoveryByTxHashQuery: false,
  adventurersByOwnerQuery: false,
  adventurerByIdQuery: false,
  adventurersByGoldQuery: false,
  unclaimedItemsByAdventurerQuery: false,
  latestMarketItemsNumberQuery: false,
  latestMarketItemsQuery: false,
  adventurersInListQuery: false,
  itemsByAdventurerQuery: false,
  global: false,
};

const initialRefetchFunctions: Record<QueryKey, () => Promise<any>> = {
  lastBattleQuery: async () => {},
  battlesByBeastQuery: async () => {},
  battlesByTxHashQuery: async () => {},
  beastByIdQuery: async () => {},
  latestDiscoveriesQuery: async () => {},
  discoveryByTxHashQuery: async () => {},
  adventurersByOwnerQuery: async () => {},
  adventurerByIdQuery: async () => {},
  adventurersByGoldQuery: async () => {},
  unclaimedItemsByAdventurerQuery: async () => {},
  latestMarketItemsNumberQuery: async () => {},
  latestMarketItemsQuery: async () => {},
  adventurersInListQuery: async () => {},
  itemsByAdventurerQuery: async () => {},
};

export const useQueriesStore = create<QueriesState>((set, get) => ({
  data: initialData,
  isLoading: initialLoading,
  isDataUpdated: initialIsDataUpdated,
  refetchFunctions: initialRefetchFunctions,
  updateData: (queryKey, newData, loading, refetch) => {
    set((state) => {
      if (JSON.stringify(state.data[queryKey]) !== JSON.stringify(newData)) {
        return {
          ...state,
          data: { ...state.data, [queryKey]: newData },
          isLoading: { ...state.isLoading, [queryKey]: loading },
          isDataUpdated: {
            ...state.isDataUpdated,
            [queryKey]: true,
            global: true,
          },
          refetchFunctions: { ...state.refetchFunctions, [queryKey]: refetch },
        };
      }
      return state;
    });
  },
  resetDataUpdated: (queryKey) => {
    if (queryKey) {
      set((state) => ({
        isDataUpdated: { ...state.isDataUpdated, [queryKey]: false },
      }));
    } else {
      set({ isDataUpdated: initialIsDataUpdated });
    }
  },
  refetch: async (queryKey: QueryKey) => {
    const { refetchFunctions } = get();
    const refetch = refetchFunctions[queryKey];

    if (refetch) {
      try {
        await refetch();
      } catch (error) {
        console.error(`Error refetching ${queryKey}:`, error);
      }
    } else {
      console.warn(`No refetch function found for query key: ${queryKey}`);
    }
  },
}));
