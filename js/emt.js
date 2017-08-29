$(document).ready(function() {
	
	var clave = 'Saldo';
	
	$("#ventanaEmergente").hide();
	
	$("#historial").click(verHistorial);	
	
	$("#historialRecargas").click(verHistorialRecargas);
	
	$("#resetear").click(resetearValores);
	
	$("#inicializar").click(datosIniciales);	
	
	$("#recargar").click(recargarSaldo);			
	
	if (localStorage.Saldo == undefined){
						
		//location.href ="datosIniciales.html";
		
		datosIniciales();
		
	}
	
	if (localStorage.Movimiento==undefined){
		
		localStorage.Movimiento=1;
			
	} else {
		
		var ultimomovimiento = +localStorage.getItem("Movimiento");
		
	}
	
	if (localStorage.Recarga==undefined){
		
		localStorage.Recarga=1;
	} 
	
	var zonaSaldo = $("#zonaSaldo");
		
	leer_mostrar(clave);
	
	$("#emt").click(pagarViaje);
	
	$("#metro").click(pagarViaje);

	$("#cons").click(pagarViaje);
	
	$("#zonaTransbordo").click(pagarTransbordo);
	
	
	
	
    
});


/*---------------------------------------------*/

function pagarViaje(e){   //Descontar prrecio del viaje del saldo total
	
	var precio, origen;
	
	var saldo =  localStorage.getItem('Saldo');
	
	if (e.target==emt) {
		
		precio = localStorage.getItem("PrecioEmt");
		
		origen="Emt"; 
	
	} else if (e.target==metro) {
		
		precio = localStorage.getItem("PrecioMetro"); 
		
		origen="Metro";
	
	} else if (e.target==cons) {
		
		precio = localStorage.getItem("PrecioCons"); 
		
		origen="Consorcio";
	
	} 
		
	saldo = saldo - precio;
	
	if (saldo < 0){
		
		alert("Ha habido un error en los calculos. El saldo es 0€");
		
		saldo = 0;
			
	}
		
	localStorage.setItem('Saldo',saldo);
			
	grabar_historico(origen);	
	
	leer_mostrar('Saldo');
				
}

/* -------------------------------------------- */


function verHistorial() {           //Muestra el historial de movimientos de la tarjeta
	
	$("#ventanaEmergente").fadeIn(300);
		
	$("#ventanaEmergente").html('<div id="datosIniciales">HISTORICO DE MOVIMIENTOS</div><div id="tablaSaldos"><table id="tabla"><tr><td id="lineas"></td></tr><tr><td id="botonAceptar"><input type="button" id="aceptar" value="Aceptar" ></td></tr></table></div>');
		
	var linea = $("#lineas");
	
	$("#aceptar").click(volver);				
	
	var movimientos = +localStorage.getItem("Movimiento");
	
	var mov, fecha, texto;		
	
	for (i=1; i<movimientos; i++){
		
		mov = "Movimiento" + i;
		
		fecha = localStorage.getItem(mov);
			
		linea.prepend("<div id='lineas'><strong>" + i + ":</strong> " + fecha + "</div>");
	
	}
		
}


/*------------------------------------------------*/

function verHistorialRecargas() {           //Muestra el historial de recargas de la tarjeta
	
	$("#ventanaEmergente").fadeIn(300);
		
	$("#ventanaEmergente").html('<div id="datosIniciales">HISTORICO DE RECARGAS</div><div id="tablaSaldos"><table id="tabla"><tr><td id="lineas"></td></tr><tr><td id="botonAceptar"><input type="button" id="aceptar" value="Aceptar" ></td></tr></table></div>');
		
	var linea = $("#lineas");
	
	$("#aceptar").click(volver);				
	
	var recarga = +localStorage.getItem("Recarga");
	
	var rec, fecha, texto;		
	
	for (i=1; i<recarga; i++){
		
		rec = "Recarga" + i;
		
		fecha = localStorage.getItem(rec);
			
		linea.prepend("<div id='lineas'><strong>" + i + ":</strong> " + fecha + "</div>");
	
	}
		
}

/*-----------------------------------------------------------------*/

function leer_mostrar(clave){      //Muestra el saldo actual de la tarjeta
		
	var contenidosaldo = +localStorage.getItem(clave);
	
	var cont = contenidosaldo.toFixed(2);
	
	$("#zonaSaldo").html("<div>" + clave + ": " + cont + "</div>");
		
}

/* -------------------------------------------- */

function grabar_historico(origen){		//Graba el movimiento en el histórico
		
	var time = moment().format('DD/MM/YYYY');

	var minut = moment().format('mm');
	
	var minutos = minut.toString();  //Pasar minutos a String
	
	if (minutos.length < 2) {   // Si los minutos son de o a 9, poner un cero delante
		
		minutos= '0'+ minutos;
		
	}
	
	//var segund = time.getSeconds();  //Recuperar los segundos de la hora
	
	var segund = moment().format('ss');
	
	var segundos= segund.toString();  //Pasar los segundos a string
	
	if (segundos.length < 2) {     // Si los segundos son de o a 9, poner un cero delante
		
		segundos= '0'+ segundos;
		
	}
	
	//var horas=time.getHours();			//Recuperar las horas de la hora
	
	var horas = moment().format('HH');
		
	var hora = horas + ":" + minutos + ":" + segundos;
	
	fecha = time + "  -  " + hora + "  -  " + origen;   // Fecha completa con la 
	var mov = localStorage.getItem("Movimiento");
	
	var proximomovimiento = "Movimiento"+mov;
	
	localStorage.setItem(proximomovimiento,fecha);   //Grabar movimiento
	
	mov = +mov + 1;
	
	localStorage.setItem("Movimiento",mov);   //Grabar el número del movimiento siguiente
		
}


/* -------------------------------------------- */


function pagarTransbordo(){  //Abre la ventana de transbordos
	
	$("#ventanaEmergente").fadeIn(300);
		
	$("#ventanaEmergente").html('<div id="datosIniciales">TRANSBORDOS</div><div id="tablaTransbordos"><figure id="transBB"><img src="logo-trans-bus-bus.png" alt="B-B" id="transBusBus"></figure><figure id="transBM"><img src="logo-trans-bus-metro.png" alt="B-M" id="transBusMetro"></figure><figure id="transMB"><img src="logo-trans-metro-bus.png" alt="M-B" id="transMetroBus"></figure><input type="button" id="aceptar" value="Cancelar" ></div>');
	
	$("#aceptar").click(volver);
	
	$("#transBusBus").click(transbordo);
	
	$("#transBusMetro").click(transbordo);
	
	$("#transMetroBus").click(transbordo);
	
}

/*---------------------------------------------------------------*/

function transbordo(e){	  //Descuenta del saldo el precio de un transbordo
	
	var tipoTransbordo;
	
	if (e.target==transBusBus){
		
		var precio = localStorage.getItem("TransBusBus");
		
		tipoTransbordo = 'Transbordo Bus-Bus';		
		
	} else if (e.target==transBusMetro){
		
		var precio = localStorage.getItem("TransBusMetro");
		
		tipoTransbordo = 'Transbordo Bus-Metro';
		
	} else if (e.target==transMetroBus){
		
		var precio = localStorage.getItem("TransMetroBus");
		
		tipoTransbordo = 'Transbordo Metro-Bus';
		
	} 
	
	var saldo =  localStorage.getItem('Saldo');
	
	saldo = saldo - precio;
	
	if (saldo<0){
		
		alert("Ha habido un error en los calculos. El saldo es 0€");
		saldo =0;
			
	}
	
	localStorage.setItem('Saldo',saldo);
	
	grabar_historico(tipoTransbordo);
	
	leer_mostrar('Saldo');
	
	volver();
	
}

/*-----------------------------------------------*/

function grabarTransbordo(tipoTransbordo){
			
	grabar_historico(tipoTransbordo);
	
}

/* -------------------------------------------- */



function volver() {
		
	
	$("#ventanaEmergente").fadeOut(300).delay(200);
	
	$("#lineas").html("");
	
	leer_mostrar('Saldo');
	
}


/* -------------------------------------------- */



function datosIniciales() {
	
	var saldoinicial, precioemt, preciometro, preciocons, transBB, transBM,transMB;
		
	$("#ventanaEmergente").fadeIn(300);
		
	$("#ventanaEmergente").html('<div id="datosIniciales">DATOS INICIALES</div>');
		
	$("#ventanaEmergente").append('<div id="tablaSaldos"><table ><tr><td class="saldos">Saldo inicial:</td><td><input type="number" class="numero" id="saldoI" value="0"></td></tr><tr><td class="saldos">Precio billete EMT:</td><td><input type="number" class="numero"id="precEMT" value="0"></td></tr><tr><td  class="saldos">Precio billete Metro:</td><td><input type="number" class="numero"id="precMetro" value="0"></td></tr><tr><td  class="saldos">Precio billete Consorcio:</td><td><input type="number"class="numero" id="precCons" value="0"></td></tr><tr><td  class="saldos">Precio Transbordo Bus-Bus:</td><td><input type="number" class="numero" id="precBusBus" value="0"></td></tr><tr><td></td><td></td></tr><tr><td  class="saldos">Precio Transbordo Bus-Metro:</td><td><input type="number" class="numero" id="precBusMetro" value="0"></td></tr><tr><td></td><td></td></tr><tr><td  class="saldos">Precio Transbordo Metro-Bus:</td><td><input type="number" class="numero" id="precMetroBus" value="0"></td></tr><tr><td></td><td><p></p></td></tr><tr><td colspan="2" id="botonAceptar"><input type="button" id="aceptar" value="Aceptar" ></td></tr></table></div>');
	
	if (localStorage.Saldo == undefined){
		
		saldoinicial = 0;
				
	} else {
									
		saldoinicial = +localStorage.getItem("Saldo");
		saldoinicial = saldoinicial.toFixed(2);
				
	};
	
	$("#saldoI").val(saldoinicial);	
	
	if (localStorage.PrecioEmt== undefined) {
		
		precioemt = 0.93;
				
	} else {
		
		precioemt=localStorage.getItem("PrecioEmt");
				
	};
	
	$("#precEMT").val(precioemt);
	
	if (localStorage.PrecioMetro==undefined){
		
		preciometro = 0.82;
		
	} else {
		
		preciometro = localStorage.getItem("PrecioMetro");	
		
	};
	
	$("#precMetro").val(preciometro);
	
	if (localStorage.PrecioCons==undefined){
			
		preciocons = 0.93;
		
	} else {
		
		preciocons=localStorage.getItem("PrecioCons");	
						
	};
	
	$("#precCons").val(preciocons);
	
	if (localStorage.TransBusBus==undefined) {
		
		transBB=0.65;
		
	} else {
		
		transBB=localStorage.getItem('TransBusBus');
							
	};
	
	$("#precBusBus").val(transBB);
	
	if (localStorage.TransBusMetro==undefined) {
		
		transBM=0.65;
		
	} else {
		
		transBM=localStorage.getItem('TransBusMetro');

			
	};
			
	$("#precBusMetro").val(transBM);
	
	if (localStorage.TransMetroBus==undefined) {
		
		transMB=0.76;
		
	} else {
		
		transMB=localStorage.getItem('TransMetroBus');
			
	};
			
	$("#precMetroBus").val(transMB);
	
	$("#aceptar").click(grabar);			
	
}


/* -------------------------------------------- */


function resetearValores() {
	
	$("#ventanaEmergente").fadeIn(300);
		
	$("#ventanaEmergente").html('<div id="datosIniciales">RESETEAR DATOS INICIALES</div>');
	
	$("#ventanaEmergente").append('<div id="tablaSaldos"><table ><tr><td class="saldos">Saldo inicial:</td><td><input type="number" class="numero" id="saldoI" value="0"></td></tr><tr><td class="saldos">Precio billete EMT:</td><td><input type="number" class="numero"id="precEMT" value="0"></td></tr><tr><td  class="saldos">Precio billete Metro:</td><td><input type="number" class="numero"id="precMetro" value="0"></td></tr><tr><td  class="saldos">Precio billete Consorcio:</td><td><input type="number"class="numero" id="precCons" value="0"></td></tr><tr><td  class="saldos">Precio Transbordo Bus-Bus:</td><td><input type="number" class="numero" id="precBusBus" value="0"></td></tr><tr><td></td><td></td></tr><tr><td  class="saldos">Precio Transbordo Bus-Metro:</td><td><input type="number" class="numero" id="precBusMetro" value="0"></td></tr><tr><td></td><td></td></tr><tr><td  class="saldos">Precio Transbordo Metro-Bus:</td><td><input type="number" class="numero" id="precMetroBus" value="0"></td></tr><tr><td><p></p></td></tr><tr><td id="botonAceptar"><input type="button" id="aceptar" value="Aceptar" ></td><td id="botonCencelar"><input type="button" id="cancelar" value="Cancelar" ></td></tr></table></div>');

	
	$("#saldoI").val(localStorage.getItem('Saldo'));
	
	$("#precEMT").val(localStorage.getItem('PrecioEmt'));
	
	$("#precMetro").val(localStorage.getItem('PrecioMetro'));
		
	$("#precCons").val(localStorage.getItem('PrecioCons'));
	
	$("#precBusBus").val(localStorage.getItem('TransBusBus'));
		
	$("#precBusMetro").val(localStorage.getItem('TransBusMetro'));
	
	$("#precMetroBus").val(localStorage.getItem('TransMetroBus'));
	
	$("#aceptar").click(function(){
	
		var mensaje = confirm("¿Seguro que quiere borrar los datos? ");
		//Detectamos si el usuario acepto el mensaje
		if (mensaje) {
		
			localStorage.removeItem('Saldo');
		
			localStorage.removeItem("PrecioEmt");
		
			localStorage.removeItem("PrecioMetro");
		
			localStorage.removeItem("PrecioCons");
		
			localStorage.removeItem("TransBusBus");
		
			localStorage.removeItem("TransBusMetro");
		
			localStorage.removeItem("TransMetroBus");
		
			borrar_historial();
		
			borrar_recargas();
		
			alert("Borrado realizado");
		
			volver();		
						
		}	else {
				
			volver();
				
		}		
	});
	
	$("#cancelar").click(volver);
	
}


/* -------------------------------------------- */



function borrar_historial(){
	
	var movimientos = +localStorage.getItem("Movimiento");

	var mensaje = confirm("¿Seguro que quiere borrar el historial de movimientos?");
	//Detectamos si el usuario acepto el mensaje
	if (mensaje) {
		
		for (i=(movimientos-1); i>=1; i--){
		
		var mov = "Movimiento" + i;
		
		localStorage.removeItem(mov);
		
	}
	 	alert("Historial borrado");
	 
		localStorage.Movimiento=1;
		
	}
	
}


/* -------------------------------------------- */


function borrar_recargas(){
	
	var recargas = +localStorage.getItem("Recarga");

	var mensaje = confirm("¿Seguro que quiere borrar el historial de recargas?");
	//Detectamos si el usuario acepto el mensaje
	if (mensaje) {
		
		for (i=(recargas-1); i>=1; i--){
		
		var rec = "Recarga" + i;
		
		localStorage.removeItem(rec);
		
	}
	 	alert("Historial borrado");
	 
		localStorage.Recarga=1;
		
	}
	
}


/* -------------------------------------------- */



function grabar(){
	
	var saldoini=$("#saldoI").val();
	var precemt = $("#precEMT").val();
	var precmetr = $("#precMetro").val();
	var preccon = $("#precCons").val();
	var transBB = $("#precBusBus").val();
	var transBM = $("#precBusMetro").val();
	var transMB = $("#precMetroBus").val();
	
	

	if (saldoini == 0) {
		
		alert("Debe ingresar un saldo inicial");
		
	} else if (precemt==0){
		
		alert("Debe ingresar un precio para los viajes de EMT");
			
	} else if (precmetr==0){
		
		alert("Debe ingresar un precio para los viajes de Metro");
			
	} else if (preccon==0){
		
		alert("Debe ingresar un precio para los viajes de Consorcio");
			
	} else if (transBB==0) {
		
		alert("Debe ingresar un precio para los transbordos de Bus a Bus");
		
	} else if (transBM==0) {
		
		alert("Debe ingresar un precio para los transbordos de Bus a Metro");
		
	} else if (transMB==0) {
		
		alert("Debe ingresar un precio para los transbordos de Metro a Bus");
		
	} else {
		
		localStorage.setItem("Saldo",saldoini);
		localStorage.setItem("PrecioEmt",precemt);
		localStorage.setItem("PrecioMetro",precmetr);
		localStorage.setItem("PrecioCons",preccon);	
		localStorage.setItem("TransBusBus",transBB);
		localStorage.setItem("TransBusMetro",transBM);
		localStorage.setItem("TransMetroBus",transMB);
		
		volver();
						
	}	
	
}

/*------------------------------------------------------------------*/


function recargarSaldo(){
	
	var importerecarga;
	
	$("#ventanaEmergente").fadeIn(300);
		
	$("#ventanaEmergente").html('<div id="datosIniciales">RECARGA DE SALDO</div>');
	
	
	$("#ventanaEmergente").append('<div id="tablaSaldos"><table ><tr><td class="saldos">Importe de la recarga:</td><td><input type="number" class="numero" id="recarga" value="0"></td></tr><tr><td><p></p></td><td><p></p></td></tr><tr><td><input type="checkbox" id="familianum">Familia Numerosa</td></tr><tr></tr><td><p></p></td><tr><td id="botonAceptar"><input type="button" id="aceptar" value="Aceptar" ></td><td id="botonCencelar"><input type="button" id="cancelar" value="Cancelar" ></td></tr></table></div>');
	
	
	$("#cancelar").click(volver);
	
	$("#aceptar").click(function(){
		
		var famNum = $("#familianum");
		
		var imp = $("#recarga").val();
		
		var contenidosaldo = localStorage.Saldo;
	
		var mensaje = confirm("Seguro que quiere recargar " + imp + " euros?");
		//Detectamos si el usuario acepto el mensaje
		if (mensaje) {
		
			if (famNum.is(":checked")){
			
				imp=+imp*1.25;
						
			}	
		
			importerecarga= +imp;
			
			importerecarga= importerecarga.toFixed(2);
		
			contenidosaldo = +contenidosaldo + (+importerecarga);
	
			localStorage.setItem('Saldo', contenidosaldo);
		
			alert("Recarga realizada");
		
			grabar_historico_recargas(importerecarga);
		
			volver();
		
		}	
	
		volver();
										
		});
	
}

/*--------------------------------------------------*/

function grabar_historico_recargas(importe){		//Graba el movimiento en el histórico
		
	var time = moment().format('DD/MM/YYYY');

	var minut = moment().format('mm');
	
	var minutos = minut.toString();  //Pasar minutos a String
	
	if (minutos.length < 2) {   // Si los minutos son de o a 9, poner un cero delante
		
		minutos= '0'+ minutos;
		
	}
	
	//var segund = time.getSeconds();  //Recuperar los segundos de la hora
	
	var segund = moment().format('ss');
	
	var segundos= segund.toString();  //Pasar los segundos a string
	
	if (segundos.length < 2) {     // Si los segundos son de o a 9, poner un cero delante
		
		segundos= '0'+ segundos;
		
	}
	
	//var horas=time.getHours();			//Recuperar las horas de la hora
	
	var horas = moment().format('HH');
		
	var hora = horas + ":" + minutos + ":" + segundos;
	
	fecha = time + "  -  " + hora + "  -  " + importe;   // Fecha completa con la hora e importe
	
	var rec = localStorage.getItem("Recarga");
	
	var proximarecarga = "Recarga"+rec;
	
	localStorage.setItem(proximarecarga,fecha);
	
	rec = +rec + 1;
	
	localStorage.setItem("Recarga",rec);
	
	
		
}

