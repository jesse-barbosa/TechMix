<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FavsController;
use App\Http\Controllers\ViewProductController;
use App\Http\Controllers\ViewStoreController;

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::get('/getProducts', [HomeController::class, 'getProducts']);

Route::get('/getOfficialProducts', [HomeController::class, 'getOfficialProducts']);

Route::get('/getStores', [HomeController::class, 'getStores']);

Route::get('/getChats', [ChatsController::class, 'getChats']);

Route::get('/getCategories', [HomeController::class, 'getCategories']);

Route::get('/getVisitedProducts', [SearchController::class, 'getVisitedProducts']);

Route::post('/setVisitedProduct', [SearchController::class, 'setVisitedProduct']);

Route::post('/deleteVisitedProducts', [SearchController::class, 'deleteVisitedProducts']);

Route::get('/getSearchHistory', [SearchController::class, 'getSearchHistory']);

Route::post('/deleteSearchHistory', [SearchController::class, 'deleteSearchHistory']);

Route::post('/search', [SearchController::class, 'search']);

Route::get('/getAllCategories', [SearchController::class, 'getAllCategories']);

Route::get('/getLocations', [SearchController::class, 'getLocations']);

Route::post('/toggleFavorite', [FavoriteController::class, 'toggleFavorite']);

Route::get('/getSavedProducts', [FavsController::class, 'getSavedProducts']);

Route::get('/getProductData', [ViewProductController::class, 'getProductData']);

Route::post('/addReview', [ViewProductController::class, 'addReview']);

Route::post('/deleteReview', [ViewProductController::class, 'deleteReview']);

Route::get('/getStoreData', [ViewStoreController::class, 'getStoreData']);
