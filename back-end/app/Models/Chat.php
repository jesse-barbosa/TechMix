<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = 'chats';

    protected $fillable = ['userId', 'storeId'];
    public $timestamps = true;

    // Relacionamento com o usuário
    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }

    // Relacionamento com a loja
    public function store()
    {
        return $this->belongsTo(Store::class, 'storeId', 'id');
    }
}
