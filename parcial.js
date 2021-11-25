'use strict';

/* SCHIAVO IGNACIO JULIAN */

let catalogo = [

{
		id: 1,
		nombre: 'Mouse Logitech G203',
		precio: 2500,
	},
	{
		id: 2,
		nombre: 'Headset Redragon Zeus 2',
		precio: 6900,
	},
	{
		id: 3,
		nombre: 'Teclado Kumara K552',
		precio: 5500,
	},
	{
		id: 4,
		nombre: 'Micro Intel Core I5 10400F - 6 Núcleos',
		precio: 27000,
	},
	{
		id: 5,
		nombre: 'Micro AMD Ryzen 5 5600X - 6 Núcleos',
		precio: 43000,
	},
	{
		id: 6,
		nombre: 'Memoria RAM Kingston 8GB DDR4 3200Mhz',
		precio: 6000,
	},
	{
		id: 7,
		nombre: 'Gabinete Aerocool Mecha Templado 1x12cm',
		precio: 4800,
	},
	{
		id: 8,
		nombre: 'Placa de Video NVIDIA GeForce GTX 1650 4Gb',
		precio: 75999,
	},
	{
		id: 9,
		nombre: 'Disco SSD Kingston 240GB A400 SATA3',
		precio: 3300,
	},
];



const d = document;


let pre = d.querySelector('pre');
let addBtns = d.querySelectorAll('#productos button.add');
let delBtns = d.querySelectorAll('#productos button.del');
let reset = d.querySelector('#reset');

let carrito = {
	productosId: [],
	cantidad: [],
	total: 0,
	totalProductos: 0,
};


/*
pre.innerHTML = `
Productos: ${carrito.productosId}
Cantidades: ${carrito.cantidad}
Total: $${carrito.total}
Total Productos: ${carrito.totalProductos}

`;*/

const verificarSiCarritoVolvioACero = () =>{
	if (carrito.total == 0 && carrito.totalProductos == 0) {
		carrito.productosId = [];
		carrito.cantidad = [];
	}
}


for (let btn of addBtns) {
	btn.addEventListener('click', (e) => {

		let id = parseInt(e.target.dataset.id);
		let val = parseInt(e.target.dataset.val);
		let indice = carrito.productosId.indexOf(id);


		if (indice != -1) {
			carrito.cantidad[indice]++;
		} else {
			carrito.productosId.push(id);
			carrito.cantidad.push(1);
		}
		carrito.total = parseInt(carrito.total) + val;
		carrito.totalProductos++;
		pre.innerHTML = `
Productos: ${carrito.productosId}
Cantidades: ${carrito.cantidad}
Total: $${carrito.total}
Total Productos: ${carrito.totalProductos}

`;

	});
}

for (let btn of delBtns) {
	btn.addEventListener('click', (e) => {
		let id = parseInt(e.target.dataset.id);
		let val = parseInt(e.target.dataset.val);
		let indice = carrito.productosId.indexOf(id);
		if (indice != -1) {
			if (carrito.cantidad[indice] > 0) {
				carrito.cantidad[indice]--;
				carrito.totalProductos--;
				carrito.total = parseInt(carrito.total) - val;
				verificarSiCarritoVolvioACero();
			}
		}

		pre.innerHTML = `
Productos: ${carrito.productosId}
Cantidades: ${carrito.cantidad}
Total: $${carrito.total}
Total Productos: ${carrito.totalProductos}

`;

	});
}

reset.addEventListener('click', (e) => {
	location.reload();
});

d.querySelector('#ver-carrito').addEventListener('click', (e) => {
	d.querySelector('#lista').innerHTML = '';
	for (let productoId of carrito.productosId) {
		let li = d.createElement('li');
		li.innerHTML = productoId;
		d.querySelector('#lista').appendChild(li);
		let elProducto = catalogo.filter((productoCatalogo) => {
			return productoCatalogo.id == productoId;
		})[0];
		console.log(elProducto);
		li.innerHTML = `${elProducto.nombre} - $${elProducto.precio} - Cantidad: ${carrito.cantidad[carrito.productosId.indexOf(productoId)]}`;
	}
});