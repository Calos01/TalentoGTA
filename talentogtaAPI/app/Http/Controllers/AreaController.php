<?php

namespace App\Http\Controllers;
use App\Models\Area;
use Exception;

use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index()
    {
        try{
            $areas = Area::select('id', 'nombre')->get();
            return response()->json($areas);
        }catch (Exception $e) {
            return response()->json(['error' => 'Ocurrió un error al obtener las areas'], 500);
        }        
    }
}
