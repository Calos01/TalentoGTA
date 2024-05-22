<?php

namespace App\Http\Controllers;
use App\Models\TipoIdentificacion;
use Illuminate\Http\Request;

class TipoIdentificacionController extends Controller
{
    public function index()
    {
        $tiposIdentificacion = TipoIdentificacion::select('id', 'nombre')->get();
        return response()->json($tiposIdentificacion);
    }
}
