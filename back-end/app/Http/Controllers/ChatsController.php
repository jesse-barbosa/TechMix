<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Store;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function getChats(Request $request): JsonResponse
    {
        $userId = $request->input("userId");

        // Fetch Chats
        $chats = Chat::where('userId', $userId)->get();

        $transformedChats = $chats->map(function ($chat) {
            $lastMessage = Message::where('chatId', $chat->id)->orderBy('created_at', 'desc')->first();

            return [
                'id' => $chat->id,
                'store' => [
                    'name' => $chat->store->name,
                    'imageURL' => $chat->store->imageURL,
                ],
                'lastMessage' => $lastMessage->message,
            ];
        });

        return response()->json([
            'success' => true,
            'chats' => $transformedChats,
        ]);
    }
}
