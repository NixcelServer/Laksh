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
        Schema::create('tbl_bank_details', function (Blueprint $table) {
            $table->id('tbl_bank_detail_id');
            $table->unsignedBigInteger('tbl_company_id');
            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies')->onDelete('cascade');
            
            $table->string('acc_no', 12)->unique();
            $table->string('acc_name', 100);
            $table->string('ifsc', 11);
            $table->string('branch_name', 100);
            $table->string('bank_name', 100);
            $table->date('add_date');
            $table->time('add_time');
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
        Schema::dropIfExists('tbl_bank_details');
    }
};
