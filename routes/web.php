<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('users')->name('users.')->group(function () {
        Route::middleware('permission:users.index')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
        });

        Route::middleware('permission:users.create')->group(function () {
            Route::get('create', [UserController::class, 'create'])->name('create');
            Route::post('/', [UserController::class, 'store'])->name('store');
        });

        Route::middleware('permission:users.edit')->group(function () {
            Route::get('{user}/edit', [UserController::class, 'edit'])->name('edit');
            Route::put('{user}', [UserController::class, 'update'])->name('update');
        });

        Route::middleware('permission:users.delete')->group(function () {
            Route::delete('{user}', [UserController::class, 'destroy'])->name('destroy');
        });
    });

    Route::prefix('roles')->name('roles.')->group(function () {
        Route::middleware('permission:roles.index')->group(function () {
            Route::get('/', [RoleController::class, 'index'])->name('index');
        });

        Route::middleware('permission:roles.create')->group(function () {
            Route::get('create', [RoleController::class, 'create'])->name('create');
            Route::post('/', [RoleController::class, 'store'])->name('store');
        });

        Route::middleware('permission:roles.edit')->group(function () {
            Route::get('{role}/edit', [RoleController::class, 'edit'])->name('edit');
            Route::put('{role}', [RoleController::class, 'update'])->name('update');
        });

        Route::middleware('permission:roles.delete')->group(function () {
            Route::delete('{role}', [RoleController::class, 'destroy'])->name('destroy');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
