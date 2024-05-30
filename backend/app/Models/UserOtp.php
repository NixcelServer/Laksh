<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserOtp extends Model
{
    use HasFactory;
    protected $table = 'tbl_users_otp';
    protected $primaryKey = 'tbl_u_otp_id';

    protected $fillable = ['u_email_id', 'otp', 'expires_at'];
    
}
