@echo off
:: Verificar si se proporcionaron los argumentos necesarios
if "%1"=="" (
    echo Debes proporcionar el nombre del componente.
    echo Ejemplo: crear_componente.bat Producto
    exit /b
)

:: Nombre del componente
set componente=%1

:: Inicializar variables para los campos del formulario y el patch
set "campos_formulario="
set "campos_patch="
set "campos="



:: Ruta donde se creara el archivo del componente (ajustar según sea necesario)
set ruta_componente=frontend/src/app/components/%componente%_lista
echo "%ruta_componente%"
:: Crear la carpeta si no existe
if not exist "%ruta_componente%" (
    echo "creando componente"
    mkdir "%ruta_componente%"
)

::modelo

:: Ruta donde se creara el archivo del modelo (ajustar según sea necesario)
set ruta_modelo=frontend/src/app/models


:: Ruta donde se creara el archivo del modelo (ajustar según sea necesario)
set ruta_formulario=frontend/src/app/components/modal-form-%componente%
if not exist "%ruta_formulario%" (
    echo "creando fomrulario"
    mkdir "%ruta_formulario%"
)


:: Ruta donde se creara el archivo del modelo (ajustar según sea necesario)
set ruta_servicio=frontend/src/app/services/
if not exist "%ruta_servicio%" (
    echo "creando servicio"
    mkdir "%ruta_servicio%"
)

::crear el modelo

:: Eliminar el primer argumento (el nombre del modelo) para obtener solo los campos
shift

:: Verificar si hay al menos un campo
if "%1"=="" (
    echo Debes proporcionar al menos un campo.
    exit /b
)


:: Crear el archivo del modelo
set archivo=%ruta_modelo%/%componente%.model.ts

echo Creando el archivo: %archivo%

:: Escribir la estructura básica del archivo
(
echo // Modelo de %componente%
echo export interface %componente% {
) > "%archivo%"


set sep=""

echo id?: number; >> "%archivo%"


:: Agregar cada campo al archivo

:loop
if "%1"=="" goto endloop
:: Agregar cada campo al archivo
:: Dividir cada campo en nombre y tipo


for /f "tokens=1,2 delims=:" %%a in ("%1") do (
    echo %%a;
    echo %%a: %%b; >> "%archivo%"
     :: Agregar el campo al string `campos` con comas
    if defined campos (
        set "campos=%campos%, '%%a'"
        :: Añadir el campo al formulario
        set "campos_formulario=%campos_formulario%%%a: ['', Validators.required], "

        :: Añadir el campo al patchValue
        set "campos_patch=%campos_patch%%%a: this.%componente%ToEdit.%%a || '', "


    ) else (
        set "campos='%%a'"
        :: Añadir el campo al formulario
        set "campos_formulario=%%a: ['', Validators.required], "

        :: Añadir el campo al patchValue
        set "campos_patch=%%a: this.%componente%ToEdit.%%a || '', "


    )
)

:: Eliminar la última coma de la variable campos



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

echo Modelo %componente% creado con éxito en %archivo%.


::servicio

:: Crear el archivo del componente
set archivo=%ruta_servicio%/%componente%.service.ts

echo Creando el archivo: %archivo%

:: Leer y reemplazar la plantilla
setlocal enabledelayedexpansion
(
    for /f "usebackq delims=" %%a in ("servicio.tpl") do (
        set "line=%%a"
        set "line=!line:{COMPONENTE}=%componente%!"
        set "line=!line:{componente}=%componente:~0,1,%componente:~1%!"
        set "line=!line:{BASE_URL}=http://localhost:8080/api/%componente%!"
        echo !line!
    )
) > "%archivo%"

endlocal
echo Servicio %componente% creado con éxito en %archivo%.


::LISTA

:: Crear el archivo del componente lista
set archivo=%ruta_componente%/%componente%.lista.ts

echo Creando el archivo: %archivo%

:: Leer y reemplazar la plantilla
setlocal enabledelayedexpansion
(
    for /f "usebackq delims=" %%a in ("lista.tpl") do (
        set "line=%%a"
        set "line=!line:{campos}=%campos%!"
        set "line=!line:{COMPONENTE}=%componente%!"
        set "line=!line:{componente}=%componente:~0,1,%componente:~1%!"
        echo !line!
    )
) > "%archivo%"

endlocal
echo Componente %componente% creado con éxito en %archivo%.


:: Crear el archivo del componente lista
set archivo=%ruta_componente%/%componente%.lista.html

echo Creando el archivo html: %archivo%

:: Leer y reemplazar la plantilla
setlocal enabledelayedexpansion
(
    for /f "usebackq delims=" %%a in ("listahtml.tpl") do (
        set "line=%%a"
        set "line=!line:{COMPONENTE}=%componente%!"
        set "line=!line:{componente}=%componente:~0,1,%componente:~1%!"
        echo !line!
    )
) > "%archivo%"

endlocal
echo Componente %componente% creado con éxito en %archivo%.

::MODAL FORMULARIO

:: Crear el archivo del componente modal
set archivo=%ruta_componente%/%componente%.modal.ts

echo Creando el archivo: %archivo%


:: Leer y reemplazar la plantilla
setlocal enabledelayedexpansion
(
    for /f "usebackq delims=" %%a in ("modal.tpl") do (
        set "line=%%a"
        set "line=!line:{campos}=%campos%!"
        set "line=!line:{CAMPOS_FORMULARIO}=%campos_formulario%!"
        set "line=!line:{CAMPOS_PATCH}=%campos_patch%!"    
        set "line=!line:{COMPONENTE}=%componente%!"
        set "line=!line:{componente}=%componente:~0,1,%componente:~1%!"
        echo !line!
    )
) > "%archivo%"

endlocal
echo Componente %componente% creado con éxito en %archivo%.


:: Crear el archivo del componente html modal
set archivo=%ruta_componente%/%componente%.modal.html

echo Creando el archivo html: %archivo%

:: Leer y reemplazar la plantilla
setlocal enabledelayedexpansion
(
    for /f "usebackq delims=" %%a in ("modalhtml.tpl") do (
        set "line=%%a"
        set "line=!line:{CAMPOS_FORMULARIO}=%campos_formulario%!"
        set "line=!line:{CAMPOS_PATCH}=%campos_patch%!"        
        set "line=!line:{COMPONENTE}=%componente%!"
        set "line=!line:{componente}=%componente:~0,1,%componente:~1%!"
        echo !line!
    )
) > "%archivo%"

endlocal
echo Componente %componente% creado con éxito en %archivo%.

