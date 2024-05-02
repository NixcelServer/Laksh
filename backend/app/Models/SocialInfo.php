<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialInfo extends Model
{
    use HasFactory;
    protected $table = 'tbl_companies_social_info';
    protected $primaryKey = 'tbl_csi_id';
    public $timestamps = false;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
