import { TouchableOpacity, View, Text } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React from "react";

export const PaginationControls = ({ paginationInfo, currentPage, setCurrentPage, searchTerm, categoryId, getVisitedProducts, search }: { paginationInfo: any, currentPage: number, setCurrentPage: (page: number) => void, searchTerm: string, categoryId: string, getVisitedProducts: () => void, search: () => void }) => {
    if (paginationInfo.totalPages <= 1) return null;
    
    const handlePageChange = (newPage: number) => {
      if (newPage < 1 || newPage > paginationInfo.totalPages) return;
      console.log("Changing to page:", newPage);
      setCurrentPage(newPage);
      // Use the currentPage in a callback to ensure we have the updated value
      if (searchTerm.length === 0 && !categoryId) {
        getVisitedProducts();
      } else {
        search();
      }
    };
    
    return (
      <View className="flex-row justify-center items-center my-4">
        <TouchableOpacity 
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${currentPage === 1 ? 'opacity-50' : ''}`}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color="#C0C0C0" />
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          {paginationInfo.totalPages <= 5 ? (
            // Show all pages if 5 or fewer
            Array.from({ length: paginationInfo.totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <TouchableOpacity
                  key={pageNum}
                  onPress={() => handlePageChange(pageNum)}
                  activeOpacity={0.7}
                  className={`w-10 h-10 rounded-full mx-1 items-center justify-center ${
                    currentPage === pageNum ? 'bg-yellow-500' : 'bg-neutral-700'
                  }`}
                >
                  <Text className={`${
                    currentPage === pageNum ? 'text-neutral-800' : 'text-neutral-200'
                  } font-bold`}>{pageNum}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            // Show limited pages with ellipsis for many pages
            <>
              {currentPage > 2 && (
                <TouchableOpacity
                  onPress={() => handlePageChange(1)}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full mx-1 items-center justify-center bg-neutral-700"
                >
                  <Text className="text-neutral-200 font-bold">1</Text>
                </TouchableOpacity>
              )}
              
              {currentPage > 3 && (
                <Text className="text-neutral-400 mx-1">...</Text>
              )}
              
              {currentPage > 1 && (
                <TouchableOpacity
                  onPress={() => handlePageChange(currentPage - 1)}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full mx-1 items-center justify-center bg-neutral-700"
                >
                  <Text className="text-neutral-200 font-bold">{currentPage - 1}</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                activeOpacity={1}
                className="w-10 h-10 rounded-full mx-1 items-center justify-center bg-yellow-500"
              >
                <Text className="text-neutral-800 font-bold">{currentPage}</Text>
              </TouchableOpacity>
              
              {currentPage < paginationInfo.totalPages && (
                <TouchableOpacity
                  onPress={() => handlePageChange(currentPage + 1)}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full mx-1 items-center justify-center bg-neutral-700"
                >
                  <Text className="text-neutral-200 font-bold">{currentPage + 1}</Text>
                </TouchableOpacity>
              )}
              
              {currentPage < paginationInfo.totalPages - 2 && (
                <Text className="text-neutral-400 mx-1">...</Text>
              )}
              
              {currentPage < paginationInfo.totalPages - 1 && (
                <TouchableOpacity
                  onPress={() => handlePageChange(paginationInfo.totalPages)}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full mx-1 items-center justify-center bg-neutral-700"
                >
                  <Text className="text-neutral-200 font-bold">{paginationInfo.totalPages}</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        
        <TouchableOpacity 
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === paginationInfo.totalPages}
          activeOpacity={0.7}
          className={`p-2 ${currentPage === paginationInfo.totalPages ? 'opacity-50' : ''}`}
        >
          <ChevronRight size={28} color="#C0C0C0" />
        </TouchableOpacity>
      </View>
    );
  };