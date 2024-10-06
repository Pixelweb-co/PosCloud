<div class="flex px-2 flex-row relative">
  <div class="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  <input
    type="text"
    class="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
    placeholder="Buscar %componentName% por nit o nombre..."
    [(ngModel)]="keyword"
  />
</div>
<div class="w-full mt-5 pl-5">
  <button
    class="bg-green-500 text-white rounded-full px-4 py-2 hover:bg-cyan-600 transition-colors"
    (click)="add%componentName%()"
  >
    Agregar %componentName%
  </button>
  <app-modal-add-%componentName% [isVisible]="showModal" [%componentName%ToEdit]="%componentName%ToEdit" (close)="handleModalClose()" (empresaAdded)="handle%componentName%Added()"></app-modal-add-%componentName%>
</div>
<div class="h-full overflow-hidden mt-4">
  <div class="h-full overflow-y-auto px-2">
    <div *ngIf="%componentName%s.length === 0" class="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
      <div class="w-full text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        <p class="text-xl">
          YOU DON'T HAVE
          <br/>
          ANY %componentName%s TO SHOW
        </p>
      </div>
    </div>
    <div *ngIf="filtered%componentName%s().length === 0 && keyword.length > 0" class="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
      <div class="w-full text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-xl">
          EMPTY SEARCH RESULT
          <br/>
          "<span class="font-semibold">{{ keyword }}</span>"
        </p>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3" *ngFor="let header of headers">
                    {{ header }}
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr *ngFor="let %componentName% of filtered%componentName%s()" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" *ngFor="let field of fields">
                    {{ %componentName%[field] }}
                  </th>
                  <td class="px-6 py-4">
                    <button class="mr-5" (click)="edit%componentName%(%componentName%)">Actualizar</button>
                    <button class="ml-5" (click)="delete%componentName%(%componentName%.id)">Eliminar</button>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</div>
