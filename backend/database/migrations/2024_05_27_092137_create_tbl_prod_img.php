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
        Schema::create('tbl_prod_img', function (Blueprint $table) {
            $table->id('tbl_prod_img_id');
            $table->unsignedBigInteger('tbl_prod_id');
            $table->unsignedBigInteger('tbl_company_id');

            $table->string('prod_img_path', 255)->nullable();

            $table->unsignedBigInteger('add_by')->nullable();
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag', 7)->default('show');


            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies');
            $table->foreign('tbl_prod_id')->references('tbl_prod_id')->on('tbl_products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_prod_img');
    }
};
