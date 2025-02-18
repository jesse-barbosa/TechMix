<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FavsController;

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/getProducts', [HomeController::class, 'getProducts']);

Route::get('/getStores', [HomeController::class, 'getStores']);

Route::get('/searchProducts', [SearchController::class, 'searchProducts']);

Route::post('/toggleFavorite', [FavoriteController::class, 'toggleFavorite']);

Route::get('/getSavedProducts', [FavsController::class, 'getSavedProducts']);