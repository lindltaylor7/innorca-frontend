const axios = require('axios');
const moment = require('moment');
const { Pool, Client } = require('pg');
const UtilsV3 = require('../sperant/sperantV3.utils');

const credentials = {
  user: 'picnic_digital',
  host: 'rssperant.cmd1cn2chqlh.us-east-1.redshift.amazonaws.com',
  database: 'bd96f11b5b82',
  password: 'ni2Ax78AGNj67w==',
  port: 5439,
};
const pool = new Pool(credentials);
const BIService = require('./bi.base');

const { SperantV3 } = require('../sperant');

const Sperant = new SperantV3();

class BIV1 extends BIService {
  constructor() {
    super();
  }

    checkConnection = async () => {
      const results = await pool.query('SELECT NOW()');
      return results;
    }
    /*
        SELECT estado, COUNT(estado)
              FROM menorca.vpagos
              WHERE activo = 't'
              GROUP BY estado
        */

    isCompleted = async (budgetCode) => {
      const results = await pool.query(`SELECT total_pendiente FROM menorca.procesos WHERE nombre = 'Venta' AND completado = 'Completado' AND codigo_proforma = '${budgetCode}' LIMIT 1`);

      if (results.rows.length) {
        const totalPendiente = results.rows[0].total_pendiente;
        if (totalPendiente === '0.00') {
          return true;
        }
        return false;
      }

      return false;
    }

    isCoOwner = async (document) => {
      const results = await pool.query(`select documento_cliente,documento_conyuge, REPLACE(documento_copropietarios, ' ', '') AS copropietario,numero_contrato, *
      from menorca.Procesos where copropietario LIKE '%${document}%' and nombre = 'Venta' LIMIT 1`);

      if (results.rows.length) {
        return true;
      }
      return false;
    }

    getEstadoNIF = async (contractNum) => {
      const results = await pool.query(`SELECT estado_nif, numero_contrato
        FROM menorca.vprocesos WHERE nombre = 'Venta' AND numero_contrato = '${contractNum}'`);

      return {
        data: results,
        numero_contrato: results.rows.length ? results.rows[0].numero_contrato : null,
        estado_nif: results.rows.length ? results.rows[0].estado_nif : null
      };
    }

    fetchPaymentStatus = async (budgetCode, userDocument, status, page, limit) => {
      // AND documento_cliente = '${userDocument}'
      let status_query = '';
      if (status == 'todos') {
        status_query = 'AND estado > \'\'';
      } else {
        status_query = `AND estado = '${status}'`;
      }
      const results = await pool.query(`SELECT nombre, moneda_venta, monto_programado, interes_vencido, mora, fecha_vcto, monto_pagado, saldo, fecha_pago, descuento
      FROM menorca.vpagos
      WHERE codigo_proforma = '${budgetCode}'
      ${status_query}
      AND activo = 't'
      ORDER BY fecha_vcto ASC
      LIMIT ${limit} OFFSET ((${page} - 1) * ${limit})`);
      return results;
    }

    fetchPaymentHistory = async (budgetCode, userDocument, page, limit) => {
      // AND documento_cliente = '${userDocument}'
      const results = await pool.query(`SELECT nombre, moneda_venta, monto_programado, interes_vencido, mora, fecha_vcto, monto_pagado, saldo, fecha_pago, descuento
        FROM menorca.vpagos
        WHERE codigo_proforma = '${budgetCode}'
        AND fecha_vcto <= current_date
        AND activo = 't'
        ORDER BY fecha_vcto DESC
        LIMIT ${limit} OFFSET ((${page} - 1) * ${limit})`);
      return results;
    }

    getBudgetPaidPayments = async (budgetCode, userDocument) => {
      const formatCurrency = UtilsV3.numberToCurrency('USD');
      // AND documento_cliente = '${userDocument}'
      const results = await pool.query(`SELECT COUNT(*), sum(monto_pagado) as total_count
        FROM menorca.vpagos
        WHERE codigo_proforma = '${budgetCode}'
        AND activo = 't'
        AND tipo = 'LETRA'
        AND estado = 'pagado'
        GROUP BY codigo_proforma`);
      return {
        DformattedTotalAmount: formatCurrency(results.rows[0].total_count),
        DtotalAmount: results.rows[0].total_count,
        DcompletedQuotes: results.rows[0].count
      };
    }

    getBudgetPaymentsQuotes = async (budgetCode, userDocument) => {
      const currency = await pool.query(`SELECT moneda FROM menorca.procesos WHERE nombre = 'Venta' AND completado = 'Completado' AND codigo_proforma = '${budgetCode}' LIMIT 1`);

      const formatCurrency = UtilsV3.numberToCurrency(currency.rows[0].moneda);

      const results = await pool.query(`SELECT COUNT(*), sum(monto_pagado) as total_count
      FROM menorca.vpagos
      WHERE codigo_proforma = '${budgetCode}'
      AND activo = 't'
      AND tipo = 'LETRA'
      AND estado = 'pagado'
      GROUP BY codigo_proforma`);
      // AND documento_cliente = '${userDocument}'
      const results2 = await pool.query(`SELECT COUNT(*), sum(saldo) as total_count
        FROM menorca.vpagos
        WHERE codigo_proforma = '${budgetCode}'
        AND activo = 't'
        AND tipo = 'LETRA'
        GROUP BY codigo_proforma`);

      const arr1 = results.rows.length ? results.rows[0].total_count : 0;
      const arr2 = results2.rows.length ? results2.rows[0].total_count : 0;

      const projectTotal = UtilsV3.Sum(arr2, arr1);

      return {
        DformattedTotalSaldo: results2.rows.length ? formatCurrency(results2.rows[0].total_count) : 0,
        DtotalSaldo: results2.rows.length ? results2.rows[0].total_count : 0,
        DtotalQuotes: results2.rows.length ? results2.rows[0].count : 0,
        DformattedTotalAmount: results.rows.length ? formatCurrency(results.rows[0].total_count) : 0,
        DtotalAmount: results.rows.length ? results.rows[0].total_count : 0,
        DcompletedQuotes: results.rows.length ? results.rows[0].count : 0,
        DformattedProjectTotal: formatCurrency(projectTotal),
        DprojectTotal: projectTotal
      };
    }

    getBudgetPaymentsPayments = async (budgetCode, userDocument) => {
      const currency = await pool.query(`SELECT moneda FROM menorca.procesos WHERE nombre = 'Venta' AND completado = 'Completado' AND codigo_proforma = '${budgetCode}' LIMIT 1`);

      const formatCurrency = UtilsV3.numberToCurrency(currency.rows[0].moneda);

      const results = await pool.query(`SELECT COUNT(*), sum(monto_pagado) as total_count
      FROM menorca.vpagos
      WHERE codigo_proforma = '${budgetCode}'
      AND activo = 't'
      AND tipo = 'PAGO'
      AND estado = 'pagado'
      GROUP BY codigo_proforma`);
      // AND documento_cliente = '${userDocument}'
      const results2 = await pool.query(`SELECT COUNT(*), sum(saldo) as total_count
      FROM menorca.vpagos
      WHERE codigo_proforma = '${budgetCode}'
      AND activo = 't'
      AND tipo = 'PAGO'
      GROUP BY codigo_proforma`);

      const arr1 = results.rows.length ? results.rows[0].total_count : 0;
      const arr2 = results2.rows.length ? results2.rows[0].total_count : 0;

      const projectTotal = UtilsV3.Sum(arr2, arr1);

      return {
        DformattedTotalSaldo: results2.rows.length ? formatCurrency(results2.rows[0].total_count) : 0,
        DtotalSaldo: results2.rows.length ? results2.rows[0].total_count : 0,
        DtotalQuotes: results2.rows.length ? results2.rows[0].count : 0,
        DformattedTotalAmount: results.rows.length ? formatCurrency(results.rows[0].total_count) : 0,
        DtotalAmount: results.rows.length ? results.rows[0].total_count : 0,
        DcompletedQuotes: results.rows.length ? results.rows[0].count : 0,
        DformattedProjectTotal: formatCurrency(projectTotal),
        DprojectTotal: projectTotal
      };
    }

    getReferralsBI = async (userDocument) => {
      // AND documento_cliente = '${userDocument}'
      const results = await pool.query(`SELECT
          d.valor AS dni_referidor,
          C.*
        FROM
          menorca.Clientes
          C INNER JOIN menorca.Datos_Extras d ON d.entidad = 'CLIENTE'
          AND d.nombre = 'medio_captacion_dni_referidor2'
          AND d.ID = C.ID
        WHERE
          dni_referidor=${userDocument}`);
      return results;
    }

    getUserGender = async (userDocument) => {
      const results = await pool.query(`SELECT
          genero
        FROM
          menorca.clientes
        WHERE
          documento=${userDocument}`);
        // return results

      return {
        genero: results.rows.length ? results.rows[0].genero : null
      };
    }

    getReferralExistenceBI = async (userDocument, referralDocument) => {
      // AND documento_cliente = '${userDocument}'
      const results = await pool.query(`SELECT
          d.valor AS dni_referidor,
          C.*
        FROM
          menorca.Clientes
          C INNER JOIN menorca.Datos_Extras d ON d.entidad = 'CLIENTE'
          AND d.nombre = 'medio_captacion_dni_referidor2'
          AND d.ID = C.ID
        WHERE
          dni_referidor='${userDocument}' AND C.documento='${referralDocument}'`);
      return results;
    }

    getGCData = async (contractNum) => {
      const results = await pool.query(`SELECT
      cl.nombres + cl.apellidos Nombre_Clientes, -- varchar(765)
      cl.documento, --varchar(765)
      situacion_legal, --varchar(16)
      documento_conyuge, --varchar(765)
      cl.fecha_creacion, --date
      cte.fecha_contrato, --date
      depr.valor Plaza, --varchar(32768)
      nombre_proyecto,--varchar(765)
      tipo_proyecto,--varchar(765)
      estado_construccion, --varchar(765)
      Etapa --varchar(3)
      ,manzana --varchar(765)
      ,lote --varchar(765)
      ,Piso --varchar(11)
      ,area_libre --numeric(15,2)
      ,area_lote --varchar(32768)
      ,cl.direccion --varchar(765)
      ,cl.distrito --varchar(765)
      ,cl.email --varchar(765)
      ,cl.telefono --varchar(765)
      ,cl.celulares --varchar(24000)
      ,cte.tipo_financiamiento 
      ,estado_contrato --varchar(9)
      ,tea --float8
      ,precio_venta_usd --numeric(15,2)
      ,total_pagado --numeric(38,2)
      ,total_pendiente --numeric(38,2)
      , monto_pagado_firma --numeric(17,2)
      ,saldo_financiar --float8
      , num_cuotas_inicial --integer
      ,num_cuotas_saldo --integer
      , monto_cuota_inicial --float8
      ,fecha_1ra_cuota --date
      , total_int_compensatorio --float8
      ,total_int_diferido --float8
      ,total_int_inicial --float8
      ,total_int_mora --float8
      ,TotalAte TotalAtencionCliente --integer
      ,total_interacciones --integer
      , ingreso_mensual  --varchar(32768)
      , cte.numero_contrato --varchar(765)
      , bono_casas
      , tipo_unidad_principal
      , total_int_vencido
      , cl.cliente_riesgo
      , zo.zona
      ,pep.valor
      FROM (
          SELECT 
            pr.codigo_proyecto
            , pr.nombre_proyecto
            , pr.numero_contrato --varchar(765)
            , pr.nombres_usuario full_name_vendedor
            , username vendedor
            , pr.nombres_cliente
            , pr.tipo_unidad_principal
            , pr.codigo_unidad
            , pr.precio_base_proforma precio_lista_usd
            ,  pr.precio_base_proforma*3.3 precio_lista_pen
            , pr.precio_venta - ISNULL(fi.descuento_inicial, 0) precio_venta_usd
            ,(pr.precio_venta - ISNULL(fi.descuento_inicial, 0))*3.3 precio_real_venta_pen
            , (CASE 
                WHEN (pr.descuento_venta <> 0 or descuento_inicial <> 0)
                then 'SI'
                else 'NO' END) aplico_descuento
            , pr.descuento_venta descuento_venta_usd
            , pr.descuento_venta*3.3 descuento_venta_pen
            , ISNULL(fi.descuento_inicial, 0) descuento_inicial_usd
            , (pr.descuento_venta + fi.descuento_inicial) descuento_total_usd
            , (pr.descuento_venta + fi.descuento_inicial)*3.3 descuento_total_pen
            , fi.num_cuotas_inicial num_cuotas_inicial
            , fi.num_cuotas_saldo num_cuotas_saldo
            , fi.num_cuotas_inicial + fi.num_cuotas_saldo total_meses_financiados
            , fi.nombre tipo_financiamiento
            , pr.fecha_contrato
            , pr.documento_cliente
            , pr.nombre
            , pr.nombre_flujo_venta
            , pr2.nombre_flujo_anulacion
            , pr.estado_contrato
            , total_pendiente
            , fecha_aprobacion
            , CASE
              WHEN pr.precio_venta <> 0 
              THEN  fi.total_inicial/pr.precio_venta*100 
              END AS PorcInicial
            , aprobador_descuento
            , fecha_1ra_cuota
            , fecha_proforma
            , codigo_proforma
            , fecha_impresion_contrato
            , modalidad_contrato
            , moneda
            , fecha_firma_contrato
            , banco
            , fecha_inicio
            , fecha_fin
            , fecha_expiracion
            , fecha_analisis
            , fecha_nif
            , origen_proforma
            , situacion_legal
            , tipo
            , estado_nif
            , tea
            , separacion
            , total_pagado
            , ISNULL(total_inicial, 0) total_inicial
            , fi.firma_contrato
            , saldo_inicial
            , saldo_financiar
            , monto_cuota_inicial
            , monto_cuota_financiar
            , tiempo_espera
            , total_int_compensatorio
            , total_int_diferido
            , total_int_inicial
            , total_int_mora
            , total_int_vencido
            , intereses_cobrado
            , tipo_cambio
            , documento_representante
            , fecha_creacion
            , usuario_creador
            , observacion
            , usuario_aprobador
            , 0 AS bono_casas
            , monto_pagado_firma
            , 3.3 TipoCambio
          FROM (SELECT codigo_proyecto
                , nombre_proyecto
                , numero_contrato
                , nombres_usuario
                , username
                , nombres_cliente +' '+ apellidos_cliente nombres_cliente
                , codigo_unidad
                , 'lote' as tipo_unidad_principal
                , precio_venta
                , descuento_venta
                , precio_base_proforma
                , fecha_contrato
                , documento_cliente
                , nombre
                , nombre_flujo nombre_flujo_venta
                , estado_contrato
                , total_pendiente
                , aprobador_descuento
                , fecha_proforma
                , codigo_proforma
                , fecha_impresion_contrato
                , modalidad_contrato
                , moneda
                , banco
                , fecha_inicio
                , fecha_fin
                , fecha_expiracion
                , fecha_analisis
                , fecha_nif
                , origen_proforma
                , situacion_legal
                , estado_nif
                , total_pagado
                , tipo_cambio
                , documento_representante
              FROM (SELECT        1 AS ContadorContrato, pr1.codigo_proyecto, pa.monto_pagado, pr1.numero_contrato, pr1.fecha_contrato, pr1.nombre_proyecto, pr1.codigo_unidad, UPPER(pr1.username) AS username, pr1.documento_cliente, 
                             pr1.total_pendiente,DATE_PART (year,pr1.fecha_contrato) AS AnhoContrato, 
                             pr1.precio_venta, pr1.codigo_externo_venta, pr1.codigo_externo_minuta, pr1.fecha_anulacion, pr1.fecha_inicio, pr1.fecha_fin, pr1.fecha_expiracion, 
                             pr1.estado_contrato, pr1.nombres_cliente, pr1.apellidos_cliente, pr1.fecha_nif, pr1.estado_nif, pr1.flujo_anulacion, pr1.nombres_usuario, pr1.descuento_venta, pr1.precio_base_proforma, pr1.nombre, pr1.nombre_flujo, 
                             pr1.aprobador_descuento, pr1.fecha_proforma, pr1.codigo_proforma, pr1.fecha_impresion_contrato, pr1.modalidad_contrato, pr1.moneda, pr1.banco, pr1.fecha_analisis, pr1.origen_proforma, pr1.situacion_legal, 
                             pr1.total_pagado, pr1.tipo_cambio, pr1.documento_representante, pr1.tipo_unidad_principal, pr1.total_unidades, pr1.codigo_unidades_asignadas, pr1.tipo_financiamiento, pr1.estado, pr1.completado
    FROM            menorca.Procesos AS pr1 LEFT OUTER JOIN
                                 (SELECT        numero_contrato, monto_pagado
                                   FROM            menorca.Pagos
                                   WHERE        (activo = 't') AND (nombre = 'FIRMA') AND (fecha_pago IS NOT NULL)
                     ) AS pa ON pa.numero_contrato = pr1.numero_contrato
    WHERE        (pr1.tipo_unidad_principal = 'lote') AND (pr1.nombre = 'Venta') AND (pr1.completado = 'Completado')
    ) p
              WHERE numero_contrato IS NOT NULL 
              and numero_contrato <> '' --- agregado por CLEON
              ) pr
          LEFT JOIN (
            SELECT numero_contrato
                , nombre_flujo nombre_flujo_anulacion
            FROM menorca.Procesos
            WHERE nombre = 'Anulacion'
            AND completado = 'Completado'
            AND estado = 'Activo'
            AND numero_contrato IS NOT NULL 
            and numero_contrato <> ''  --- agregado por CLEON
            ) pr2 ON pr2.numero_contrato = pr.numero_contrato
          LEFT JOIN (
              SELECT numero_contrato
                  , SUM(monto_pagado) monto_pagado_firma
              FROM menorca.pagos
              WHERE activo = 't'
              AND LOWER(etiqueta) IN ('firma de contrato', 'separación')
              GROUP BY numero_contrato
              ) pas ON pas.numero_contrato = pr.numero_contrato
          LEFT JOIN (
              SELECT numero_contrato
                  , SUM(interes_compensatorio + interes_diferido + interes_inicial + interes_vencido) intereses_cobrado
              FROM menorca.pagos
              WHERE activo = 't'
              AND LOWER(etiqueta) IN ('cuota inicial', 'cuota de saldo')
              AND saldo = 0
              GROUP BY numero_contrato
              ) paic ON paic.numero_contrato = pr.numero_contrato
          LEFT JOIN (SELECT numero_contrato
                    , descuento_inicial
                    , num_cuotas_inicial
                    , num_cuotas_saldo
                    , nombre
                    , fecha_aprobacion
                    , firma_contrato
                    , total_inicial
                    , fecha_1ra_cuota
                    , fecha_firma_contrato
                    , tipo
                    , tea
                    , separacion
                    , saldo_inicial
                    , saldo_financiar
                    , monto_cuota_inicial
                    , monto_cuota_financiar
                    , tiempo_espera
                    , total_int_compensatorio
                    , total_int_diferido
                    , total_int_inicial
                    , total_int_mora
                    , total_int_vencido
                    , fecha_creacion
                    , usuario_creador
                    , observacion
                    , usuario_aprobador
              FROM (SELECT        numero_contrato, total_descuento AS descuento_inicial, num_cuotas_inicial, num_cuotas_saldo, nombre, fecha_aprobacion, firma_contrato, total_inicial, fecha_1ra_cuota, fecha_firma_contrato, tipo, tea, separacion, 
                             saldo_inicial, saldo_financiar, monto_cuota_inicial, monto_cuota_financiar, tiempo_espera, total_int_compensatorio, total_int_diferido, total_int_inicial, total_int_mora, total_int_vencido, fecha_creacion, usuario_creador, 
                             observacion, usuario_aprobador, tipo_cuota
    FROM            menorca.Finanzas
    WHERE        (tipo = 'Financiamiento'))
              ) fi ON pr.numero_contrato = fi.numero_contrato
      
    
          UNION ALL
    
    
          SELECT  
            pr.codigo_proyecto
            , pr.nombre_proyecto
            , pr.numero_contrato
            , pr.nombres_usuario full_name_vendedor
            , username vendedor
            , pr.nombres_cliente
            , pr.tipo_unidad_principal
            , pr.codigo_unidad
            ,  pr.precio_base_proforma/3.3 precio_lista_usd
            , pr.precio_base_proforma precio_lista_pen
            , (pr.precio_venta - ISNULL(bono_casas, 0))/3.3 precio_venta_usd
            , (pr.precio_venta - ISNULL(bono_casas, 0))  precio_real_venta_pen
            , (CASE 
              WHEN (pr.descuento_venta <> 0) THEN 'SI'
              ELSE 'NO' 
              END) aplico_descuento
            , pr.descuento_venta/3.3 descuento_venta_usd
            , pr.descuento_venta descuento_venta_pen
            , 0 descuento_inicial_usd
            , pr.descuento_venta/3.3 descuento_total_usd
            , pr.descuento_venta descuento_total_pen
            , NULL num_letras_inicial
            , NULL num_letras_deuda
            , NULL Total_meses_financiados
            , NULL FORMA_FINANCIAMIENTO
            , pr.fecha_contrato fecha_venta
            , pr.documento_cliente
            , pr.nombre
            , pr.nombre_flujo_venta
            , pr2.nombre_flujo_anulacion
            , pr.estado_contrato
            , total_pendiente
            , cast(NULL as date) fecha_aprobacion
            , NULL PorcInicial
            , aprobador_descuento
            , cast(NULL as date)  fecha_1ra_cuota
            , fecha_proforma
            , codigo_proforma
            , fecha_impresion_contrato
            , modalidad_contrato
            , moneda
            , cast(NULL as date)  AS fecha_firma_contrato
            , banco
            , fecha_separacion
            , fecha_fin
            , fecha_expiracion
            , fecha_analisis
            , fecha_nif
            , origen_proforma
            , situacion_legal
            , '' tipo
            , estado_nif
            , NULL tea
            , NULL separacion
            , total_pagado
            , NULL total_inicial
            ,  pax.firma_contrato/3.3 firma_contrato
            , NULL saldo_inicial
            , NULL saldo_financiar
            , NULL monto_cuota_inicial
            , NULL monto_cuota_financiar
            , NULL tiempo_espera
            , NULL total_int_compensatorio
            , NULL total_int_diferido
            , NULL total_int_inicial
            , NULL total_int_mora
            , NULL total_int_vencido
            , 0 intereses_cobrado
            , tipo_cambio
            , documento_representante
            , cast(NULL as date)  fecha_creacion
            , NULL usuario_creador
            , NULL observacion
            , NULL usuario_aprobador
            , ISNULL(bc.bono_casas, 0) bono_casas
            ,  pax.firma_contrato_pagado/3.3 monto_pagado_firma
            , 3.3
          FROM (SELECT 
                pr1.codigo_proyecto
                , pr1.nombre_proyecto
                , pr1.numero_contrato
                , nombres_usuario
                , pr1.username
                , pr1.codigo_unidad
                , tipo_unidad_principal
                , documento_cliente
                , nombres_cliente +' '+ apellidos_cliente nombres_cliente
                , precio_base_proforma
                , precio_venta
                , descuento_venta
                , MAX(pr2.fecha_separacion) fecha_contrato
                , pr1.nombre
                , MAX(nombre_flujo) nombre_flujo_venta
                , estado_contrato
                , total_pendiente
                , aprobador_descuento
                , fecha_proforma
                , codigo_proforma
                , fecha_impresion_contrato
                , modalidad_contrato
                , moneda
                , banco
                , pr2.fecha_separacion
                , fecha_fin
                , fecha_expiracion
                , fecha_analisis
                , fecha_nif
                , origen_proforma
                , situacion_legal
                , estado_nif
                , total_pagado
                , tipo_cambio
                , documento_representante
              FROM menorca.[procesos] pr1
              INNER JOIN (SELECT        CTE.codigo_proyecto, CTE.monto_pagado, CTE.ContadorContrato, MIN(pr2.fecha_separacion) AS fecha_separacion, CTE.monto_programado, CTE.fecha_pago, CTE.numero_contrato, CTE.username, CTE.codigo_unidad, 
                             CTE.nombre_proyecto, MIN(CTE.nombre) AS nombre
    FROM            (SELECT        pr1.codigo_proyecto, pa.monto_pagado, 1 AS ContadorContrato, pr1.fecha_inicio, pa.monto_programado, pa.fecha_pago, pr1.numero_contrato, UPPER(pr1.username) AS username, pr1.codigo_unidad, 
                                                        pr1.nombre_proyecto, pr1.nombre
                              FROM            menorca.Procesos AS pr1 LEFT OUTER JOIN 
                                                            (SELECT        numero_contrato, SUM(monto_pagado) AS monto_pagado, SUM(monto_programado) AS monto_programado, MAX(fecha_pago) AS fecha_pago
                                                              FROM            menorca.Pagos
                                                              WHERE        (activo = 't') AND (fecha_pago IS NOT NULL) AND (etiqueta = 'Firma de Contrato')
                                                              GROUP BY numero_contrato) AS pa ON pa.numero_contrato = pr1.numero_contrato
                              WHERE        (pr1.tipo_unidad_principal in ('casa','departamento flat')) AND (pr1.nombre = 'Aprobacion') AND (pr1.flujo_anulacion NOT IN ('Error de Registro', 'Desistió por Otras Razones'))
                              UNION ALL
                              SELECT        pr1.codigo_proyecto, pa_2.monto_pagado, 1 AS ContadorContrato, pr1.fecha_inicio, pa_2.monto_programado, pa_2.fecha_pago, pr1.numero_contrato, UPPER(pr1.username) AS username, pr1.codigo_unidad, 
                                                       pr1.nombre_proyecto, pr1.nombre
                              FROM            menorca.Procesos AS pr1 LEFT OUTER JOIN
                                                           (SELECT        numero_contrato, SUM(monto_pagado) AS monto_pagado, SUM(monto_programado) AS monto_programado, MAX(fecha_pago) AS fecha_pago
                                                             FROM            menorca.Pagos AS Pagos_2
                                                             WHERE        (activo = 't') AND (fecha_pago IS NOT NULL) AND (etiqueta = 'Firma de Contrato')
                                                             GROUP BY numero_contrato) AS pa_2 ON pa_2.numero_contrato = pr1.numero_contrato
                              WHERE        (pr1.tipo_unidad_principal in ('casa','departamento flat')) AND (pr1.nombre = 'Separacion') AND (pr1.completado = 'Completado') AND (pr1.numero_contrato IS NOT NULL) AND (pr1.flujo_anulacion NOT IN ('Error de Registro', 
                                                       'Desistió por Otras Razones'))
                              UNION ALL
                              SELECT        pr1.codigo_proyecto, pa_1.monto_pagado, 1 AS ContadorContrato, pr1.fecha_inicio, pa_1.monto_programado, pa_1.fecha_pago, pr1.numero_contrato, UPPER(pr1.username) AS username, pr1.codigo_unidad, 
                                                       pr1.nombre_proyecto, pr1.nombre
                              FROM            menorca.Procesos AS pr1 INNER JOIN
                                                           (SELECT        numero_contrato, SUM(monto_pagado) AS monto_pagado, SUM(monto_programado) AS monto_programado, MAX(fecha_pago) AS fecha_pago
                                                             FROM            menorca.Pagos AS Pagos_1
                                                             WHERE        (activo = 't') AND (fecha_pago IS NOT NULL) AND (etiqueta = 'Firma de Contrato')
                                                             GROUP BY numero_contrato) AS pa_1 ON pr1.numero_contrato = pa_1.numero_contrato
                              WHERE        (pr1.tipo_unidad_principal in ('casa','departamento flat')) AND (pr1.nombre = 'Venta') AND (pr1.nombre_flujo IN ('Venta Hipotecaria de Casas', 'Venta Contado de Casas')) AND (pa_1.fecha_pago IS NOT NULL)) AS CTE INNER JOIN
                                 (SELECT        numero_contrato, fecha_inicio AS fecha_separacion
                                   FROM            menorca.Procesos
                                   WHERE        (nombre = 'Separacion')) AS pr2 ON pr2.numero_contrato = CTE.numero_contrato
    GROUP BY CTE.codigo_proyecto, CTE.monto_pagado, CTE.ContadorContrato, CTE.monto_programado, CTE.fecha_pago, CTE.numero_contrato, CTE.username, CTE.codigo_unidad, CTE.nombre_proyecto
    ) pr2 ON pr1.numero_contrato = pr2.numero_contrato
                AND pr1.nombre = pr2.nombre
              WHERE tipo_unidad_principal in ('casa','departamento flat') 
              AND pr1.Nombre IN ('Separacion', 'Aprobacion')
              AND pr1.flujo_anulacion NOT IN ('Error de Registro', 'Desistió por Otras Razones')
              AND pr2.numero_contrato IS NOT NULL
              AND pr2.numero_contrato <> ''  --- agregado por CLEON
              GROUP BY pr1.codigo_proyecto
                , pr1.nombre_proyecto
                , pr1.numero_contrato
                , nombres_usuario
                , pr1.username
                , pr1.codigo_unidad
                , tipo_unidad_principal
                , documento_cliente
                , pr1.nombre
                , nombres_cliente
                , total_pagado
                , apellidos_cliente
                , precio_base_proforma
                , precio_venta
                , descuento_venta
                , estado_contrato
                , total_pendiente
                , aprobador_descuento
                , fecha_proforma
                , codigo_proforma
                , fecha_impresion_contrato
                , modalidad_contrato
                , moneda
                , banco
                , pr2.fecha_separacion
                , fecha_fin
                , fecha_expiracion
                , fecha_analisis
                , fecha_nif
                , origen_proforma
                , situacion_legal
                , tipo
                , estado_nif
                , tipo_cambio
                , documento_representante
            ) pr
          LEFT JOIN (
              SELECT numero_contrato
                  , nombre_flujo nombre_flujo_anulacion
              FROM menorca.Procesos
              WHERE tipo_unidad_principal in ('casa','departamento flat') 
              AND Nombre = 'Anulacion'
              AND completado = 'Completado'
              AND estado = 'Activo'
                ) pr2 ON pr2.numero_contrato = pr.numero_contrato
          LEFT JOIN (
              SELECT numero_contrato
                  , monto_programado bono_casas
              FROM menorca.Pagos
              WHERE
              nombre LIKE '%BONO%'AND 
              activo = 't'
              AND etiqueta = 'Firma de Contrato'
              AND (etiqueta = 'Bono Menorca' or  nombre LIKE '%BONO%')
              and etiqueta != 'Pago en Exceso'
              )
               bc ON bc.numero_contrato = pr.numero_contrato
          LEFT JOIN (
              SELECT numero_contrato
                  , SUM(monto_programado) firma_contrato
                  , SUM(monto_pagado) firma_contrato_pagado
              FROM menorca.Pagos
              WHERE nombre LIKE '%FIRMA%'
              AND 
              activo = 't'
              AND etiqueta = 'Firma de Contrato'
              AND estado = 'pagado'
              GROUP BY numero_contrato
              ) pax ON pax.numero_contrato = pr.numero_contrato
        
      ) AS CTE
      LEFT JOIN (SELECT codigo
              , MAX(CASE
                WHEN nombre = 'zona'
                THEN valor end) zona
              , MAX(CASE 
                WHEN nombre='unidad_de_negocio'
                THEN valor END) unidad_de_negocio
              , MAX(CASE    
                  WHEN nombre = 'area_construida' THEN valor 
                  END) area_construida
              , MAX(CASE
                WHEN nombre='area_lote'
                THEN valor END) area_lote
              , MAX(CASE 
                WHEN nombre='rango_de_tamano' 
                THEN valor END) rango_de_tamano
              , MAX(CASE
                WHEN nombre='ubicacion_lote'
                then valor end) ubicacion_lote
            FROM menorca.datos_extras
            GROUP BY codigo
            ) de on CTE.codigo_unidad = de.codigo
      LEFT JOIN (
            SELECT codigo
                , area_libre
                , area_techada
                , precio_m2
                , nombre_subdivision manzana
                , nombre lote
                , piso
                , etapa
            FROM (SELECT        un.codigo, un.nombre_proyecto, un.codigo_proyecto, un.codigo_subdivision, 
                  case when un.codigo like '%BLOQUEO%' then 'BLOQUEO' else
                                SUBSTRING(un.codigo,CHARINDEX('-', un.codigo)+1,2) end AS etapa, un.nombre_subdivision, un.nombre, un.area_libre, un.area_techada, un.area_total, un.precio_m2, un.precio_lista, un.precio_base_proforma, un.precio_venta, un.tipo_unidad, 
                             un.estado_construccion, 
                             CASE WHEN estado_comercial = 'vendido' THEN 'vendido' WHEN estado_comercial = 'proceso de entrega' THEN 'vendido' WHEN estado_comercial = 'proceso de aprobación' THEN 'vendido' WHEN estado_comercial = 'proceso de separación'
                              THEN 'reservado' WHEN estado_comercial = 'separado' THEN 'reservado' WHEN estado_comercial = 'disponible' THEN 'disponible' WHEN estado_comercial = 'no disponible' THEN 'bloqueado' WHEN estado_comercial = 'reservado'
                              THEN 'reservado' WHEN estado_comercial = 'proceso de venta' THEN 'vendido' WHEN estado_comercial = 'entregado' THEN 'vendido' WHEN estado_comercial = 'aprobado' THEN 'vendido' WHEN estado_comercial = 'pre-asignado'
                              THEN 'bloqueado' END AS Estado_lote, REPLACE(un.piso, 'U', ' ') AS piso, de.ubicacion_lote, de.sub_ubicacion, de.proximidad_al_mar, de.vista_lateral, de.estado_obra, de.rango_de_tamano, de.frente, de.izquierda, 
                             de.derecha, de.fondo, de.m2_frente, de.m2_izquierda, de.m2_derecha, de.m2_fondo
    FROM            menorca.Unidades AS un LEFT OUTER JOIN
                                 (SELECT        codigo, MAX(CASE WHEN nombre = 'ubicacion_lote' THEN valor END) AS ubicacion_lote, MAX(CASE WHEN nombre = 'sub_ubicacion' THEN valor END) AS sub_ubicacion, 
                                                             MAX(CASE WHEN nombre = 'proximidad_al_mar' THEN valor END) AS proximidad_al_mar, MAX(CASE WHEN nombre = 'vista_lateral' THEN valor END) AS vista_lateral, 
                                                             MAX(CASE WHEN NOMBRE = 'estado_obra' THEN VALOR END) AS estado_obra, MAX(CASE WHEN NOMBRE = 'rango_de_tamano' THEN VALOR END) AS rango_de_tamano, 
                                                             MAX(CASE WHEN nombre = 'frente' THEN valor END) AS frente, MAX(CASE WHEN NOMBRE = 'izquierda' THEN VALOR END) AS izquierda, MAX(CASE WHEN nombre = 'derecha' THEN valor END) AS derecha, 
                                                             MAX(CASE WHEN nombre = 'fondo' THEN valor END) AS fondo, MAX(CASE WHEN nombre = 'm2_frente' THEN valor END) AS m2_frente, MAX(CASE WHEN NOMBRE = 'm2_izquierda' THEN VALOR END) 
                                                             AS m2_izquierda, MAX(CASE WHEN nombre = 'm2_derecha' THEN valor END) AS m2_derecha, MAX(CASE WHEN nombre = 'm2_fondo' THEN valor END) AS m2_fondo
                                   FROM            menorca.datos_extras
                                   WHERE        (entidad = 'UNIDAD')
                                   GROUP BY codigo) AS de ON un.codigo = de.codigo) 
            ) un ON CTE.codigo_unidad = un.codigo
      LEFT JOIN (SELECT codigo
              , MAX( CASE
                  WHEN nombre = 'moneda_ingresos'
                  THEN valor 
                  END) moneda_ingresos
               , MAX (CASE
                  WHEN nombre = 'sueldo'
                  THEN valor 
                  END) ingreso_mensual
            FROM menorca.[datos_extras] 
            GROUP BY codigo
            ) dei on CTE.documento_cliente = dei.codigo
      LEFT JOIN menorca.[clientes] cl ON CTE.documento_cliente = cl.documento
      --LEFT JOIN menorca.Documento_Firmas df on CTE.numero_contrato=df.numero_contrato
      LEFT JOIN (SELECT 
              codigo
              , MAX(CASE
                WHEN nombre='campana_actualizacion'
                then valor end) campana_actualizacion
            FROM menorca.[datos_extras] 
            GROUP BY codigo
            ) dt ON cl.documento = dt.codigo
      left JOIN menorca.Proyectos epp ON epp.codigo = CTE.codigo_proyecto
      left join  menorca.datos_extras depr on depr.codigo=cte.codigo_proyecto 
      left join (select count(1) TotalAte, numero_contrato 
      from menorca.Atencion where numero_contrato is not null group by  numero_contrato) ac 
      on ac.numero_contrato=cte.numero_contrato 
      LEFT JOIN (SELECT codigo_proforma
              , tipo_beneficiario
              , username
            FROM menorca.Beneficiarios 
            WHERE tipo_beneficiario <> 'vendedor'
            ) be ON CTE.codigo_proforma = be.codigo_proforma
      LEFT JOIN (SELECT codigo codigo_proforma
              , valor Ejecutiva_Firma
            FROM menorca.datos_extras 
            WHERE entidad='PROFORMA'and
            nombre = 'ejecutiva_tomo_firma'
            ) ef ON CTE.codigo_proforma = ef.codigo_proforma
      left JOIN (
          select numero_contrato, sum(capital_abono) capital_cobrado 
          from menorca.Depositos group by numero_contrato
      ) as dep on CTE.numero_contrato=dep.numero_contrato
      left join (select  codigo codigo_proyecto,valor Zona from menorca.datos_extras de 
      where entidad='PROYECTO' AND nombre='zona' )
      zo on zo.codigo_proyecto=CTE.codigo_proyecto
      left join (select distinct codigo documento_cliente ,valor
      from menorca.datos_extras where nombre like 'pep%' and valor='Si' and entidad='CLIENTE') pep
      on CTE.documento_cliente = pep.documento_cliente
      where depr.entidad='PROYECTO' and depr.nombre='plaza' 
    AND CTE.numero_contrato='${contractNum}'
        `);

      let obj = null;

      if (results.rows.length) {
        const data = results.rows[0];

        obj = {
          document: data.documento,
          nombres: data.nombre_clientes,
          situacion_legal: data.situacion_legal,
          documento_conyuge: data.documento_conyuge,
          fecha_creacion: moment(data.fecha_creacion).format('YYYY-MM-DD'),
          fecha_contrato: moment(data.fecha_contrato).format('YYYY-MM-DD'),
          nombre_plaza: data.plaza,
          nombre_proyecto: data.nombre_proyecto,
          tipo_proyecto: data.tipo_proyecto,
          estado_construccion: data.estado_construccion,
          etapa: data.etapa,
          manzana: data.manzana,
          lote: data.lote,
          piso: data.piso,
          area_libre: (data.area_libre ? parseFloat(data.area_libre) : null),
          area_lote: (data.area_lote ? parseFloat(data.area_lote) : null),
          direccion: data.direccion,
          distrito: data.distrito,
          email: data.email,
          telefono: data.telefono,
          celulares: [
            data.celulares
          ],
          tipo_financiamiento: data.tipo_financiamiento_finanzas,
          estado_contrato: data.estado_contrato,
          tea: data.tea,
          precio_venta_usd: data.precio_venta_usd,
          total_pagado: (data.total_pagado ? parseFloat(data.total_pagado) : null),
          total_pendiente: (data.total_pendiente ? parseFloat(data.total_pendiente) : null),
          monto_pagado_firma: (data.monto_pagado_firma ? parseFloat(data.monto_pagado_firma) : null),
          saldo_financiar: data.saldo_financiar,
          num_cuotas_inicial: data.num_cuotas_inicial,
          monto_cuota_inicial: data.monto_cuota_inicial,
          fecha_primera_cuota: moment(data.fecha_1ra_cuota).format('YYYY-MM-DD'),
          total_int_compensatorio: data.total_int_compensatorio,
          total_int_diferido: data.total_int_diferido,
          total_int_inicial: data.total_int_inicial,
          total_int_mora: data.total_int_mora,
          total_atencion_cliente: (data.totalatencioncliente ? parseInt(data.totalatencioncliente) : null),
          total_interacciones: (data.total_interacciones ? parseInt(data.total_interacciones) : null),
          ingreso_mensual: (data.ingreso_mensual ? parseFloat(data.ingreso_mensual) : null),
          provincia: data.provincia,
          num_cuotas_saldo: data.num_cuotas_saldo,
          zona: data.zona,
          tipo_unidad_principal: data.tipo_unidad_principal,
          bono_casas: data.bono_casas,
          total_int_vencido: data.total_int_vencido,
          cliente_riesgo: data.cliente_riesgo,
          cliente_pep: data.valor,
        };
      }

      return {
        data: obj
      };
    }

    getProcessUnitId = async (budgetId) => {
      const results = await pool.query(`SELECT id
        FROM menorca.procesos WHERE nombre = 'Venta' AND proforma_id = '${budgetId}'`);
      return {
        data: results,
        process_unit_id: results.rows[0].id
      };
    }

    getValidBudget = async (budgetId) => {
      const results = await pool.query(`SELECT codigo_proforma as code, numero_contrato as contract_num, codigo_unidad as unit_code, proforma_id as id,
      tipo_financiamiento as funding_type, codigo_proyecto as project_code
      FROM menorca.procesos WHERE nombre = 'Venta' AND completado = 'Completado' AND proforma_id = '${budgetId}'`);

      // console.log('resultados', budgetId, results.rows);

      const budget = results.rows[0];

      if (budget !== undefined) {
        const uCode = budget.unit_code.split('-');
        budget.etapa = uCode[1];
        budget.manzana = uCode[2];
        budget.lote = uCode[3];

        const results2 = await pool.query(`SELECT id
      FROM menorca.proyectos WHERE codigo = '${budget.project_code}'`);

        const project = results2.rows[0];

        const projectSperant = await Sperant.getProjectById(project.id);

        budget.project = projectSperant;
        budget.project_id = projectSperant.id;

        return {
          data: budget
        };
      }
      return {
        data: '',
      };
    }

    getStatusReferral = async (budgetId) => {
      const results = await pool.query(`SELECT *
      FROM menorca.procesos WHERE nombre = 'Venta' AND completado = 'Completado' AND proforma_id = '${budgetId}'`);
      return {
        data: results.rows[0]
      };
    }

    getProjectIdByCode = async (projectCode) => {
      const results = await pool.query(`SELECT *
      FROM menorca.proyectos WHERE codigo = '${projectCode}'`);
      return {
        id: results.rows[0].id
      };
    }

    getTipoUnidadPrincial = async (budgetCode) => {
      const results = await pool.query(`SELECT tipo_unidad_principal
    FROM menorca.procesos WHERE codigo_proforma = '${budgetCode}' LIMIT 1`);
      return {
        tipo_unidad_principal: results.rows[0].tipo_unidad_principal
      };
    }

    getFechaContrato = async (budgetCode) => {
      const results = await pool.query(`SELECT id, fecha_contrato
        FROM menorca.procesos WHERE completado = 'Completado' AND codigo_proforma = '${budgetCode}' LIMIT 1`);
      return {
        data: results,
        id: results.rows.length ? results.rows[0].id : null,
        contractStartDate: results.rows.length ? results.rows[0].fecha_contrato : null
      };
    }
}

module.exports = BIV1;
