<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublishersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publishers', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('dob');
            $table->string('country');
            $table->string('company');
            $table->string('industry');
            $table->string('website');
            $table->string('api');
            $table->string('dimensions');
            $table->string('average_visit');
            $table->string('website_timeline');
            $table->enum('role', ['advertiser', 'publisher']);
            $table->integer('agree');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('publishers');
    }
}
