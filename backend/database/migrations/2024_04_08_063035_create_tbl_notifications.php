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
        Schema::create('tbl_notifications', function (Blueprint $table) {
            $table->id('tbl_notify_id');
            $table->unsignedBigInteger('tbl_post_id')->nullable();
            $table->unsignedBigInteger('tbl_company_id')->nullable();
            $table->string('notification_status', 3);
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->string('flag', 45)->nullable();

            $table->foreign('tbl_post_id')->references('tbl_post_id')->on('tbl_posts');
            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_notifications');
    }
};
