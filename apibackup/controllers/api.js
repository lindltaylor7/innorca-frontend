const categories = [
  { name: "Casas-Entrega", code: "01" },
  { name: "Casas-Garantía", code: "02" },
  { name: "Casas-Observaciones", code: "03" },
  { name: "HU-Urbanización", code: "04" },
  { name: "Lotes-Legal", code: "05" },
  { name: "Lotes-Cancelación", code: "06" },
  { name: "Lotes-Cesión", code: "07" },
  { name: "Lotes-Cheques", code: "08" },
  { name: "Lotes-Cobranza", code: "09" },
  { name: "Lotes-Construcción", code: "10" },
  { name: "Lotes-Documentación", code: "11" },
  { name: "Lotes-Entrega", code: "12" },
  { name: "Lotes-Letras", code: "13" },
  { name: "Lotes-Minutas", code: "14" },
  { name: "Lotes-Pago Efectivo Letras", code: "15" },
  { name: "Lotes-Pago Efectivo Trámites", code: "16" },
  { name: "Lotes-Recupero", code: "17" },
  { name: "Lotes-Refinanciamiento", code: "18" },
  { name: "Lotes-Reprogramación", code: "19" },
  { name: "Lotes-Resolución", code: "20" },
  { name: "Lotes-Reubicación", code: "21" },
  { name: "Varios", code: "22" },
  { name: "Ventas", code: "23" },
];

const subCategories = [
  { name: "Entrega de casa en Proyecto", cat: "01", code: "01" },
  { name: "Entrega de casa Tácita (Oficinas)", cat: "01", code: "02" },
  { name: "Agenda de Visita", cat: "02", code: "03" },
  { name: "Información de status", cat: "02", code: "04" },
  { name: "Agenda de Visita", cat: "03", code: "05" },
  { name: "Información de status", cat: "03", code: "06" },
  { name: "Informacion de Parques", cat: "04", code: "07" },
  { name: "Informacion de Pistas", cat: "04", code: "08" },
  { name: "Informacion de Reservorios (Agua)", cat: "04", code: "09" },
  { name: "Informacion de PETARs", cat: "04", code: "10" },
  { name: "Informacion de Cascadas", cat: "04", code: "11" },
  { name: "Informacion de Serv. Eléctrico", cat: "04", code: "12" },
  { name: "Informacion de Cartas Notariales", cat: "05", code: "13" },
  { name: "Tramites legales", cat: "05", code: "14" },
  { name: "Monto total a cancelar: $XXXX", cat: "06", code: "15" },
  { name: "Inicio de Tramite", cat: "07", code: "16" },
  { name: "Resultado Evaluación", cat: "07", code: "17" },
  { name: "Culminación de Tramite de Cesión", cat: "07", code: "18" },
  { name: "Endoso de cheques", cat: "08", code: "19" },
  { name: "Devolución de cheques", cat: "08", code: "20" },
  { name: "Informacion de deuda", cat: "09", code: "21" },
  { name: "Informacion lugar de pago", cat: "09", code: "22" },
  { name: "Cliente moroso", cat: "09", code: "23" },
  { name: "Inicio de Construcción", cat: "10", code: "24" },
  { name: "Retiro muro tableta", cat: "10", code: "25" },
  { name: "Limpieza de lote", cat: "10", code: "26" },
  { name: "Entrega contrato C-V", cat: "11", code: "27" },
  { name: "Entrega de Planos", cat: "11", code: "28" },
  { name: "Entrega de Lotes en Proyecto", cat: "12", code: "29" },
  { name: "Entrega de Lotes Tácita (Oficinas)", cat: "12", code: "30" },
  { name: "Devolución de Letras", cat: "13", code: "31" },
  { name: "Regularización firma letras", cat: "13", code: "32" },
  { name: "Inicio de tramite de minutas", cat: "14", code: "33" },
  { name: "Entrega de Minuta", cat: "14", code: "34" },
  { name: "PE Letra Completa", cat: "15", code: "35" },
  { name: "PE Letra pago a cuenta", cat: "15", code: "36" },
  { name: "PE Cancelación", cat: "16", code: "37" },
  { name: "PE Cesión", cat: "16", code: "38" },
  { name: "PE Refinanciamiento", cat: "16", code: "39" },
  { name: "PE Reprogramación", cat: "16", code: "40" },
  { name: "PE Otros Tramites", cat: "16", code: "41" },
  { name: "Recupero", cat: "17", code: "42" },
  { name: "Refinanciamiento con Amortización", cat: "18", code: "43" },
  { name: "Refinanciamiento sin Amortización", cat: "18", code: "44" },
  { name: "Reprogramación Total", cat: "19", code: "45" },
  { name: "Reprogramación Parcial", cat: "19", code: "46" },
  { name: "Exoneración de Mora", cat: "19", code: "47" },
  { name: "Resolución por Morosidad", cat: "20", code: "48" },
  { name: "Resolución APC", cat: "20", code: "49" },
  { name: "Reubicación por Reestructurac. Proyecto", cat: "21", code: "50" },
  { name: "Reubicación por acuerdo Comercial", cat: "21", code: "51" },
  { name: "Consultas", cat: "22", code: "52" },
  { name: "Informacion de ventas", cat: "23", code: "53" },
];

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

exports.getSubCategories = (req, res) => {
  const categoryName = req.params.id
  let categoryId=''
  for(i=0;i<categories.length;i++){
    if(categories[i].name==categoryName){
      categoryId=categories[i].code
    }
  }
  res.send({subCategories: subCategories.filter((r) => r.cat == categoryId).sort(compare)})
}