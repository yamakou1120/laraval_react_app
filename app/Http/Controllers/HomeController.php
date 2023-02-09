<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Todo;
use App\Models\Diary;
use Inertia\Inertia;



class HomeController extends Controller
{
    public function home(Todo $todos)
    {
        $date = date('y/m/d');
        $todos = $todos->where('user_id', \Auth::user()->id)->get();
        return Inertia::render("home",["todos" => $todos, "date"=>$date]);
    }
    
    public function calendar(Schedule $schedules){
        $schedules = $schedules->where('user_id', \Auth::user()->id)->get();
        return Inertia::render("calendar",["events"=>$schedules]);
    }
    
    public function diary($year, $month, Diary $diaries){
        $diaries = $diaries->where('user_id', \Auth::user()->id)->whereYear('date', '=', $year)->whereMonth('date','=',$month)->orderBy('date','asc')->get();
        return Inertia::render("diary",["diaries"=>$diaries,'year'=>$year,'month'=>$month]);
    }
}
