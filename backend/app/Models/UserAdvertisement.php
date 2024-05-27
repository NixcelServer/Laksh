<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAdvertisement extends Model
{
    use HasFactory;
    protected $table = 'tbl_adv_images';
    protected $primaryKey = 'tbl_adv_img_id';
    public $timestamps = false;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
