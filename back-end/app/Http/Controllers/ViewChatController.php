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
    
    public function getMessages(Request $request): JsonResponse
    {
        $chatId = $request->input("chatId");
    
        // Buscar mensagens
        $messages = Message::where('chatId', $chatId)->get();
    
        return response()->json([
            'success' => true,
            'messages' => $messages,
        ]);
    }

    public function sendMessage(Request $request): JsonResponse
    {
        // Validate input data
        $request->validate([
            'chatId' => 'required|exists:chats,id',
            'userId' => 'required|exists:users,id',
            'message' => 'required|string|max:500',
        ]);

        $chatId = $request->input('chatId');
        $userId = $request->input('userId');
        $message = $request->input('message');
    
        // Enviar mensagem
        $message = Message::create([
            'chatId' => $chatId,
            'senderId' => $userId,
            'senderType' => 'user',
            'message' => $message,
        ]);
    
        return response()->json([
            'success' => true,
            'message' => $message,
        ]);
    }
}