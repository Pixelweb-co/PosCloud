@echo off
:: Verificar si se proporcionaron los argumentos necesarios
if "%1"=="" (
    echo Debes proporcionar el nombre del servicio.
    echo Ejemplo: crear_servicio.bat Producto
    exit /b
)

:: Nombre del servicio
set servicio=%1

:: Ruta donde se creara el archivo del servicio (ajustar según sea necesario)
set ruta=src/app/services

:: Crear la carpeta si no existe
if not exist "%ruta%" (
    mkdir "%ruta%"
)

:: Crear el archivo del servicio
set archivo=%ruta%/%servicio%.service.ts

echo Creando el archivo: %archivo%

:: Leer y reemplazar la plantilla
setlocal enabledelayedexpansion
(
    for /f "usebackq delims=" %%a in ("servicio.tpl") do (
        set "line=%%a"
        set "line=!line:{SERVICIO}=%servicio%!"
        set "line=!line:{BASE_URL}=http://localhost:8080/api/%servicio%!"
        echo !line!
    )
) > "%archivo%"

endlocal
echo Servicio %servicio% creado con éxito en %archivo%.
