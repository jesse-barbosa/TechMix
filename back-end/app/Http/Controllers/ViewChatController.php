<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Store;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ViewChatController extends Controller
{
    public function getChatData(Request $request): JsonResponse
    {
        $chatId = $request->input("chatId");
    
        // Buscar ID da loja
        $storeId = Chat::where('id', $chatId)->first()->storeId;

        // Buscar dados da loja
        $store = Store::where('id', $storeId)->first();
        
        if (!$store) {
            return response()->json(['success' => false, 'message' => 'Loja não encontrada'], 404);
        }
    
        return response()->json([
            'success' => true,
            'store' => $store,
        ]);
    }   
}
