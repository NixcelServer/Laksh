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
        Schema::create('tbl_companies_address', function (Blueprint $table) {
            $table->id('tbl_c_add_id');
            $table->unsignedBigInteger('tbl_company_id');
            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies')->onDelete('cascade');
            $table->integer('pincode');
            $table->string('city', 100);
            $table->string('state', 100);
            $table->string('country', 100);
            $table->string('house_no', 100);
            $table->string('area', 100);
            $table->string('locality', 250);
            $table->string('landmark', 250);
            $table->date('add_date');
            $table->time('add_time');
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->string('flag', 7)->default('show');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_companies_address');
    }
};
