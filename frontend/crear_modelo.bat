@echo off
:: Verificar si se proporcionaron los argumentos necesarios
if "%1"=="" (
    echo Debes proporcionar el nombre del modelo y al menos un campo.
    echo Ejemplo: crear_modelo.bat Producto id:number nombre:string valor:number
    exit /b
)

:: Nombre del modelo
set modelo=%1

:: Eliminar el primer argumento (el nombre del modelo) para obtener solo los campos
shift

:: Verificar si hay al menos un campo
if "%1"=="" (
    echo Debes proporcionar al menos un campo.
    exit /b
)

:: Ruta donde se creara el archivo de modelo (ajustar según sea necesario)
set ruta=src/app/models

:: Crear la carpeta si no existe
if not exist "%ruta%" (
    mkdir "%ruta%"
)

:: Crear el archivo del modelo
set archivo=%ruta%/%modelo%.model.ts

echo Creando el archivo: %archivo%

:: Escribir la estructura básica del archivo
(
echo // Modelo de %modelo%
echo export interface %modelo% {
) > "%archivo%"

:: Agregar cada campo al archivo
:loop
if "%1"=="" goto endloop

:: Dividir cada campo en nombre y tipo
for /f "tokens=1,2 delims=:" %%a in ("%1") do (
    echo     %%a: %%b; >> "%archivo%"
)

shift
goto loop

:endloop

:: Preparar el constructor
(
echo     constructor( ^
) >> "%archivo%"
set "args="
for %%a in (%*) do (
    for /f "tokens=1 delims=:" %%b in ("%%a") do (
        set "args=!args!%%b: %%b, "
    )
)

:: Quitar la última coma
call set "args=%%args:~0,-2%%"
echo         !args!^) { >> "%archivo%"

:: Asignar los valores en el constructor
for %%a in (%*) do (
    for /f "tokens=1 delims=:" %%b in ("%%a") do (
        echo         this.%%b = %%b; >> "%archivo%"
    )
)

:: Cerrar el bloque del constructor y la clase
(
 
echo } 
) >> "%archivo%"

echo Modelo %modelo% creado con éxito en %archivo%.
