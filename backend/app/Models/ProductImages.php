<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
    use HasFactory;

    protected $table = 'tbl_prod_img';

   
    protected $primaryKey = 'tbl_prod_img_id';
    public $timestamps = false;
}
