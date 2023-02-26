<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\MoneyRequest;
use App\Models\Money;

class MoneyController extends Controller
{
    public function create(Money $money,MoneyRequest $request){
        $input = $request->all();
        $money -> fill($input);
        $money-> date = date('Y-m-d', strtotime($request->input('date')));
        $money->save();
    }
    
    public function edit(Money $money, MoneyRequest $request){
        $input = $request->all();
        $money -> fill($input);
        $money-> date = date('Y-m-d', strtotime($request->input('date')));
        $money->save();
    }
    
    public function delete(Money $money){
        $money -> delete();
    }
}
