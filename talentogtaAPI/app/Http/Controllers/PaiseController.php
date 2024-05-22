<?php

namespace App\Http\Controllers;
use App\Models\Paise;
use Illuminate\Http\Request;

class PaiseController extends Controller
{
    public function index()
    {
        $paises = Paise::select('id', 'nombre')->get();
        return response()->json($paises);
    }
}
