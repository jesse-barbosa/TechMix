<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Category;
use App\Models\VisitedProduct;
use App\Models\SearchHistory;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{

    public function setVisitedProduct(Request $request): JsonResponse
    {
        $userId = $request->input("userId");
        $productId = $request->input("productId");
    
        if (!$userId || !$productId) {
            return response()->json([
                'success' => false,
                'message' => 'User ID and Product ID are required',
            ], 400);
        }
    
        // Verifica se já existe um histórico com o produto para o usuário
        $existingHistory = VisitedProduct::where('userId', $userId)
            ->where('productId', $productId)
            ->first();
    
        if ($existingHistory) {
            // Apenas atualiza o updated_at para trazer para o topo na exibição
            $existingHistory->touch();
        } else {
            // Cria um novo histórico caso não exista
            VisitedProduct::create([
                'userId' => $userId,
                'productId' => $productId,
            ]);
        }
    
        return response()->json([
            'success' => true,
            'message' => 'Sucessfully added to visited products',
        ]);
    }

    public function getVisitedProducts(Request $request): JsonResponse
    {
        $userId = $request->input("userId");

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'User ID is required',
            ]);
        }

        // Fetch Saved Products with their associated stores
        $visitedProducts = DB::table('visited_products')
            ->join('products', 'visited_products.productId', '=', 'products.id')
            ->join('stores', 'products.storeId', '=', 'stores.id')
            ->where('visited_products.userId', $userId)
            ->select(
                'products.*',
                'stores.name as store_name',
                'stores.city as store_city'
            )
            ->get();

        // Transform the data to include only necessary store information
        $transformedProducts = $visitedProducts->map(function ($product) use ($userId) {

            $isSaved = Favorite::where('userId', $userId)->where('productId', $product->id)->exists();
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'imageURL' => $product->imageURL,
                'store' => [
                    'name' => $product->store_name,
                    'city' => $product->store_city,
                ],
                'saved' => $isSaved,
            ];
        });

        return response()->json([
            'success' => true,
            'visitedProducts' => $transformedProducts,
        ]);
    }

    public function deleteVisitedProducts(Request $request): JsonResponse
    {
        $userId = $request->input("userId");
    
        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'User ID are required',
            ], 400);
        }
    
        $visitedProducts = VisitedProduct::where('userId', $userId)
            ->delete();
          
        return response()->json([
            'success' => true,
            'message' => 'Visited procucts deleted sucessfully',
        ]);
    }

    public function getSearchHistory(Request $request): JsonResponse 
    {
        $userId = $request->input("userId");
        $searchTerm = $request->input("searchTerm");
    
        $query = SearchHistory::where('userId', $userId);
    
        if (!empty($searchTerm)) {
            $query->where('searchMessage', 'LIKE', "%{$searchTerm}%");
        }
    
        $searchHistory = $query->orderBy('updated_at', 'desc')->get();
    
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
        $searchType = $request->input("searchType", "product");
        $category = $request->input("category");
        $location = $request->input("location");
    
        if (!$userId || !$searchTerm) {
            return response()->json([
                'success' => false,
                'message' => 'User ID and search term are required',
            ], 400);
        }
    
        // Inicia a query base
        $query = Product::where('name', 'like', '%'. $searchTerm .'%');
        
        // Aplica filtro por categoria se especificado
        if ($category) {
            $query->whereHas('category', function($q) use ($category) {
                $q->where('name', $category);
            });
        }
        
        // Aplica filtro por localização se especificado
        if ($location) {
            $query->where(function($q) use ($location) {
                $q->where('location', $location)
                  ->orWhereHas('store', function($sq) use ($location) {
                      $sq->where('location', $location)
                         ->orWhere('city', $location);
                  });
            });
        }
        
        // Se o tipo de busca for loja, filtra apenas produtos relacionados a essa loja
        if ($searchType === 'store') {
            $query->whereHas('store', function($q) use ($searchTerm) {
                $q->where('name', 'like', '%'. $searchTerm .'%');
            });
        }
        
        // Obtém os produtos com seus relacionamentos
        $products = $query->with('store')->get();
    
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

    public function getLocations(Request $request): JsonResponse
    {
        $searchTerm = $request->input("search");
    
        // Buscar produtos com base no termo de pesquisa e pegar cidade da loja
        $locations = Product::where('products.name', 'like', '%' . $searchTerm . '%')
            ->leftJoin('stores', 'products.storeId', '=', 'stores.id')
            ->select('stores.city')
            ->distinct()
            ->pluck('city');
    
        return response()->json([
            'success' => true,
            'locations' => $locations,
        ]);
    }    
}