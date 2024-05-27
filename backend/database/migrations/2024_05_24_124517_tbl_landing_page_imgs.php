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
        Schema::create('tbl_landing_page_imgs', function (Blueprint $table) {
            $table->id('tbl_lp_img_id');
            $table->string('lp_img_path');
            $table->string('display',3)->default('no');
            $table->unsignedBigInteger('add_by')->nullable();
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag',7)->default('show');

            $table->foreign('add_by')->references('tbl_user_id')->on('mst_tbl_users');
            $table->foreign('deleted_by')->references('tbl_user_id')->on('mst_tbl_users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('tbl_landing_page_imgs');
    }
};
