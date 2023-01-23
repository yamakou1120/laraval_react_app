<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Inertia\Inertia;



class HomeController extends Controller
{
    public function home(Todo $todos)
    {
        $date = date('y/m/d');
        $todos = $todos->where('user_id', \Auth::user()->id)->get();
        return Inertia::render("home",["todos" => $todos, "date"=>$date]);
    }
    
    public function create_todo(TodoRequest $request, Todo $todo)
    {
        $input = $request->all();
        $todo->fill($input)->save();
    }
    
    public function edit_todo(TodoRequest $request, Todo $todo)
    {
        $input = $request->all();
        $todo->fill($input)->save();
        
    }
}
