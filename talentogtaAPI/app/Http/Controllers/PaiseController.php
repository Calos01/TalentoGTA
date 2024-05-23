<?php

namespace App\Http\Controllers;
use App\Models\Paise;
use Illuminate\Http\Request;
use Exception;
class PaiseController extends Controller
{
    public function index()
    {
        try{
            $paises = Paise::select('id', 'nombre')->get();
            return response()->json($paises);
        }catch (Exception $e) {
            return response()->json(['error' => 'Ocurrió un error al obtener los paises'], 500);
        }        
    }
}
