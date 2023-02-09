<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function create_todo(TodoRequest $request, Todo $todo)
    {
        $input = $request->all();
        $todo->fill($input)->save();
        return redirect("/home");
    }
    
    public function edit_todo(TodoRequest $request, Todo $todo)
    {
        $input = $request->all();
        $todo->fill($input)->save();
        return redirect("/home");
    }
    
    public function delete_todo(Todo $todo)
    {
        $todo -> delete();
        return redirect("/home");
    }
}
