class Gasto {
	constructor(ano, mes, dia, tipo, descripcion, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descripcion = descripcion
		this.valor = valor
	}

	validarDatos() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	registro(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosLosRegistros() {

		let gastos = Array()

		let id = localStorage.getItem('id')

		//recuperar todos los gastos registrados en localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar el gasto
			let gastosOld = JSON.parse(localStorage.getItem(i))

			//existe la posibilidad de que haya índices que se hayan saltado/eliminado
			//en estos casos omitiré estos índices
			if(gastosOld === null) {
				continue
			}
			gastosOld.id = i
			gastos.push(gastosOld)
		}

		return gastos
	}

	buscar(gastoN){

		let gastosFiltro = Array()
		gastosFiltro = this.recuperarTodosLosRegistros()
		console.log(gastosFiltro);
		console.log(gastoN)
		if(gastoN.ano != ''){
		console.log("filtro del año");
		gastosFiltro = gastosFiltro.filter(d => d.ano == gastoN.ano)
		}
		if(gastoN.mes != ''){
		console.log("filtro del mes");
		gastosFiltro = gastosFiltro.filter(d => d.mes == gastoN.mes)
		}
		if(gastoN.dia != ''){
		console.log("filtro del dia");
		gastosFiltro = gastosFiltro.filter(d => d.dia == gastoN.dia)
		}
		if(gastoN.tipo != ''){
		console.log("filtro del tipo");
		gastosFiltro = gastosFiltro.filter(d => d.tipo == gastoN.tipo)
		}
		if(gastoN.descripcion != ''){
			console.log("filtro de descripcion");
			gastosFiltro = gastosFiltro.filter(d => d.descripcion == gastoN.descripcion)
		}
		if(gastoN.valor != ''){
			console.log("filtro del valor");
			gastosFiltro = gastosFiltro.filter(d => d.valor == gastoN.valor)
		}
		return gastosFiltro
	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function registroGastos() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descripcion = document.getElementById('descripcion')
	let valor = document.getElementById('valor')

	let gastos = new Gasto (
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descripcion.value,
		valor.value
	)

	if(gastos.validarDatos()) {
		bd.registro(gastos)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido con éxito'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'El nuevo gasto fue registrado com éxito!'
		document.getElementById('modal_btn').innerHTML = 'Ok'
		document.getElementById('modal_btn').className = 'btn btn-success'
		
		//sucess
		$('#modalRegistroGasto').modal('show') 

		ano.value = '' 
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descripcion.value = ''
		valor.value = ''
		
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Error en la inclusion del nuevo registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Error de registro, por favor compruebe que todos los campos han sido rellenados correctamente.!'
		document.getElementById('modal_btn').innerHTML = 'Volver y corregir'
		document.getElementById('modal_btn').className = 'btn btn-danger'
		
		//error
		$('#modalRegistroGasto').modal('show') 
	}
}

function cargaListaGastos(gastos = Array(), filtro = false) {

    if(gastos.length == 0 && filtro == false){
		gastos = bd.recuperarTodosLosRegistros() 
	}
	
	let listaGastos = document.getElementById("listaGastos")
    listaGastos.innerHTML = ''
	gastos.forEach(function(d){
		//Creación de la fila (tr)
		var linea = listaGastos.insertRow();

		//Creación de las columnas (td)
		linea.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

		//Ajustar el tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentacion'
				break
			case '2': d.tipo = 'Educacion'
				break
			case '3': d.tipo = 'Bienestar'
				break
			case '4': d.tipo = 'Salud'
				break
			case '5': d.tipo = 'Transporte'
				break
			
		}
		linea.insertCell(1).innerHTML = d.tipo
		linea.insertCell(2).innerHTML = d.descripcion
		linea.insertCell(3).innerHTML = d.valor

		//Crear el botón de exclusion
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"  ></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_despesa_','')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		linea.insertCell(4).append(btn)
		console.log(d)
	})

}

function buscarGastos(){

	let ano  = document.getElementById("ano").value
	let mes = document.getElementById("mes").value
	let dia = document.getElementById("dia").value
	let tipo = document.getElementById("tipo").value
	let descripcion = document.getElementById("descripcion").value
	let valor = document.getElementById("valor").value

	let gasto = new Gasto(ano, mes, dia, tipo, descripcion, valor)

	let gastos = bd.buscar(gasto)
	this.cargaListaGastos(gastos, true)


}

