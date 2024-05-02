<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'tbl_products';
    protected $primaryKey = 'tbl_prod_id';
    public $timestamps = false;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function uom()
    {
        return $this->belongsTo(UnitOfMeasurement::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function keywords()
    {
        return $this->belongsToMany(Keyword::class,'tbl_prod_keywords','tbl_prod_id','tbl_keyword_id');
    }
}
