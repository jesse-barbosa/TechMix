<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use App\Models\Favorite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ViewProductController extends Controller
{
    public function getProductData(Request $request): JsonResponse
    {
        $productId = $request->input("productId");

        $product = Product::with('store')->where('id', $productId)->get();
        $userId = $request->input("userId");

        $reviews = Review::with("user")->where("productId", $productId)->get();

        // Transform the data to include only necessary store information
        $transformedProduct = $product->map(function ($product) use ($userId) {
            $isSaved = Favorite::where('userId', $userId)->where('productId', $product->id)->exists();
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'imageURL' => $product->imageURL,
                'store' => [
                    'id' => $product->store->id,
                    'name' => $product->store->name,
                    'city' => $product->store->city,
                ],
                'created_at' => $product->created_at,
                'saved' => $isSaved,
            ];
        });

        return response()->json([
            'success' => true,
            'product' => $transformedProduct,
            'reviews' => $reviews,
        ]);
    }
    public function addReview(Request $request): JsonResponse
    {
        // Validate input data
        $request->validate([
            'userId' => 'required|exists:users,id',
            'productId' => 'required|exists:products,id',
            'stars' => 'required|integer|min:1|max:5',
            'message' => 'required|string|max:500',
        ]);
        
        try {
            // Create new review
            $review = Review::create([
                'userId' => $request->input('userId'),
                'productId' => $request->input('productId'),
                'stars' => $request->input('stars'),
                'message' => $request->input('message'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Review added successfully!',
                'review' => $review,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to add review. Please try again.',
                'data' => $request,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
