<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Category;
use App\Models\SearchHistory;
use App\Models\Favorite;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getSearchHistory(Request $request): JsonResponse 
    {
        $userId = $request->input("userId");
    
        // Fetch history in descending order by 'updated_at'
        $searchHistory = SearchHistory::where('userId', $userId)
            ->orderBy('updated_at', 'desc')
            ->get();
    
        return response()->json([
            'success' => true,
            'searchHistory' => $searchHistory,
        ]);
    }

    public function deleteSearchHistory(Request $request): JsonResponse 
    {
        $searchHistoryId = $request->input("id");
    
        // Delete Search History
        $searchHistory = SearchHistory::where('id', $searchHistoryId)
            ->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'Search History deleted successfully',
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $searchTerm = $request->input("search");
        $userId = $request->input("userId");
    
        if (!$userId || !$searchTerm) {
            return response()->json([
                'success' => false,
                'message' => 'User ID and search term are required',
            ], 400);
        }
    
        // Buscar produtos com base no termo de pesquisa
        $products = Product::where('name', 'like', '%'. $searchTerm .'%')
            ->with('store')
            ->get();
    
        // Verifica se já existe um histórico com a mesma mensagem para o usuário
        $existingHistory = SearchHistory::where('userId', $userId)
            ->where('searchMessage', $searchTerm)
            ->first();
    
        if ($existingHistory) {
            // Apenas atualiza o updated_at para trazer para o topo na exibição
            $existingHistory->touch();
        } else {
            // Cria um novo histórico caso não exista
            SearchHistory::create([
                'userId' => $userId,
                'searchMessage' => $searchTerm,
            ]);
        }
    
        // Transformar os produtos para incluir apenas as informações necessárias
        $transformedProducts = $products->map(function ($product) use ($userId) {
            $isSaved = Favorite::where('userId', $userId)->where('productId', $product->id)->exists();
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'imageURL' => $product->imageURL,
                'store' => [
                    'name' => $product->store->name,
                    'city' => $product->store->city,
                ],
                'saved' => $isSaved,
            ];
        });
    
        return response()->json([
            'success' => true,
            'products' => $transformedProducts,
        ]);
    }
    

    public function getAllCategories(): JsonResponse
    {
        // Fetch Categories
        $categories = Category::get();

        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }
}
