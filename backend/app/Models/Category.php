<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'mst_tbl_categories';
    protected $primaryKey = 'tbl_cat_id';
    public $timestamps = false;

    public function post()
    {
        return $this->hasOne(Post::class);
    }

    public function subCategory()
    {
        return $this->hasOne(SubCategory::class);
    }

    public function product()
    {
        return $this->hasOne(Product::class);
    }

    
}
