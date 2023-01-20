<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home(Todo $todo)//インポートしたPostをインスタンス化して$postとして使用。
    {
        $date = date('y/m/d');
        return Inertia::render("home",["todos" => $todo->get(), "date"=>$date]);
    }
}
