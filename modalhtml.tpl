<div *ngIf="isVisible" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
  <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
    <h2 class="text-xl font-bold mb-4">Agregar {componente}</h2>
    <form [formGroup]="{componente}Form" class="w-full">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3" *ngFor="let campo of campos">
          <label [for]="campo" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {{campo}}
          </label>
          <input [id]="campo" [formControlName]="campo" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Nombre de {{componente}}">
          <div *ngIf="{componente}Form.get(campo)?.errors?.['required']" class="text-red-500 text-xs italic">
            {{campo}} es obligatorio
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <button type="button" (click)="closeModal()" class="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition-colors mr-4">
          Cancelar
        </button>
        <button type="button" (click)="save{COMPONENTE}()" class="bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-600 transition-colors">
          Guardar
        </button>
      </div>
    </form>
  </div>
</div>
