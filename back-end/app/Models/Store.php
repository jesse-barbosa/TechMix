<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'description',
        'cnpj',
        'imageURL',
        'street',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state',
        'postalCode',
        'status',
    ];

    // Relacionamento com o produto
    public function product()
    {
        return $this->hasMany(Product::class, 'storeId', 'id');
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
