@echo off
setlocal EnableDelayedExpansion

rem Obtener parámetros
set "componentName=%~1"

rem Crear el archivo HTML
set "outputFile=src/app/components/%componentName%.component.html"
(
    for /f "delims=" %%i in (listahtml.tpl) do (
        set "line=%%i"
        set "line=!line:%componentName%=%componentName%!"
        echo !line!
    )
) > "!outputFile!"

echo Creando el archivo: !outputFile!
endlocal
