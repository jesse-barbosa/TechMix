<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Favorite;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchProducts(Request $request): JsonResponse
    {
        $searchTerm = $request->input("search");
        $userId = $request->input("userId");

        if (!$searchTerm) {
        // Fetch all products with their associated stores if no search term is provided
            $products = Product::with('store')->get();
        } else {
        // Fetch Products with their associated stores
        $products = Product::where('name', 'like', '%'. $searchTerm .'%')->with('store')->get();
        }

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
}
