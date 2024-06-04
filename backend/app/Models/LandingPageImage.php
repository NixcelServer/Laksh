<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPageImage extends Model
{
    use HasFactory;

    protected $table = 'tbl_landing_page_imgs';
    protected $primaryKey = 'tbl_lp_img_id';
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
