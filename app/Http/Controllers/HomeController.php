<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Schedule;
use App\Models\Todo;
use App\Models\Diary;
use App\Models\Money;
use Inertia\Inertia;



class HomeController extends Controller
{
    public function home(Todo $todos,Schedule $schedules, Diary $diary, Money $money, $year, $month, $date)
    {
        $datestr = "{$year}-{$month}-{$date}";
        $date = date('Y-m-d',strtotime($datestr)); 
        $todos = $todos->where('user_id', \Auth::user()->id)->get();
        $schedules = $schedules->where('user_id',\Auth::user()->id)->whereDate('start', '=', $date)->orderBy('allDay','desc')->orderBy('start','asc')->get();
        $diary =  $diary->where('user_id', \Auth::user()->id)->whereDate('date', '=', $date)->get();
        $money = $money->where('user_id', \Auth::user()->id)->whereDate('date', '=', $date)->get();
        
        return Inertia::render("home",["todos" => $todos, "date"=>$date,"schedules"=>$schedules,"diary"=>$diary,"money"=>$money]);
    }
    
    public function calendar(Schedule $schedules){
        $schedules = $schedules->where('user_id', \Auth::user()->id)->get();
        return Inertia::render("calendar",["events"=>$schedules]);
    }
    
    public function diary($year, $month, Diary $diaries){
        $diaries = $diaries->where('user_id', \Auth::user()->id)->whereYear('date', '=', $year)->whereMonth('date','=',$month)->orderBy('date','asc')->get();
        return Inertia::render("diary",["diaries"=>$diaries,'year'=>$year,'month'=>$month]);
    }
    
    public function money($year,$month,Money $money){
        $money = $money->where('user_id', \Auth::user()->id)->orderBy('date','asc')->get();
        
        $day_plus = DB::table('money')->where('user_id', \Auth::user()->id)
        ->where('status',true)
        ->select('date')
        ->selectRaw('SUM(price) AS day_plus')
        ->groupBy('date')
        ->orderBy('date','asc')
        ->get();
        
        $day_minus = DB::table('money')->where('user_id', \Auth::user()->id)
        ->where('status',false)
        ->select('date')
        ->selectRaw('SUM(price) AS day_minus')
        ->groupBy('date')
        ->orderBy('date','asc')
        ->get();
        
        $month_plus = DB::table('money')
        ->where('user_id', \Auth::user()->id)
        ->where('status',true)
        ->whereYear('date','=', $year)
        ->whereMonth('date','=',$month)
        ->selectRaw('SUM(price) AS month_plus')
        ->get();
        
        $month_minus = DB::table('money')
        ->where('user_id', \Auth::user()->id)
        ->where('status',false)
        ->whereYear('date','=', $year)
        ->whereMonth('date','=',$month)
        ->selectRaw('SUM(price) AS month_minus')
        ->get();
        
        return Inertia::render("money", ["money"=>$money,"dayPlus"=>$day_plus,"dayMinus"=>$day_minus,"monthPlus"=>$month_plus,"monthMinus"=>$month_minus,"year"=>$year,"month"=>$month]);
    }
}