<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    use HasFactory;

    protected $table = 'mst_tbl_keywords';
    protected $primaryKey = 'tbl_keyword_id';
    public $timestamps = false;

    public function products()
    {
        return $this->belongsToMany(Product::class,'tbl_prod_keywords','tbl_keyword_id','tbl_prod_id');
    }
}
