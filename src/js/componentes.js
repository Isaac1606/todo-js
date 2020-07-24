// Importamos la clase
import {Todo} from '../classes/todo.class';
// Importamos el objeto de todoList
import {todoList} from '../index'

// Referencias en el HTML 
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// Crea el elemento de HTML 
export const crearTodoHtml = (todo) => {
    // Variable que tiene la plantilla de lo que quiero que se este 
    // agregando 
    // Usando interpolacion de strings y el operador ternario 
    // podemos darle el valor a la clase 
    const htmlTodo = `
    <li class=" ${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    // Creo un div 
    const div = document.createElement('div');
    // Modifica el contenido del elemento
    div.innerHTML = htmlTodo;

    // De acorde a lo que sea su primer elemento sera lo que
    // insertará en este caso un <li>
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Eventos

// Para registrar nuevos todos al llenar el input text y dar click
txtInput.addEventListener('keyup', ( event ) => {
    // Significa que la persona presiona enter 
    if ( event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo( txtInput.value );
        // Lo guardamos en el objeto de todoList que tenemos en el 
        // index.js 
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );

        txtInput.value = '';
    }
});

// Acciones al hacer clcik en las diferentes partes de la lista de TODO
divTodoList.addEventListener('click', (event) => {
    // Me regresa la parte del documento a la que le hice click
    const nombreElemento = event.target.localName; // input, label, button
    // Esto sirve para ir recorriendo de donde dimos click su contenedor principal
    // ejem: tal vez dimos click en el label pero queremos el contendor del label y
    // a su vez el contenedor de ese, y asi sucesivamente 
    // y asi obtener el elemento todo
    // que en este caso es un elemento li de una ul
    const todoElemento = event.target.parentElement.parentElement;

    // Una vez que obtenemos el elemento de todo con getAttribute buscamos el elemento
    // que tenga el atributo entre comillas (se puede obtener clases id o en este caso el atributo data-id)
    const todoId = todoElemento.getAttribute('data-id');

    console.log(nombreElemento);
    console.log(todoElemento);
    console.log(divTodoList);

    // Si le damos click en el input de la izquierda 
    if ( nombreElemento.includes('input')){ // click en el check
        todoList.marcarCompletado( todoId );
        // si completed está presente la elimina, de lo contrario la añade
        todoElemento.classList.toggle('completed');
    // Si le dimos click al boton de eliminar nombreElmento tendra button 
    // si dimos click en ese boton es porque queremos borrar un todo
    }else if( nombreElemento.includes('button')){
        todoList.eliminarTodo( todoId );
        
        // divTodoList es toda la ul al aplicar el removeChild() remueve un 
        // nodo hijo que en este caso es un li que corresponde a un todoElemento
        divTodoList.removeChild( todoElemento );
        
    }
});


btnBorrar.addEventListener( 'click', () => {
    todoList.eliminarCompletados();
    // En el html borramos de abajo hacia arriba para evitar problemas 
    // de indices por el reajuste de estos cuando se borren elementos
    for( let i = divTodoList.children.length-1; i >= 0; i--){

        // Elmento li de la ul
        const elemento = divTodoList.children[i];

        // Si entre las clases del elemento li se encuentra la clase completed 
        if (elemento.classList.contains('completed') ){
            // Accediendo al contenedor que en este caso es el ul 
            // remueve el nodo hijo en este caso un li 
            divTodoList.removeChild(elemento);
        }

    }
});

ulFiltros.addEventListener('click', (event) => {
    console.log(event.target.text);
    // El filtro se define como Todos Pendientes o Completado 
    // de acuerdo al HTML 
    const filtro = event.target.text;
    // Si toda en una seccion donde no hay texto return 
    if (!filtro) {
        return;
    }

    anchorFiltros.forEach ( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    // Por cada elemento li en la lista ul
    for (const elemento of divTodoList.children) {
        // Si el elemento tiene la clase hidden remuevelo
        // de esta forma en el switch no es necesario considerar este caso
        elemento.classList.remove('hidden');
        // Regrsea true o false si el elemento esta completado
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                // Si el elemento esta completado no debe mostrarse
                // cuando se aplica el filtro de los pendientes 
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                // Si el elemento no esta completado no debe mostrarse cuando se el elemento
                // se aplica el filtro de completado
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});