<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductKeyword extends Model
{
    use HasFactory;
    protected $table = 'tbl_prod_keywords';
    protected $primaryKey = 'tbl_prod_keyword_id';
    public $timestamps = false;
    
}
