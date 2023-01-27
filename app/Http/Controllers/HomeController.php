<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use App\Models\Schedule;
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
    
    
    public function calendar(Schedule $schedules){
        $schedules = $schedules->where('user_id', \Auth::user()->id)->get();
        return Inertia::render("calendar",["events"=>$schedules]);
    }
    
    public function create_schedule(Request $request, Schedule $schedule){
        
        $schedule->start = date('Y-m-d H:i:s', strtotime($request->input('start')));
        if( $request->input('allDay') == true ){
            $schedule-> end = date('Y-m-d H:i:s', strtotime('+1 day'.$request->input('end')));
        }else{
            if( $request->input('start') == $request->input('end') ){
                $schedule-> end = date('Y-m-d H:i:s', strtotime('+1 seconds'.$reqsuest->input('end')));
            }else{
                 $schedule-> end = date('Y-m-d H:i:s', strtotime($request->input('end')));
            }
        }
        $schedule->title = $request->input('title');
        $schedule->memo = $request->input('memo');
        $schedule->user_id = $request->input('user_id');
        $schedule->allDay = $request->input('allDay');
        $schedule->save();
        return redirect("/calendar");
    }
    
    public function edit_schedule(Request $request, Schedule $schedule){
        $schedule->start = date('Y-m-d H:i:s', strtotime($request->input('start')));
        if( $request->input('allDay') == true ){
            $schedule-> end = date('Y-m-d H:i:s', strtotime('+1 day'.$request->input('end')));
        }else{
            if( $request->input('start') == $request->input('end') ){
                $schedule-> end = date('Y-m-d H:i:s', strtotime('+1 seconds'.$request->input('end')));
            }else{
                 $schedule-> end = date('Y-m-d H:i:s', strtotime($request->input('end')));
            }
        }
        $schedule->title = $request->input('title');
        $schedule->memo = $request->input('memo');
        $schedule->user_id = $request->input('user_id');
        $schedule->allDay = $request->input('allDay');
        $schedule->save();
        return redirect("/calendar");
    }
    
    public function delete_schedule(Schedule $schedule){
        $schedule -> delete();
    }
}
