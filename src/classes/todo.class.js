// Agregampos el export para poder usar la clase fuera 
// de este archivo 
export class Todo {

    // Metodo para reconstruir el objeto que viene en formato JSON 
    // con el fin de acceder a los metodos de la clase ocupamos destructuracion 
    // de objetos 
    static fromJson( {id, tarea, completado, creado} ){

        const tempTodo = new Todo( tarea );
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;

    }

    constructor (tarea){
        // Indicamos la tarea de este TODO
        this.tarea = tarea;
        
        // Le asignamos un id
        this.id = new Date().getTime(); // 1283687
        
        // Para determinar si esta terminada la tarea o no
        this.completado = false;

        // Para que diga cuando se creo 
        this.creado = new Date();
    }

    impirmirClase() {
        console.log(`${this.tarea} - ${this.id}`);
    }

}