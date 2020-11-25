/*Local de ventas de PCs
Una empresa de venta de computadoras está desarrollando un sistema para llevar registro de ventas. Para ello cuenta con la siguiente información:

Lista de las vendedoras de la empresa
Lista de ventas. Un array con objetos. Cada objeto representa una venta y tiene las propiedades fecha, nombreVendedora (un String con el nombre), componentes (un array Strings con el nombre de cada componente vendido).
Lista de precios de los componentes, de la forma (nombre componente, precio).*/
var local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ]
};

const { precios , ventas, vendedoras } = local

//Se pide desarrollar las siguientes funciones:

//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = (componentes) => {
  let precioComponente= 0;
      for (elemento of precios) {
      if (componentes.includes(elemento.componente)) {    
        precioComponente = precioComponente + elemento.precio // acumulador de precio elemento
      }      
    } 
    return precioComponente 
  }
  

//console.log( precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.
const cantidadVentasComponente = (componente) => {
  let cantidadComponente = 0;
  for (venta of ventas) {
    for(i = 0; i < venta.componentes.length ; i ++) {
      if (venta.componentes[i] === componente ) { // cond para saber si esta el parametro componente 
        cantidadComponente ++ //contador (aumenta de uno)
      }
    }
  } 
  return cantidadComponente
} 
//console.log( cantidadVentasComponente("Monitor ASC 543") ); // 2


//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const vendedoraDelMes = (mes, anio) => {
  //let ventasVendedora = {}; 
  let ventasNuevo = [];
  let ventaMayor=0;
  let vendedoraMayor=0;
    for (venta of ventas) {
      let anioVenta =venta.fecha.getFullYear();
      let mesVenta = venta.fecha.getMonth();
        if (anioVenta === anio && mesVenta+1 === mes){
          if(ventasNuevo.length === 0){
            ventasNuevo.push({nombre: venta.nombreVendedora, total: precioMaquina(venta.componentes)});
          }
          else if(ventasNuevo.length > 0){
            for(i = 0; i < ventasNuevo.length; i++) {
              if (ventasNuevo[i].nombre === venta.nombreVendedora) {
                ventasNuevo[i].total = ventasNuevo[i].total + precioMaquina(venta.componentes);
                break;
              }
              else if (ventasNuevo[i].nombre !== venta.nombreVendedora){
                ventasNuevo.push({nombre: venta.nombreVendedora, total: precioMaquina(venta.componentes)});
                break;
              }
            }
          }
        }
    }
    for(i = 0; i < ventasNuevo.length; i++) {
      if(ventasNuevo[i].total > ventaMayor){
        ventaMayor = ventasNuevo[i].total;
        vendedoraMayor = ventasNuevo[i].nombre
      }
    }
    return vendedoraMayor;
}


//console.log( vendedoraDelMes(1, 2019) ); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)


//ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio) => {
  let ventaMes = 0;

    for (venta of ventas) {
      let anioVenta =venta.fecha.getFullYear();
      let mesVenta = venta.fecha.getMonth();
        if (anioVenta === anio && mesVenta+1 === mes){
          ventaMes = ventaMes + precioMaquina(venta.componentes);
     
        }
    }  
    return ventaMes
}


//console.log( ventasMes(1, 2019) ); // 1250

//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) => {
  let ventaTotal = 0;
    for (venta of ventas) {
      if ( venta.nombreVendedora === nombre) {
        ventaTotal = ventaTotal + precioMaquina(venta.componentes)
      }
    }
    return ventaTotal
  }

//console.log( ventasVendedora("Grace") ); //900

//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
  let mayorComponente = 0;
  let nombreMayorComponente= 0; 
  for (elemento of precios ) {
    if (cantidadVentasComponente(elemento.componente) > mayorComponente){
      mayorComponente = cantidadVentasComponente(elemento.componente);
      nombreMayorComponente = elemento.componente;
    
    }
    return nombreMayorComponente
  } 

}
//console.log( componenteMasVendido() ); // Monitor GPRS 3000

//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).


     
const huboVentas = (mes, anio) => {
let resultadoVenta = 0;
  for (venta of ventas) {
      let anioVenta = venta.fecha.getFullYear();
      let mesVenta = venta.fecha.getMonth();
      if (anio === anioVenta && mesVenta+1 === mes){
        resultadoVenta = true

      } else
             {resultadoVenta = false
         } 
    } 
  return resultadoVenta
}
//console.log( huboVentas(3, 2019) ); // false

//Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la sucursal en la cual se realizó. Por ejemplo: { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }. Por este cambio, se pide:

//En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).


const agregoSucursal= (sucursalNew) => {
  for (venta of ventas) {
    //let venta = {sucursal : 'Centro'};

  venta.sucursal = sucursalNew;
  //console.log(venta);
} return ventas
}

agregoSucursal("Centro");
//console.table(ventas);
//Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

const propSucursales = () => {
  local.sucursales=['Centro', 'Caballito'];
}
propSucursales();
//console.log(local);

//Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal

// 12/02/2019, Hedy, [Monitor GPRS 3000, HDD Toyiva], Centro
// 24/02/2019, Sheryl, [Motherboard ASUS 1500, HDD Wezter Dishital], Caballito
// 01/02/2019, Ada, [Motherboard MZI, RAM Quinston Fury], Centro
// 11/02/2019, Grace, [Monitor ASC 543, RAM Quinston], Caballito
// 15/02/2019, Ada, [Motherboard ASUS 1200, RAM Quinston Fury], Centro
// 12/02/2019, Hedy, [Motherboard ASUS 1500, HDD Toyiva], Caballito
// 21/02/2019, Grace, [Motherboard MZI, RAM Quinston], Centro
// 08/02/2019, Sheryl, [Monitor ASC 543, HDD Wezter Dishital], Centro
// 16/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston Fury], Centro
// 27/02/2019, Hedy, [Motherboard ASUS 1200, HDD Toyiva], Caballito
// 22/02/2019, Grace, [Monitor ASC 543, HDD Wezter Dishital], Centro
// 05/02/2019, Ada, [Motherboard ASUS 1500, RAM Quinston], Centro
// 01/02/2019, Grace, [Motherboard MZI, HDD Wezter Dishital], Centro
// 07/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston], Caballito
// 14/02/2019, Ada, [Motherboard ASUS 1200, HDD Toyiva], Centro

const newVentas = (fechaNueva, nombreVendedoraNueva, componentesNueva, sucursalNueva) => {
    ventas.push({fecha: fechaNueva, nombreVendedora: nombreVendedoraNueva, componentes: componentesNueva, sucursal: sucursalNueva})
}

newVentas( new Date(2019,1,12),  "Hedy", ["Monitor GPRS 3000", "HDD Toyiva"], "Centro")
newVentas( new Date(2019,1,24), "Sheryl", ["Motherboard ASUS 1500", "HDD Wezter Dishital"], "Caballito")
newVentas( new Date(2019,1,1), "Ada", ["Motherboard MZI", "RAM Quinston Fury"], "Centro")
newVentas( new Date(2019,1,11), "Grace", ["Monitor ASC 543", "RAM Quinston"], "Caballito")
newVentas( new Date(2019,1,15), "Ada", ["Motherboard ASUS 1200", "RAM Quinston Fury"], "Centro")
newVentas( new Date(2019,1,12), "Hedy", ["Motherboard ASUS 1500", "HDD Toyiva"], "Caballito")
newVentas( new Date(2019,1,21), "Grace", ["Motherboard MZI", "RAM Quinston"], "Centro")
newVentas( new Date(2019,1,8), "Sheryl", ["Monitor ASC 543", "HDD Wezter Dishital"], "Centro")
newVentas( new Date(2019,1,16), "Sheryl", ["Monitor GPRS 3000", "RAM Quinston Fury"], "Centro")
newVentas( new Date(2019,1,27), "Hedy", ["Motherboard ASUS 1200", "HDD Toyiva"], "Caballito")
newVentas( new Date (2019,1,22), "Grace", ["Monitor ASC 543", "HDD Wezter Dishital"], "Centro")
newVentas( new Date(2019,1,5), "Ada", ["Motherboard ASUS 1500", "RAM Quinston"], "Centro")
newVentas( new Date(2019,1,1), "Grace", ["Motherboard MZI", "HDD Wezter Dishital"], "Centro")
newVentas( new Date(2019,1,7), "Sheryl", ["Monitor GPRS 3000", "RAM Quinston"], "Caballito")
newVentas( new Date(2019,1,14), "Ada", ["Motherboard ASUS 1200", "HDD Toyiva"], "Centro")

//console.table(ventas)
//Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (sucursal) => {
  let totalSucursal = 0;
    for (venta of ventas) {
      if (venta.sucursal === sucursal) {
        totalSucursal = totalSucursal + precioMaquina(venta.componentes)
      }
    }
    return totalSucursal
  }
//console.log( ventasSucursal("Centro") ); // 4195
//console.table(ventas)
//Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

const ventaParametro = (propiedad, valor) => {
  let totalParametro = 0;
    for (venta of ventas) {
      if (venta[propiedad] ===  valor) {
        totalParametro = totalParametro + precioMaquina(venta.componentes)
      }
    }
    return totalParametro
  }

  //console.log(ventaParametro("sucursal", "Centro"));

//Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const sucursalDelMes = (mes, anio) => {

  let anioVenta = venta.fecha.getFullYear();
  let mesVenta = venta.fecha.getMonth();
  let ventaTotalSucursal = 0
  let nombreSucursal = 0
  for (venta of ventas) {
    if ((anio === anioVenta) && (mesVenta+1 === mes) && (ventasSucursal(venta.sucursal)> ventaTotalSucursal) ) {
      ventaTotalSucursal = ventasSucursal(venta.sucursal);
      nombreSucursal = venta.sucursal;
        }
  }
return nombreSucursal
}
console.log( sucursalDelMes(1, 2019) ); // "Centro"
/*
Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes. Para esto, necesitamos crear las siguientes funciones:*/

//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

const renderPorMes = () => {
  let lista = 'Ventas por mes:';
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  for (i=0; i < meses.length; i++) {
      if(ventasMes(i+1,2019) >0){
      lista = lista + `\n Total de ${meses[i]} : ${ventasMes(i+1,2019)}`;   
  }  
  }
  return lista;
}
//console.log( renderPorMes() );
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

const renderPorSucursal = () => {
  let lista = "Ventas por sucursal:";
  for (i=0; i < local.sucursales.length; i++) {
    lista= lista + `\n Total de ${local.sucursales[i]} : ${ventasSucursal(local.sucursales[i])}` 
      }
    return lista 
    }

    //console.log( renderPorSucursal() );
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265

//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó



const render = () => {
  let mejorVendedora = 0;
  let nomVendedora= 0
  for (vendedora of vendedoras) {
    if (ventasVendedora(vendedora) > mejorVendedora) {
      mejorVendedora = ventasVendedora(vendedora);
      nomVendedora = vendedora 
    }  
  }
  

  return `Reporte \n ${renderPorMes ()} \n ${renderPorSucursal()} \n Producto estrella: ${componenteMasVendido ()} \n Vendedora que más ingresos generó: ${nomVendedora }`
  
  

} 
//console.log( render() );
// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace
//