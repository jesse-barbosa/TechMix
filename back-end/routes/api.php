<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\FavsController;

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/getProducts', [HomeController::class, 'getProducts']);

Route::get('/searchProducts', [SearchController::class, 'searchProducts']);

Route::get('/getSavedProducts', [FavsController::class, 'getSavedProducts']);