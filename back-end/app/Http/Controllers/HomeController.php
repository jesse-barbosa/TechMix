<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;

class HomeController extends Controller
{
    public function getProducts()
    {
        // Fetch Products with their associated stores
        $products = Product::with('store')->get();

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
