<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Categorie;
use App\Models\SearchHistory;
use App\Models\Favorite;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getSearchHistory(Request $request): JsonResponse 
    {
        $userId = $request->input("userId");
    
        // Fetch history in descending order by 'created_at'
        $searchHistory = SearchHistory::where('userId', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    
        return response()->json([
            'success' => true,
            'searchHistory' => $searchHistory,
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

        // Fetch Products with their associated stores
        $products = Product::where('name', 'like', '%'. $searchTerm .'%')->with('store')->get();

        // Create search history
        SearchHistory::create([
            'userId' => $userId,
            'searchMessage' => $searchTerm,
        ]);

        // Transform the data to include only necessary store information
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
        $categories = Categorie::get();

        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }
}
