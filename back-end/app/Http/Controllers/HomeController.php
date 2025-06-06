<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Store;
use App\Models\Favorite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function getProducts(Request $request): JsonResponse
    {
        // Fetch Products with their associated stores
        $products = Product::with('store')->inRandomOrder()->limit(6)->get();
        $userId = $request->input("userId");

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

    public function getOfficialProducts(Request $request): JsonResponse
    {
        // Fetch Products with their associated stores
        $products = Product::with('store')->where('storeId', '1')->inRandomOrder()->limit(6)->get();
        $userId = $request->input("userId");

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

    public function getCategories(): JsonResponse
    {
        // Fetch 4 random Categories
        $categories = Category::where('name', '!=', 'Outros') // Prevent not get the 'Others' category
        ->inRandomOrder()
        ->limit(4)
        ->get();

        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }

    public function getStores(Request $request): JsonResponse
    {
        // Fetch Stores
        $stores = Store::all();

        return response()->json([
            'success' => true,
            'stores' => $stores,
        ]);
    }
}
