<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;
use Date;

class money_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('money')->insert([
                'user_id'=>1,
                'title' => '1',
                'date'=> '2023-03-16',
                'price'=>100,
                'status'=>false,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
         ]);
         DB::table('money')->insert([
                'user_id'=>1,
                'title' => '2',
                'date'=> '2023-03-16',
                'price'=>200,
                'status'=>false,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
         ]);
         DB::table('money')->insert([
                'user_id'=>1,
                'title' => '3',
                'date'=> '2023-03-16',
                'price'=>300,
                'status'=>false,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
         ]);DB::table('money')->insert([
                'user_id'=>1,
                'title' => '4',
                'date'=> '2023-03-16',
                'price'=>400,
                'status'=>false,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
         ]);DB::table('money')->insert([
                'user_id'=>1,
                'title' => '5',
                'date'=> '2023-03-16',
                'price'=>500,
                'status'=>false,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
         ]);
    }
}
