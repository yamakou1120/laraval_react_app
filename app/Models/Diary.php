<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diary extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "title",
        "date",
        "text",
        "image_path",
    ];
}
