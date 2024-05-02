<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankDetails extends Model
{
    use HasFactory;

    protected $table = 'tbl_bank_details';
    protected $primaryKey = 'tbl_bank_detail_id';
    public $timestamps = false;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
