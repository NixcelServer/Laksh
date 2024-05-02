<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitOfMeasurement extends Model
{
    use HasFactory;

    protected $table = 'mst_tbl_uom';
    protected $primaryKey = 'tbl_uom_id';
    public $timestamps = false;


    public function post()
    {
        return $this->hasOne(Post::class);
    }

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
