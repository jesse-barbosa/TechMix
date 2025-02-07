<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['userId', 'productId', 'stars', 'message', 'created_at',];

    // Relacionamento com o usuário
    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
    // Relacionamento com o produto
    public function product()
    {
        return $this->belongsTo(Product::class, 'productId', 'id');
    }
} 
