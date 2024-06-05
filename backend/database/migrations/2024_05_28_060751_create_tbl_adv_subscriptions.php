<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_adv_subscriptions', function (Blueprint $table) {
            $table->id('tbl_adv_subs_id');
            $table->unsignedBigInteger('tbl_user_id');
            $table->boolean('is_subscribed')->default(false);
            $table->date('subs_start_date')->nullable();
            $table->time('subs_start_time')->nullable();
            $table->date('subs_end_date')->nullable();
            $table->time('subs_end_time')->nullable();
            $table->string('flag')->default('show');

            $table->foreign('tbl_user_id')->references('tbl_user_id')->on('mst_tbl_users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_adv_subscriptions');
    }
};
