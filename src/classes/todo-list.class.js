import { Todo } from './todo.class';
export class TodoList {
    constructor() {
        this.todos = [];

        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );

        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        // El método filter() crea un nuevo array con todos los 
        //elementos que cumplan la condición implementada por la función dada.
        this.todos = this.todos.filter( todo => todo.id != id);
        
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for(const todo of this.todos) {
            // Doble igual porque uno es un string y el otro un numero
            if (todo.id == id){
                todo.completado = !todo.completado;

                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        // Regresa todos los que no esten completados de modo
        // que los que si lo esten seran eliminados
        this.todos = this.todos.filter( todo => !todo.completado)

        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        // Guardamos en el localStorage con la clave todo el valor de
        // la lista de todos
        localStorage.setItem('todo', JSON.stringify(this.todos) );
    }

    cargarLocalStorage(){
        // Si se puede obtener un item de clave todo regresa el arreglo de todos
        // de lo contrario inicializalo vacio 
        this.todos = ( localStorage.getItem('todo'))  
                     ? JSON.parse(localStorage.getItem('todo'))
                     : [];
        
        // Usando la funcion map del arreglo de todos le decimos que a cada 
        // elemento guardado en el localStorage se le va apllicar el metodo
        // fromJSON de la clase Todo al ser objetos de esta clase la reconstruccion 
        // sera exitosa 
        this.todos = this.todos.map( obj => Todo.fromJson(obj) );
    }

}