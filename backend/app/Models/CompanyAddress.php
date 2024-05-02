<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyAddress extends Model
{
    use HasFactory;

    protected $table = 'tbl_companies_address';
    protected $primaryKey = 'tbl_c_add_id';
    public $timestamps = false;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
