<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PanInfo extends Model
{
    use HasFactory;

    protected $table = 'tbl_pan_info';
    protected $primaryKey = 'tbl_pan_id';
    public $timestamps = false;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
