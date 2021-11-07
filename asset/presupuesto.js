let list = [];

function Lista(list){
	let table = '<thead><tr><td>Descripcion</td><td>Cantidad</td><td>Valor</td><td>Accion</td></tr></thead><tbody>';
	for(var key in list){
		table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatCantidad(list[key].cant) +'</td><td>'+ formatValor(list[key].valor) +'</td><td><button class="btn btn-warning" onclick="updateID('+key+');">Editar</button> <button class="btn btn-dark" onclick="BorrarItem('+key+');">Borrar</button></td></tr>';
	}
	table += '</tbody>';

	document.getElementById('listTable').innerHTML = table;
	Total(list);
	guardarListStorage(list);
}

function formatDesc(desc){
	let nombreDescripcion = desc.toLowerCase();
	nombreDescripcion = nombreDescripcion.charAt(0).toUpperCase() + nombreDescripcion.slice(1); 
	return nombreDescripcion;
}

function formatCantidad(cant){
	return parseInt(cant);
}

function formatValor(valor){
	let NValor = parseFloat(valor).toFixed(2) + "";
	NValor = NValor.replace(".",",");
	NValor = "$ " + NValor;
	return NValor;
}

function agregarData(){
	if(!validacion()){
		return;
	}
	let desc = document.getElementById("desc").value;
	let cant = document.getElementById("cant").value;
	let valor = document.getElementById("valor").value;

	list.unshift({"desc":desc , "cant":cant , "valor":valor });
	Lista(list); 
}

function updateID(id){
	let objeto = list[id];
	document.getElementById("desc").value = objeto.desc;
	document.getElementById("cant").value = objeto.cant;
	document.getElementById("valor").value = objeto.valor;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";

	document.getElementById("newIDupdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm(){
	document.getElementById("desc").value = "";
	document.getElementById("cant").value = "";
	document.getElementById("valor").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	
	document.getElementById("newIDupdate").innerHTML = "";
	document.getElementById("errores").style.display = "none";
}

function Total(lista){
	var total = 0;
	for(var key in lista){
		total += lista[key].valor * lista[key].cant;
	}
	document.getElementById("valorTotal").innerHTML = formatValor(total);
}


function updateData(){
	if(!validacion()){
		return;
	}
	let id = document.getElementById("idUpdate").value; //Atribuyo un nuevo valor al "ID" con nuevo valor, descripción y cantidad.
	let desc = document.getElementById("desc").value;
	let cant = document.getElementById("cant").value;
	let valor = document.getElementById("valor").value;

	list[id] = {"desc":desc, "cant":cant, "valor":valor};
	resetForm();
	Lista(list);
}

function BorrarItem(id){
	if(confirm('Borrar ese item?')) {
		let index = list.findIndex((_item,index) => { //El array findIndex() de donde fue llamado (list). https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex 
		return index == id; 
		});
	
		if (index != -1) {
		list.splice(index, 1);
		}
		Lista(list);
	}
} //De esta manera se buscará el índice y se borrará sólo éste. 

//validacion y errores
function validacion(){
	let desc = document.getElementById("desc").value;
	let cant = document.getElementById("cant").value;
	let valor = document.getElementById("valor").value;
	let errores = "";
	document.getElementById("errores").style.display = "none"; 

	if(desc === ""){
		errores += '<p>¡el campo Descripcion está vacío!</p>';
	}
	if(cant === ""){
		errores += '<p>¡el campo Cantidad está vacío!</p>';
	}else if(cant != parseInt(cant)){
		errores += '<p>Por favor insira un valor númerico válido en el campo cantidad</p>';
	}
	if(valor === ""){
		errores += '<p>¡el campo Valor está vacío!</p>';
	}else if(valor != parseFloat(valor)){
		errores += '<p>Por favor insira un valor $ válido </p>';
	}

	if(errores != ""){
		document.getElementById("errores").style.display = "block"; 
		document.getElementById("errores").innerHTML = "<h3>Oops, creo que nos hemos perdido algo! </h3>" + errores;
		return false;
	}else{
		return true;
	}
}

function borrarLista(){
	if (confirm("¿Desea eliminar todos los elementos de esta lista?")){
		list = [];
		Lista(list);
	}
}

function guardarListStorage(list){
	let jsonStr = JSON.stringify(list);
	localStorage.setItem("list",jsonStr);
}

function iniciarListStorage(){
	let obtenerLista = localStorage.getItem("list");
	if(obtenerLista){
		list = JSON.parse(obtenerLista);
	}
	Lista(list);
}

iniciarListStorage();