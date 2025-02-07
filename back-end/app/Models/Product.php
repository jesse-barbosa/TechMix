<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = ['name', 'description', 'price', 'imageURL', 'storeId', 'status'];

    // Relacionamento com a loja
    public function store()
    {
        return $this->belongsTo(Store::class, 'storeId');
    }

    // Relacionamento com as avaliações
    public function reviews(){
        return $this->hasMany(Review::class, 'productId', 'id');
    }
}
