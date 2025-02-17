<?php
namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function toggleFavorite(Request $request)
    {
        $productId = $request->input("productId");
        $userId = $request->input("userId");

        $favorite = Favorite::where('userId', $userId)
                            ->where('productId', $productId)
                            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Produto removido dos favoritos']);
        } else {
            Favorite::create([
                'userId' => $userId,
                'productId' => $productId
            ]);
            return response()->json(['message' => 'Produto salvo nos favoritos']);
        }
    }
}