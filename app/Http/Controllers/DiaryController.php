<?php

namespace App\Http\Controllers;
use App\Http\Requests\DiaryRequest;
use App\Models\Diary;
use Cloudinary;
use Illuminate\Http\Request;

class DiaryController extends Controller
{
     public function create_diary(DiaryRequest $request, Diary $diary){
        $diary->user_id = $request->input('user_id');
        $diary->title = $request->input('title');
        $diary->date= date('Y-m-d',strtotime($request->input('date')));
        $diary->text = $request->input('text');
        if($request->file('image_path')){
            $image_url = Cloudinary::upload($request->file('image_path')->getRealPath())->getSecurePath();
            $diary->image_path = $image_url;
        }
        $diary->save();
        $year = date('Y',strtotime($request->input('date')));
        $month = date('n',strtotime($request->input('date')));
        return redirect("/diary/$year/$month");
    }
    
    
     public function edit_diary(DiaryRequest $request, Diary $diary){
        $diary->user_id = $request->input('user_id');
        $diary->title = $request->input('title');
        $diary->date= date('Y-m-d',strtotime($request->input('date')));
        $diary->text = $request->input('text');
        if($request->file('image_path')){
            $image_url = Cloudinary::upload($request->file('image_path')->getRealPath())->getSecurePath();
            $diary->image_path = $image_url;
        }
        $diary->save();
        $year = date('Y',strtotime($request->input('date')));
        $month = date('n',strtotime($request->input('date')));
        return redirect("/diary/$year/$month");
    }
    
    public function delete_diary(Diary $diary)
    {
        $diary -> delete();
    }
}
