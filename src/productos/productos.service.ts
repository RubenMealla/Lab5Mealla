import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './interface/producto.interface';
import { CrearProductoDto } from './dto/CrearProductoDto';
import { ActualizarProductoDto } from './dto/ActualizarProductoDto';

@Injectable()
export class ProductosService {
    
    private productos0: Producto[] = [
        { id: 1, nombre: 'Lavadora Samsung 10kg', categoria: 'Electrodomésticos' },
        { id: 2, nombre: 'Refrigerador LG No Frost', categoria: 'Electrodomésticos' },
        { id: 3, nombre: 'Licuadora Oster 1000W', categoria: 'Electrodomésticos' },
        { id: 4, nombre: 'Aspiradora Dyson V11', categoria: 'Electrodomésticos' },
        { id: 5, nombre: 'Horno eléctrico Whirlpool', categoria: 'Electrodomésticos' }
    ];
    
    findAll(){
        return this.productos0;
    }

    findById(id:Number){
        const prod = this.productos0.find( p => p.id === id );
        if ( !prod ) throw new NotFoundException(`Producto con el id '${ id }' no encontrado`);
        return prod;
    }

    create(nuevo:CrearProductoDto){
        const prodNew: Producto = {
            id: this.productos0.length+1,
            nombre:nuevo.nombre,
            categoria:nuevo.categoria
        }

        this.productos0.push( prodNew );
    }

    /**
     * @param id 
     * @param prodActualizar 
     * @returns 
     */
    update(id:number, prodActualizar:ActualizarProductoDto){
            let prod = this.findById(id);
            console.log(prod);
            
            this.productos0 = this.productos0.map( p => {

                if ( p.id === id ) {
                    prod.nombre = prodActualizar.nombre;
                    prod.categoria = prodActualizar.categoria;
                    return prod;
                }
    
                return p;
            })

            return prod;
            
    }

    delete(id:number){
        let prod = this.findById(id);
        if(prod){
            this.productos0 = this.productos0.filter (pp => pp.id !== id)
        }

    }
}
