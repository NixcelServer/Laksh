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
        Schema::create('mst_tbl_companies', function (Blueprint $table) {
            $table->id('tbl_company_id');
            $table->unsignedBigInteger('tbl_user_id'); // Match data type with tbl_user_id in mst_tbl_users
            $table->foreign('tbl_user_id')->references('tbl_user_id')->on('mst_tbl_users')->onDelete('cascade');
            $table->string('c_name', 255)->nullable();
            $table->string('c_cin_no', 21)->nullable();
            $table->string('c_tan_no', 10)->nullable();
            $table->string('c_iec', 10)->nullable();
            $table->string('c_annual_to')->nullable();
            $table->string('no_of_emps')->nullable();
            $table->string('c_mobile_no', 10)->nullable();
            $table->string('c_alt_mobile_no', 10)->nullable();
            $table->string('c_landline_no', 10)->nullable();
            $table->string('c_alt_landline_no', 10)->nullable();
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->string('flag', 45)->default('show');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_tbl_companies');
    }
};
