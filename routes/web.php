<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\DiaryController;

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
    Route::get("/home/{year}/{month}/{date}", [HomeController::class, "home"])->name('home');
    Route::get("/calendar", [HomeController::class, "calendar"])->name('calendar');
    Route::get("/diary/{year}/{month}",[HomeController::class,"diary"])->name('diary');
    
    Route::post("/todos/create", [TodoController::class, "create_todo"]);
    Route::post("/schedules/create",[ScheduleController::class,"create_schedule"]);
    Route::post("/diaries/create",[DiaryController::class,"create_diary"]);
    
    
    Route::put("/todos/edit/{todo}", [TodoController::class, "edit_todo"]);
    Route::put("/schedules/edit/{schedule}",[ScheduleController::class,"edit_schedule"]);
    Route::put("/schedules/drop/{schedule}",[ScheduleController::class,"drop_schedule"]);
    Route::post("/diaries/edit/{diary}",[DiaryController::class,"edit_diary"]);
    
    
    Route::delete("/todos/delete/{todo}", [TodoController::class, "delete_todo"]);
    Route::delete("/schedules/delete/{schedule}", [ScheduleController::class, "delete_schedule"]);
    Route::delete("/diaries/delete/{diary}", [DiaryController::class, "delete_diary"]);
});
    

require __DIR__.'/auth.php';
