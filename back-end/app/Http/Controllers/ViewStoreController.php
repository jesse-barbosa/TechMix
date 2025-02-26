<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ViewStoreController extends Controller
{
    public function getStoreData(Request $request): JsonResponse
    {
        $storeId = $request->input("storeId");

        $store = Store::where('id', $storeId)->first();
        $userId = $request->input("userId");

        $products = Product::with("store")->where("storeId", $storeId)->get();

        // Transform the data
        $transformedstore = [
            'id' => $store->id,
            'name' => $store->name,
            'imageURL' => $store->imageURL,
            'description' => $store->description,
            'city' => $store->city,
            'created_at' => $store->created_at,
        ];

        return response()->json([
            'success' => true,
            'store' => $transformedstore,
            'products' => $products,
        ]);
    }
}
