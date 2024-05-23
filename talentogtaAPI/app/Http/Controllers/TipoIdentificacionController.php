<?php

namespace App\Http\Controllers;
use App\Models\TipoIdentificacion;
use Illuminate\Http\Request;
use Exception;
class TipoIdentificacionController extends Controller
{
    public function index()
    {
        try{
            $tiposIdentificacion = TipoIdentificacion::select('id', 'nombre')->get();
            return response()->json($tiposIdentificacion);
        }catch (Exception $e) {
            return response()->json(['error' => 'Ocurrió un error al obtener los tipo de identificación'], 500);
        }          
    }
}
