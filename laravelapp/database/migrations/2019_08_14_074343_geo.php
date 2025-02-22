<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Geo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Geo', function (Blueprint $table) {
            $table->unsignedBigInteger('geo_user');
            $table->foreign('geo_user')->references('user_id')->on('users');    
            $table->string('lat');
            $table->string('lng');

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
        Schema::dropIfExists('Geo');
    }
}
