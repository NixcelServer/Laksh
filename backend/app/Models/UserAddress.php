<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    use HasFactory;

    protected $table = 'tbl_users_address';
    protected $primaryKey = 'tbl_u_add_id';
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
