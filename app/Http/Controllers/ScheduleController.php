<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ScheduleRequest;
use App\Models\Schedule;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function create_schedule(ScheduleRequest $request, Schedule $schedule){
        
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
    }
    
    public function edit_schedule(ScheduleRequest $request, Schedule $schedule){
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
    }
    
    public function drop_schedule(ScheduleRequest $request, Schedule $schedule){
        $schedule->start = date('Y-m-d H:i:s', strtotime($request->input('start')));
        $schedule-> end = date('Y-m-d H:i:s', strtotime($request->input('end')));
        $schedule->title = $request->input('title');
        $schedule->memo = $request->input('memo');
        $schedule->user_id = $request->input('user_id');
        $schedule->allDay = $request->input('allDay');
        $schedule->save();
    }
    
    public function delete_schedule(Schedule $schedule){
        $schedule -> delete();
    }
}
