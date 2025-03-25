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
    
        // Buscar a loja
        $store = Store::where('id', $storeId)->first();
        if (!$store) {
            return response()->json(['success' => false, 'message' => 'Loja não encontrada'], 404);
        }
    
        // Buscar os produtos da loja
        $products = Product::where("storeId", $storeId)->pluck('id');
    
        // Buscar as avaliações dos produtos da loja
        $reviews = \DB::table('reviews')->whereIn('productId', $products);
        
        $averageRating = $reviews->avg('stars'); // Média das notas
        $totalReviews = $reviews->count();
    
        // Transformar os dados da loja
        $transformedStore = [
            'id' => $store->id,
            'name' => $store->name,
            'imageURL' => $store->imageURL,
            'description' => $store->description,
            'city' => $store->city,
            'averageRating' => round($averageRating ?? 0, 1), // Arredonda e trata valores nulos
            'totalReviews' => $totalReviews,
        ];
    
        return response()->json([
            'success' => true,
            'store' => $transformedStore,
            'products' => Product::with("store")->where("storeId", $storeId)->get(),
        ]);
    }    
}
