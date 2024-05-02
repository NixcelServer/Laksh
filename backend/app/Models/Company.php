<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'mst_tbl_companies';
    protected $primaryKey = 'tbl_company_id';
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function panNo()
    {
        return $this->hasOne(PanInfo::class);
    }

    public function gstNo()
    {
        return $this->hasOne(GstInfo::class);
    }

    public function socialInfo()
    {
        return $this->hasOne(SocialInfo::class);
    }

    public function companyAddress()
    {
        return $this->hasOne(CompanyAddress::class);
    }

    public function bankDetails()
    {
        return $this->hasOne(BankDetails::class);
    }

    public function product()
    {
        return $this->hasMany(Product::class);
    }

    public function post()
    {
        return $this->hasMany(Post::class);
    }

    public function notification()
    {
        return $this->hasMany(Notification::class);
    }


}
