import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { Productos } from '../../interfaces/productos';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  // 1. injeccion de variables
  _dataService = inject(ProductsService);

  // 2. variables
  allProducts: Productos[] = [];

  nombre: string = '';
  precio: number = 0;
  imagen: string = '';
  showDiv: boolean = false;
  editMode: boolean = false;  
  editProductId: string | undefined | null= null;

  //obtener datos
  obtenerDatos() {
    this._dataService.getProducts().subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.allProducts = res;
        // console.log(this.allProducts);
      },
      error: (err) => {
        console.error('Hubo un error', err);
      }
    });
  }

  //crear datos
  crearDatos() {

    if (this.nombre === '' || this.imagen === '' || this.precio === 0) {
      alert('Ingrese todos los campos');
    } else {

      const nuevoProducto: Productos = {
        nombre: this.nombre,
        imagen: this.imagen,
        precio: this.precio
      };

      this._dataService.createProduct(nuevoProducto).subscribe({
        next: (res: any) => {
          if (res) {
            console.log('res', res);
            this.obtenerDatos();
          } else {
            console.error('Hubo un error');
          }
        },
        error: (err) => {
          console.error('Hubo un error', err);
        }
      });
    }
  }

  //modificar productos
  //modificar productos
  identificarId(id: string | undefined ) {
    this.editProductId = id;
    this.editMode = true;
    this.showDiv = true;
    console.log(this.editProductId);
  }

  modificarProducto() {
    console.log('Entré');
    console.log(this.editProductId, this.nombre, this.imagen, this.precio);

    if (!this.nombre || !this.imagen || this.precio <= 0) {
        alert('Ingrese todos los campos');
    } else if (this.editProductId) {
        const productoActualizado: Productos = {
            nombre: this.nombre,
            imagen: this.imagen,
            precio: this.precio
        };

        this._dataService.updateProduct(this.editProductId, productoActualizado).subscribe({
            next: (res: any) => {
                if (res) {
                    console.log('res', res);
                    this.obtenerDatos();
                    this.toggleDiv();
                } else {
                    console.error('Hubo un error');
                }
            },
            error: (err) => {
                console.error('Hubo un error', err);
            }
        });
    }
}

  //Borrar productos
  borrarProducto(id: string | undefined) {
    console.log('Producto a borrar:', id);

    this._dataService.deleteProduct(id).subscribe({
        next: (res: any) => {
            if (res) {
                console.log('res', res);
                this.obtenerDatos();
            } else {
                console.error('Hubo un error');
            }
        },
        error: (err) => {
            console.error('Hubo un error', err);
        }
    });
}

  toggleDiv() {
    this.showDiv = !this.showDiv;
    if (!this.showDiv) {
      this.nombre = '';
      this.imagen = '';
      this.precio = 0;
      this.editMode = false;
      this.editProductId = null;
    }
  }


  limpiarCampos() {
    this.nombre === '';
    this.imagen === '';
    this.precio === 0;
  }

  ngOnInit() {
    this.obtenerDatos();

  }

}
