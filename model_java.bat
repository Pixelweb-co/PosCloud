@echo off
setlocal enabledelayedexpansion

:: Verificar si se proporcionaron los argumentos necesarios
if "%~1"=="" (
    echo Debes proporcionar el nombre del componente.
    echo Ejemplo: crear_componente.bat Producto campo1:string campo2:number
    exit /b
)

:: Nombre del componente
set componente=%~1
shift
:: Convertir el primer carácter a mayúscula y el resto a minúscula
set "COMPONENTE=!componente:~0,1!"
echo "%COMPONENTE%";
set "resto=!componente:~1!"
set "COMPONENTE=%COMPONENTE%%resto%"



:: Verificar si hay al menos un campo
if "%~1"=="" (
    echo Debes proporcionar al menos un campo.
    exit /b
)

:: Ruta donde se creará el archivo del modelo en backend
set ruta_backend_model=api/src/main/java/com/pedidos/cloud/models

:: Crear la carpeta del modelo si no existe
if not exist "%ruta_backend_model%" (
    echo Creando carpeta del modelo backend...
    mkdir "%ruta_backend_model%"
)

:: Crear el archivo del modelo en backend
set archivo_backend_model=%ruta_backend_model%/%COMPONENTE%.java
set "campos_java="

:: Agregar cada campo al string `campos_java`
:loop_backend
if "%~1"=="" goto endloop_backend
for /f "tokens=1,2 delims=:" %%a in ("%1") do (
    :: Convertir el tipo de dato a mayúscula inicial
    set "tipo=%%b"
    set "tipo=!tipo:~0,1!!tipo:~1!"  :: Capitaliza la primera letra del tipo de dato

    :: Verificar si el tipo es "number" y cambiarlo a "Integer"
    if "%%b"=="number" (
        set "tipo=Integer"
    ) else (
        set "tipo=!tipo:~0,1!!tipo:~1!"  :: Asegurarse que la primera letra esté en mayúscula
    )

    :: Agregar el campo a la variable `campos_java`
    set "campos_java=!campos_java!    @Column\n    @Setter\n    @Getter\n    private !tipo! %%a;\n"
)
shift
goto loop_backend

:endloop_backend

:: Leer y reemplazar la plantilla del modelo
(
    for /f "usebackq delims=" %%a in ("model_java.tpl") do (
        set "line=%%a"
        set "line=!line:{CAMPOS_JAVA}=%campos_java%! "
        set "line=!line:{componente}=%componente%! "
        set "line=!line:{COMPONENTE}=%COMPONENTE%! "
        echo !line!
    )
) > "%archivo_backend_model%"

echo Modelo backend %COMPONENTE% creado con éxito en %archivo_backend_model%.

:: Ruta donde se creará el archivo del servicio
set ruta_servicio=api/src/main/java/com/pedidos/cloud/services

:: Crear la carpeta del servicio si no existe
if not exist "%ruta_servicio%" (
    echo Creando carpeta del servicio...
    mkdir "%ruta_servicio%"
)

:: Crear el archivo del servicio
set archivo_servicio=%ruta_servicio%/%COMPONENTE%Service.java

:: Leer y reemplazar la plantilla del servicio
(
    for /f "usebackq delims=" %%a in ("service_java.tpl") do (
        set "line=%%a"
        set "line=!line:{componente}=%componente%! "
        set "line=!line:{COMPONENTE}=%COMPONENTE%! "
        echo !line!
    )
) > "%archivo_servicio%"

echo Servicio %COMPONENTE% creado con éxito en %archivo_servicio%.

:: Ruta donde se creará el archivo del repositorio
set ruta_repositorio=api/src/main/java/com/pedidos/cloud/repository

:: Crear la carpeta del repositorio si no existe
if not exist "%ruta_repositorio%" (
    echo Creando carpeta del repositorio...
    mkdir "%ruta_repositorio%"
)

:: Crear el archivo del repositorio
set archivo_repositorio=%ruta_repositorio%/%COMPONENTE%Repository.java

:: Leer y reemplazar la plantilla del repositorio
(
    for /f "usebackq delims=" %%a in ("repositorio_java.tpl") do (
        set "line=%%a"
        set "line=!line:{componente}=%componente%! "
        set "line=!line:{COMPONENTE}=%COMPONENTE%! "
        echo !line!
    )
) > "%archivo_repositorio%"

echo Repositorio %COMPONENTE% creado con éxito en %archivo_repositorio%.

:: Ruta donde se creará el archivo del controlador
set ruta_controlador=api/src/main/java/com/pedidos/cloud/controllers

:: Crear la carpeta del controlador si no existe
if not exist "%ruta_controlador%" (
    echo Creando carpeta del controlador...
    mkdir "%ruta_controlador%"
)

:: Crear el archivo del controlador
set archivo_controlador=%ruta_controlador%/%COMPONENTE%Controller.java

:: Leer y reemplazar la plantilla del controlador
(
    for /f "usebackq delims=" %%a in ("controller_java.tpl") do (
        set "line=%%a"
        set "line=!line:{COMPONENTE}=%COMPONENTE%!"
        set "line=!line:{componente}=%componente%!"
        echo !line!
    )
) > "%archivo_controlador%"

echo Controlador %COMPONENTE% creado con éxito en %archivo_controlador%.

endlocal
