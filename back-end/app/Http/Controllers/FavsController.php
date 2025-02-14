<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavsController extends Controller
{
    public function getSavedProducts(Request $request): JsonResponse
    {
        $userId = $request->input("userId");

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'User ID is required',
            ]);
        }

        // Fetch Saved Products with their associated stores
        $savedProducts = DB::table('favorites')
            ->join('products', 'favorites.productId', '=', 'products.id')
            ->join('stores', 'products.storeId', '=', 'stores.id')
            ->where('favorites.userId', $userId)
            ->select(
                'products.*',
                'stores.name as store_name',
                'stores.city as store_city'
            )
            ->get();

        // Transform the data to include only necessary store information
        $transformedProducts = $savedProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'imageURL' => $product->imageURL,
                'store' => [
                    'name' => $product->store_name,
                    'city' => $product->store_city,
                ],
            ];
        });

        return response()->json([
            'success' => true,
            'products' => $transformedProducts,
        ]);
    }
}
