<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchProducts(Request $request): JsonResponse
    {
        $searchTerm = $request->input("search");

        if (!$searchTerm) {
            return response()->json([
                'success' => false,
                'products' => [],
                'message' => 'No search term provided'
            ]);
        }

        // Fetch Products with their associated stores
        $products = Product::where('name', 'like', '%'. $searchTerm .'%')->get();

        // Transform the data to include only necessary store information
        $transformedProducts = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'imageURL' => $product->imageURL,
                'store' => [
                    'name' => $product->store->name,
                    'city' => $product->store->city,
                ],
            ];
        });

        return response()->json([
            'success' => true,
            'products' => $transformedProducts,
        ]);
    }
}
