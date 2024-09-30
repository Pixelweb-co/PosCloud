import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ProductoComponent } from './producto/producto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormPedidoComponent } from './form-pedido/form-pedido.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AuthGuard } from './guards/auth.guard'; 
import { EmpresaComponent } from './empresa/empresa.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpleadoComponent } from './empleado/empleado.component';

export const routes: Routes = [
    { path: 'principal', component: PrincipalComponent, children: [
        { path: 'categorias', component: CategoriaComponent },
        { path: 'productos', component: ProductoComponent },
        { path: 'pedidos', component: PedidoComponent },
        { path: 'pos', component: FormPedidoComponent },
        { path: 'usuarios', component: UsuarioComponent },
        { path: 'empresas', component: EmpresaComponent },
        { path: 'terceros', component: ClienteComponent },
        {path:'empleados',component:EmpleadoComponent}
    ] },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: '**', redirectTo: 'login' }
];
