@echo off
:: Verificar si se proporcionaron los argumentos necesarios
if "%1"=="" (
    echo Debes proporcionar el nombre del componente.
    echo Ejemplo: crear_componente.bat Producto
    exit /b
)

:: Nombre del componente
set servicio=%1

:: Ruta donde se creara el archivo del componente (ajustar según sea necesario)
set ruta=src/app/components

:: Crear la carpeta si no existe
if not exist "%ruta%" (
    mkdir "%ruta%"
)

:: Crear el archivo del componente
set archivo=%ruta%/%servicio%.component.ts

echo Creando el archivo: %archivo%

:: Leer y reemplazar la plantilla
setlocal enabledelayedexpansion
(
    for /f "usebackq delims=" %%a in ("lista.tpl") do (
        set "line=%%a"
        set "line=!line:{SERVICIO}=%servicio%!"
        set "line=!line:{servicio}=%servicio:~0,1,%servicio:~1%!"
        echo !line!
    )
) > "%archivo%"

endlocal
echo Componente %servicio% creado con éxito en %archivo%.
