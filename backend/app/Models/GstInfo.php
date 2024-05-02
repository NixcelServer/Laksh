<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GstInfo extends Model
{
    use HasFactory;

    protected $table = 'tbl_gst_info';
    protected $primaryKey = 'tbl_gst_id';
    public $timestamps = false;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
