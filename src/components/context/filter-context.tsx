"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type ViewMode = "list" | "grid";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        viewMode,
        setViewMode,
        isFilterModalOpen,
        setIsFilterModalOpen,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
