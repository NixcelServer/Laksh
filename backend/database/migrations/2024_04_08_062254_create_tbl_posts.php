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
        Schema::create('tbl_posts', function (Blueprint $table) {
            $table->id('tbl_post_id');
            $table->unsignedBigInteger('tbl_company_id');
            $table->string('prod_name', 100);
            $table->integer('prod_qty');
            $table->unsignedBigInteger('tbl_uom_id')->nullable();
            $table->string('prod_brand')->nullable();
            $table->text('prod_des')->nullable();
            $table->unsignedBigInteger('tbl_cat_id');
            $table->unsignedBigInteger('tbl_sub_cat_id');
            $table->string('supplier_loc')->nullable();
            $table->string('req_status')->nullable();
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->string('flag', 45)->default('show');
           

            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies');
            $table->foreign('tbl_uom_id')->references('tbl_uom_id')->on('tbl_uom')->nullable();
            $table->foreign('tbl_cat_id')->references('tbl_cat_id')->on('mst_tbl_categories');
            $table->foreign('tbl_sub_cat_id')->references('tbl_sub_cat_id')->on('tbl_sub_categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_posts');
    }
};
