<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(["middleware" => ["auth"]], function() {
    Route::get("/home", [HomeController::class, "home"])->name('home');
    Route::get("/calendar", [HomeController::class, "calendar"])->name('calendar');
    
    Route::post("/todos/create", [HomeController::class, "create_todo"]);
    Route::post("/schedules/create",[HomeController::class,"create_schedule"]);
    
    Route::put("/todos/edit/{todo}", [HomeController::class, "edit_todo"]);
    Route::put("/schedules/edit/{schedule}",[HomeController::class,"edit_schedule"]);
    
    Route::delete("/todos/delete/{todo}", [HomeController::class, "delete_todo"]);
    Route::delete("/schedules/delete/{schedule}", [HomeController::class, "delete_schedule"]);
});
    

require __DIR__.'/auth.php';
