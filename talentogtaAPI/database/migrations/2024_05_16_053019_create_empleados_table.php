<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            
            $table->id();
            $table->string('primer_apellido');
            $table->string('primer_nombre');
            $table->string('segundo_apellido');
            $table->string('otro_nombre')->nullable();
            $table->unsignedBigInteger('paise_id');
            $table->unsignedBigInteger('tipo_identificacion_id');
            $table->string('numero_identificacion');
            $table->string('email')->unique();
            $table->date('fecha_ingreso');
            $table->unsignedBigInteger('area_id');
            $table->string('estado')->default('Activo');
            $table->timestamps();

            $table->foreign('paise_id')->references('id')->on('paises');
            $table->foreign('tipo_identificacion_id')->references('id')->on('tipo_identificacions');
            $table->foreign('area_id')->references('id')->on('areas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empleados');
    }
};
