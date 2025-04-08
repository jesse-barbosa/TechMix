<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'messages';

    protected $fillable = ['chatId', 'senderId', 'senderType', 'message'];
    public $timestamps = true;

    // Relacionamento com a conversa
    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chatId', 'id');
    }

    // Relacionamento com o usuário
    public function user()
    {
        return $this->belongsTo(User::class, 'senderId', 'id');
    }

    // Relacionamento com a loja
    public function store()
    {
        return $this->belongsTo(Store::class, 'senderId', 'id');
    }
}
