<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class SearchHistory extends Model
{
    // Definindo o nome da tabela
    protected $table = 'search_history';
    protected $fillable = ['userId', 'searchMessage'];

    // Relacionamento com o usuário
    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
} 
