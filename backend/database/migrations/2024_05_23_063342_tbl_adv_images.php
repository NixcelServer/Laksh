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
        //
        Schema::create('tbl_adv_images', function (Blueprint $table) {
            $table->id('tbl_adv_img_id');
            $table->unsignedBigInteger('tbl_company_id')->nullable();
            $table->string('adv_img_path');
            $table->string('display',3)->default('no');
            $table->integer('duration');
            $table->string('payment_status');
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag',7)->default('show');

            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies');

        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_adv_images');
    }
};
