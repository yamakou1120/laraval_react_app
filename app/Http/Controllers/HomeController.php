<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Todo;
use App\Models\Diary;
use Inertia\Inertia;



class HomeController extends Controller
{
    public function home(Todo $todos,Schedule $schedules, Diary $diary,$year,$month,$date)
    {
        $datestr = "{$year}-{$month}-{$date}";
        $date = date('Y-m-d',strtotime($datestr)); 
        $todos = $todos->where('user_id', \Auth::user()->id)->get();
        $schedules = $schedules->where('user_id',\Auth::user()->id)->whereDate('start', '=', $date)->orderBy('allDay','desc')->orderBy('start','asc')->get();
        $diary =  $diary->where('user_id', \Auth::user()->id)->whereDate('date', '=', $date)->get();
        
        return Inertia::render("home",["todos" => $todos, "date"=>$date,"schedules"=>$schedules,"diary"=>$diary]);
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
