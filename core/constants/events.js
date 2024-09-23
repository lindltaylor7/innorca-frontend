export const EVENTS = {
	registro: {
		login: 'registro_ingreso', // Success Login
		visitas: 'registro_visita', // Cada vez que se ingresa a la aplicacion
		signup: 'registro_nuevo-usuario', // Success registrar nuevo usuario
		clickRegistrate: 'registro_click_registrate', // Click en el button/link registrate
		clickRecuperarContrasena: 'registro_click_recuperar-contrasena', // click button/link recuperar contraseña
		clickLogin: 'registro_click_login', // click button/link login
		actualizarDatos: 'registro_actualizar-datos',
		cambioContrasena: 'registro_cambiar-contrasena'
	},
	misPagos: {
		pagoEfectivo: 'misPagos_pagoEfectivo', // Codigo de pago Efectivo Generado
		pagoEfectivoSms: 'misPagos_agoEfectivo-sms', // Compartir codigo por sms
		clickPagoEfectivo: 'misPagos_click_pagoEfectivo', // Click al button de pago eefectivo
		clickGuiaPagoVencida: 'misPagos_guia-pago-vencida', // click a enlace de guia de pago vencida
		clickGuiaPagoProxima: 'misPagos_guia-pago-proxima', // click a enlace de guia de pago proxima cuota,
		clickVerMisPagos: 'misPagos_click_ver-mis-pagos', // click button/link para ver mis deudas(navegas a mis deudas),
		clickMisUltimosPagos: 'misPagos_click_mis-ultimos-pagos' // click button/link a mis ultimos pagos,
	},
	construcciones: {
		clickNuevaCotizacion: 'construcciones_click_nueva-cotizacion',
		clickHistorialCotizacion: 'construcciones_click_historial-cotizacion',
		clickVerMasDetallesCotizacion: 'construcciones_click_Ver-Deralles-cotizacion',
		descargarCotizacion: 'construcciones_descargar-cotizacion',
		realizarCotizacion: 'construcciones_realizar-cotizacion',
		guardarCotizacion: 'construcciones_guardar_cotizacion',
	},
	atencionCliente: {
		clickSolicitarAtencion: 'atencionCliente_click_solicitar-atencion', // click enlace/button para solicita atencion
		clickHistorialAtencion: 'atencionCliente_click_historial-atencion', // click en un card/button referente a un chat de atencion al cliente
		clickVerMasPreguntas: 'atencionCliente_click_ver-mas-preguntas',
		clickCrearSolicitud: 'atencionCliente_click_crear-solicitud',
		crearSolicitud: 'atencionCliente_crear-solicitud' // click button abre modal/redireccion para crear una solicitud
	},
	referidos: {
		clickEnterateMas: 'referidos_click_enterate-mas', // click en la button/enlace para mostrar mas iformacion sobre recompensas
		clickReferirAhora: 'referidos_click_referir-ahora', // click button/enlace navega a mis referidos
		clickImportContactos: 'referidos_click_importar-contacto', // Click button/enlace importar contacto
		clickSeleccionarFuente: 'referidos_click_seleccionar-fuente', // Seleccionar fuente de datos para importar contactos (google,...)
		nuevoReferido: 'referidos_nuevo-referido',
		nuevoContacto: 'referidos_nuevo-contacto',
		editarContacto: 'referidos_editar-contacto',
		importarContacto: 'referidos_importar-contacto'
	},
	misInmuebles: {
		clickVerInmuebles: 'misInmuebles_click_ver-inmuebles', // button/link que redirige a mis pagos
		clickAnexos: 'misInmuebles_click_anexos'
	},
	novedades: {
		clickVerMas: 'novedades_click_ver-mas',
		clickVerPost: 'novedades_click_ver-post'
	}
};
