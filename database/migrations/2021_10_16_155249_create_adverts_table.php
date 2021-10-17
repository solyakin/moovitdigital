<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adverts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('content');
            $table->string('image')->nullable();
            $table->integer('likes')->nullable();
            $table->integer('impressions')->nullable();
            $table->unsignedInteger('graphic_id');
            $table->unsignedInteger('budget_id');
            $table->string('audience');
            $table->string('location');
            $table->string('ageRange');
            $table->string('start');
            $table->string('end');
            $table->unsignedInteger('createdBy');
            $table->unsignedInteger('assigned')->nullable();
            $table->string('amount')->nullable();
            $table->timestamps();


            $table->foreign('graphic_id')->references('id')->on('graphic');
            $table->foreign('budget_id')->references('id')->on('budget');
            $table->foreign('createdBy')->references('id')->on('users');
            $table->foreign('assigned')->references('id')->on('admins');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('adverts');
    }
}
