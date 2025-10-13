import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import StoreFilterSidebar from "./StoreFilterSidebar";

const MobileStoreModal = ({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  storeType,
  onStoreTypeChange,
  sortBy,
  onSortChange,
  stores
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={onClose}>
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
            </div>
            
            <StoreFilterSidebar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
              storeType={storeType}
              onStoreTypeChange={onStoreTypeChange}
              sortBy={sortBy}
              onSortChange={onSortChange}
              stores={stores}
              isMobile={true}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStoreModal;