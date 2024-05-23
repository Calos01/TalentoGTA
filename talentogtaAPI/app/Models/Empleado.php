<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Empleado extends Model
{
    // use HasFactory;
    protected $fillable = [
        'primer_apellido',
        'primer_nombre',
        'segundo_apellido',
        'otro_nombre',
        'paise_id',
        'tipo_identificacion_id',
        'numero_identificacion',
        'email',
        'fecha_ingreso',
        'area_id',
        'estado'
    ];

    // Relación con el modelo Pais
    public function paise()
    {
        return $this->belongsTo(Paise::class);
    }

    // Relación con el modelo TipoIdentificacion
    public function tipoIdentificacion()
    {
        return $this->belongsTo(TipoIdentificacion::class);
    }

    // Relación con el modelo Area
    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    // Accessor para formatear la fecha de creación
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->timezone('America/Bogota')->format('d/m/Y H:i:s');
    }

    // Accessor para formatear la fecha de actualizacion
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->timezone('America/Bogota')->format('d/m/Y H:i:s');
    }

    // Generar email
    public static function generateEmail($primerNombre, $primerApellido, $paiseId)
    {
        $primerNombre = strtolower(trim(str_replace(' ', '', $primerNombre)));
        $primerApellido = strtolower(trim(str_replace(' ', '', $primerApellido)));
        $dominio = $paiseId == 1 ? 'global.com.co' : 'global.com.us';
        $emailBase = strtolower($primerNombre . '.' . $primerApellido);
        $email = $emailBase . '@' . $dominio;

        $contador = 1;
        while (Empleado::where('email', $email)->exists()) {
            $email = $emailBase . '.' . $contador . '@' . $dominio;
            $contador++;
            if (strlen($email) > 300) {
                throw new \Exception("El correo electrónico generado excede los 300 caracteres");
            }
        }

        if (strlen($email) > 300) {
            throw new \Exception("El correo electrónico generado excede los 300 caracteres");
        }
        return $email;
    }
}
