<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [App\Http\Controllers\Api\UsersController::class, 'index'])->name('users');

Route::group([
    'middleware' => 'auth:sanctum',
], function ($router) {
    Route::get('/users/{id}', [App\Http\Controllers\Api\UsersController::class, 'show'])->name('show');
    Route::patch('/users/{id}', [App\Http\Controllers\Api\UsersController::class, 'update'])->name('update');
    Route::post('/users/{id}/restore', [App\Http\Controllers\Api\UsersController::class, 'restore'])->name('restore');
    Route::delete('/users/{id}/forse', [App\Http\Controllers\Api\UsersController::class, 'destroy'])->name('destroy');
    Route::delete('/users/{user}', [App\Http\Controllers\Api\UsersController::class, 'destroy_soft'])->name('destroy_soft');
 });