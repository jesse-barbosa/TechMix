<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;

class VisitedProduct extends Model
{
    // Definindo o nome da tabela
    protected $table = 'visited_products';
    protected $fillable = ['userId', 'productId'];

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
