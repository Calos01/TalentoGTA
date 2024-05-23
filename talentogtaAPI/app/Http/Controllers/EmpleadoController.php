<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use Exception;

class EmpleadoController extends Controller
{
    // Mostrar todos los empleados
    public function index(Request $request)
    {
        try{
            $query = Empleado::with(['area'=> function ($query) {
                $query->select('id', 'nombre as nombre_area');
            },'tipoIdentificacion'=> function ($query) {
                $query->select('id', 'nombre as nombre_identificacion');
            },'paise' => function ($query) {
                $query->select('id', 'nombre as nombre_paise');
            }]);
    
            if ($request->filled('primer_nombre')) {
                $query->where('primer_nombre', 'like', '%' . $request->primer_nombre . '%');
            }
            if ($request->filled('otro_nombre')) {
                $query->where('otro_nombre', 'like', '%' . $request->otro_nombre . '%');
            }
            if ($request->filled('primer_apellido')) {
                $query->where('primer_apellido', 'like', '%' . $request->primer_apellido . '%');
            }
            if ($request->filled('segundo_apellido')) {
                $query->where('segundo_apellido', 'like', '%' . $request->segundo_apellido . '%');
            }
            if ($request->filled('tipo_identificacion')) {
                $query->where('tipo_identificacion_id', $request->tipo_identificacion);
            }
            if ($request->filled('numero_identificacion')) {
                $query->where('numero_identificacion', 'like', '%' . $request->numero_identificacion . '%');
            }
            if ($request->filled('paise_empleo')) {
                $query->where('paise_id', $request->paise_empleo);
            }
            if ($request->filled('email')) {
                $query->where('email', 'like', '%' . $request->email . '%');
            }
            if ($request->filled('estado')) {
                $query->where('estado', $request->estado);
            }
        
            $empleados = $query->get();
        
            return response()->json($empleados);   

        }catch (Exception $e) {
            return response()->json(['error' => 'Ocurrió un error al obtener los empleados'], 500);
        }                  
    }

    // Mostrar un empleado específico
    public function show($id)
    {
        try {
            $empleado = Empleado::findOrFail($id);
            return response()->json($empleado);
        } catch (Exception $e) {
            return response()->json(['error' => 'Empleado no encontrado'], 404);
        }
    }

    // Crear un nuevo empleado
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'primer_apellido' => 'required|string|max:20|regex:/^[A-Z ]+$/',
                'primer_nombre' => 'required|string|max:20|regex:/^[A-Z ]+$/',
                'segundo_apellido' => 'required|string|max:20|regex:/^[A-Z ]+$/',
                'otro_nombre' => 'nullable|string|max:50|regex:/^[A-Z ]+$/',
                'paise_id' => 'required|exists:paises,id',
                'tipo_identificacion_id' => 'required|exists:tipo_identificacions,id',
                'numero_identificacion' => [
                    'required',
                    'string',
                    'max:20',
                    'regex:/^[a-zA-Z0-9\-]+$/',
                    'unique:empleados,numero_identificacion,NULL,id,tipo_identificacion_id,' . $request->tipo_identificacion_id
                ],
                
                'fecha_ingreso' => 'required|date',
                'area_id' => 'required|exists:areas,id',
                'estado' => 'required|string|max:255',
            ]);
    
            $validatedData['email'] = Empleado::generateEmail(
                $validatedData['primer_nombre'],
                $validatedData['primer_apellido'],
                $validatedData['paise_id']
            );
    
            $empleado = Empleado::create($validatedData);
            return response()->json($empleado, 201);
        }catch (Exception $e) {
            return response()->json(['error' => 'Ocurrió un error al crear el empleado'], 500);
        }         
    }

    // Actualizar un empleado existente
    public function update(Request $request, $id)
    {
        try{
            $empleado = Empleado::findOrFail($id);

            $validatedData = $request->validate([
                'primer_apellido' => 'required|string|max:20|regex:/^[A-Z ]+$/',
                'primer_nombre' => 'required|string|max:20|regex:/^[A-Z ]+$/',
                'segundo_apellido' => 'required|string|max:20|regex:/^[A-Z ]+$/',
                'otro_nombre' => 'nullable|string|max:50|regex:/^[A-Z ]+$/',
                'paise_id' => 'required|exists:paises,id',
                'tipo_identificacion_id' => 'required|exists:tipo_identificacions,id',
                'numero_identificacion' => [
                    'required',
                    'string',
                    'max:20',
                    'regex:/^[a-zA-Z0-9\-]+$/',
                    'unique:empleados,numero_identificacion,' . $empleado->id . ',id,tipo_identificacion_id,' . $request->tipo_identificacion_id
                ],
                'fecha_ingreso' => 'required|date',
                'area_id' => 'required|exists:areas,id'
            ]);

            if ($validatedData['primer_nombre'] !== $empleado->primer_nombre ||
                $validatedData['primer_apellido'] !== $empleado->primer_apellido ||
                $validatedData['paise_id'] !== $empleado->paise_id) {

                $validatedData['email'] = Empleado::generateEmail(
                    $validatedData['primer_nombre'],
                    $validatedData['primer_apellido'],
                    $validatedData['paise_id']
                );
            }

            $empleado->update($validatedData);
            return response()->json($empleado, 200);
        }catch (Exception $e) {
            return response()->json(['error' => 'Ocurrió un error al actualizar el empleado'], 500);
        }        
    }

    // Eliminar un empleado existente
    public function destroy($id)
    {
        try {
            $empleado = Empleado::findOrFail($id);
            $empleado->delete();
            return response()->json(['message' => 'Empleado eliminado exitosamente'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Ocurrió un error al eliminar el empleado'], 500);
        }
    }
}
