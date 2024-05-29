<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvSubscription extends Model
{
    use HasFactory;

    protected $table = 'tbl_adv_subscriptions';
    protected $primaryKey = 'tbl_adv_subs_id';
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'tbl_user_id', 'tbl_user_id');
    }
}
