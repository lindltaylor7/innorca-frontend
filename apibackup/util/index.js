const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const axios = require('axios');
const FormData = require("form-data");
moment.locale('es');

const formatter = new Intl.NumberFormat('en-US');

exports.formatMoneyFaik = (pay) => {
    pay = Math.ceil(pay)
    pay = formatter.format(pay)
    return pay
};

function formatMoneyFaik(pay) {
    pay = Math.ceil(pay)
    pay = formatter.format(pay)
    return pay
};

exports.formatMoney = (pay) => {

    const dec = (pay.toString()).split(".")
    const splittedPay = (formatter.format(pay)).split(".")
    if (dec[1] == undefined) {
        return `S/${splittedPay[0]+".00"}`
    } else {
        return `S/${splittedPay[0]+"."+dec[1]}`
    }
};

exports.returnMoney = (n) => {
    const dec = n.split(",")
    const oldString = ""
    const newNumber = 0
    for (let index = 0; index < dec.length; index++) {
        oldString = oldString + dex[dex.length - index]
    }
    newNumber = parseFloat(oldString)
    return newNumber
};

exports.roundUp = (n) => {
    n = String(n);
    const dec = n.split(".")
    let deci = parseInt(dec[0])
    if (parseInt(dec[1]) > 1) {
        deci = deci + 1;
        return deci;
    }
    return parseInt(n)
};

exports.xmlToJson = (xml) => {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

exports.pdfFileSend = async(quote, user) => {
    try {
        const docName = `${user.profile.document}-${Date.now()}.pdf`
            .split(" ")
            .join(".");

        const docPath = path.join(__dirname, `../uploads/${docName}`);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(docPath));
        let i = 1
        quote.projects.forEach((p) => {
            if (i > 1) {
                doc.addPage();
            }
            doc.moveTo(50, 15).lineTo(562, 15).stroke();
            doc.image(path.join(__dirname, "../public/images/menorca-text-2.png"), 60, 22, {
                fit: [110, 45],
            });

            doc.fontSize(10).font("Helvetica-Bold").text("DETALLE DE COTIZACIÓN REFERENCIAL", 340, 27.5);

            doc.moveTo(50, 45).lineTo(562, 45).stroke();

            doc.font("Helvetica");
            doc.fontSize(10).text(
                `Usuario: ${user.profile.name} – DNI/RUC: ${
          user.profile.document
        } – ${moment()
          .utc(false)
          .subtract(5, "hours")
          .format("DD/MM/YYYY [-] hh:mm a")}`,
                50,
                50, { align: "left" }
            );
            let topStart = 60;

            doc.fillColor("black");
            const quoteFields = [
                { name: "Tipo de construcción", field: "projectType" },
                { name: "Tentativa de construcción", field: "startDate" },
                { name: "¿Desea asesoría?", field: "counseling" },
                { name: "Costo total de construcción", field: "totalCostNumber" }
            ];
            if (i == 1) {
                topStart = 45;
                for (let index = 0; index < quoteFields.length; index++) {
                    topStart += 20;
                    textStart = topStart + 10.5;
                    doc
                        .font("Helvetica-Bold")
                        .fontSize(10).fillColor('#78ad25')
                        .text(`${quoteFields[index].name}`, 90, textStart, { width: 206, align: "right" });
                    if (quoteFields[index].field == 'totalCostNumber') {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`S/${formatMoneyFaik(quote[quoteFields[index].field])}`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    } else if (quoteFields[index].field == 'counseling' && quote[quoteFields[index].field]) {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`Si`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    } else if (quoteFields[index].field == 'counseling' && !quote[quoteFields[index].field]) {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`No`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    } else {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`${quote[quoteFields[index].field]}`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    }


                }
            }
            topStart += 25;
            textStart = topStart + 10.5;
            doc
                .font("Helvetica-Bold")
                .fontSize(14).fillColor('#78ad25')
                .text(`Proyecto: ${p.roomType} / Piso: ${p.location}`, 48, textStart, { width: 512, align: "center" });
            const normalFields = [
                { name: "Largo", field: "long" },
                { name: "Ancho", field: "width" }
            ];
            for (let index = 0; index < normalFields.length; index++) {
                topStart += 20;
                textStart = topStart + 10.5;
                doc
                    .font("Helvetica-Bold")
                    .fontSize(10).fillColor('#78ad25')
                    .text(`${normalFields[index].name}`, 90, textStart, { width: 206, align: "right" });
                doc
                    .font("Helvetica")
                    .fontSize(10).fillColor('#a1aab2')
                    .text(`${normalFields[index].field=='long'||normalFields[index].field=='width'?p[normalFields[index].field]+' metros':p[normalFields[index].field]}`, 316, textStart, {
                        width: 206,
                        align: "left",
                    });

            }
            topStart += 40;
            textStart = topStart + 10.5;
            var bot = topStart + 25;
            doc
                .polygon([50, topStart], [50, bot], [562, bot], [562, topStart])
                .fillAndStroke("#008533", "#008533")
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("ÍNDICE", 55, textStart, { width: 30, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("MATERIALES EN CANTIDADES Y UNIDADES COMERCIALES", 95, textStart, { width: 260, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("CANTIDAD", 342.5, textStart, { width: 50, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("UNIDAD", 395, textStart, { width: 45, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("PRECIO", 440, textStart, { width: 45, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("COSTO PARCIAL", 485, textStart, { width: 70, align: "left" });
            for (let index = 0; index < p.materials.length; index++) {
                topStart += 25;
                textStart = topStart + 10.5;
                var bot = topStart + 25;
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].index}`, 55, textStart, { width: 30, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].name}`, 95, textStart, { width: 260, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].quantity}`, 342.5, textStart, { width: 50, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].unit}`, 395, textStart, { width: 45, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`S/${p.materials[index].price}`, 440, textStart, { width: 45, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`S/${p.materials[index].parcialCost}`, 485, textStart, { width: 70, align: "left" });
                doc.moveTo(50, bot).lineTo(562, bot).stroke("#e8eef3");
            }
            textStart = topStart + 8;
            doc
                .polygon([50, topStart], [50, bot], [562, bot], [562, topStart])
                .fillAndStroke("#008533", "#008533")
            doc
                .font("Helvetica-Bold")
                .fontSize(12).fillColor('#FFFFFF')
                .text("COSTO TOTAL", 55, textStart, { width: 500, align: "center" });
            doc
                .font("Helvetica-Bold")
                .fontSize(12).fillColor('#FFFFFF')
                .text(`S/${p.totalCost}`, 485, textStart, { width: 70, align: "left" });
            i += 1;

        });
        doc.addPage();
        doc.moveTo(50, 20).lineTo(562, 20).stroke();
        doc.image(path.join(__dirname, "../public/images/menorca-text-2.png"), 60, 22, {
            fit: [110, 45],
        });
        doc.fontSize(12).font("Helvetica-Bold").text("DETALLE DE COTIZACIÓN REFERENCIAL", 340, 35);

        doc.moveTo(50, 60).lineTo(562, 60).stroke();

        doc.font("Helvetica");
        doc.text(
            `Usuario: ${user.profile.name} – DNI/RUC: ${
        user.profile.document
      } – ${moment()
        .utc(false)
        .subtract(5, "hours")
        .format("DD/MM/YYYY [-] hh:mm a")}`,
            50,
            70, { align: "center" }
        );
        let topStart = 100;
        textStart = topStart + 8;
        var bot = topStart + 25;
        doc
            .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
            .fillAndStroke("#008533", "#008533")
        doc
            .font("Helvetica-Bold")
            .fontSize(12).fillColor('#FFFFFF')
            .text("COSTO FINAL", 155, textStart, { width: 185, align: "center" });
        doc
            .font("Helvetica-Bold")
            .fontSize(12).fillColor('#FFFFFF')
            .text(`S/${formatMoneyFaik(quote.totalCostNumber)}`, 300, textStart, { width: 185, align: "center" });
        topStart += 40;
        textStart = topStart;
        bot += topStart + 55;
        doc
            .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
            .stroke("#e8eef3");
        topStart += 15;
        textStart = topStart
        doc
            .font("Helvetica-Bold")
            .fontSize(12).fillColor('#158A2F')
            .text("¡MUY IMPORTANTE!", 155, textStart, { width: 312, align: "center" });
        topStart += 15;
        textStart = topStart
        doc
            .font("Helvetica-Bold")
            .fontSize(10).fillColor('#78ad25')
            .text("Antes de construir recuerda que:", 155, textStart, { width: 312, align: "center" });
        topStart += 15;
        textStart = topStart
        doc
            .font("Helvetica-Bold")
            .fontSize(8).fillColor('#67757c')
            .list(["Realizar una buena mezcla y vaciado nos ayudará a evitar burbujas de aire en las losas, columnas y vigas, con esto evitaremos caer en costos adicionales en la compra de aditivos para solucionar cangrejeras.", "Es recomendable utilizar una vibradora eléctrica para garantizar el movimiento que eliminará las burbujas de aire en la mezcla.", "Los muros de contención o pircas deben estar bien asentados para evitar deslizamientos futuros. Una buena cimentación puede asegurar tu construcción y los pisos futuros que quieras construir. Las vigas y columnas siempre deben de estar unidas.", "Estudio de la calidad de suelo te puede y te sirve para saber la forma de segura de construir tu hogar."], 170, textStart, { width: 275 })
        topStart += 150;
        textStart = topStart + 10;
        bot = topStart + 25;
        let notes = ["Todos los costos son referenciales y no incluye IGV.",
            "Los precios fueron actualizados y modificados de acuerdo a la mano de obra y materiales en Lima Metropolitana y Callao, conforme a lo publicado, en la revista especializada para construcción COSTOS del año 2019 y su página web: Costos Perú",
            "Es importante mencionar que no se contemplan en estos costos los precios de las instalaciones sanitarias y eléctricas, estas se definirán por punto instalado por el mismo usuario.",
            "Es importante contemplar sobre el costo final un 20% adicional para mantener un margen según el mercado."
        ]
        doc
            .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
            .fillAndStroke("#008533", "#008533")
        doc
            .font("Helvetica-Bold")
            .fontSize(8).fillColor('#FFFFFF')
            .text("NOTA IMPORTANTE", 155, textStart, { width: 185, align: "left" });
        for (let index = 0; index < notes.length; index++) {
            if (index == 0) {
                topStart += 25;
                bot = topStart + 25;
            } else if (index == 1) {
                topStart += 25;
                bot = topStart + 55;
            } else if (index == 2) {
                topStart += 55;
                bot = topStart + 45;
            } else if (index == 3) {
                topStart += 45;
                bot = topStart + 35;
            }
            textStart = topStart + 10.5;
            if (index == 1) {
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${notes[index]}`, 155, textStart, { width: 305, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#78ad25')
                    .text(`Costos Perú`, 175, textStart + 28.5, { width: 50, link: "https://costosperu.com/PortalSuscriptores/Partidas", lineBreak: true, align: "left" });

            } else {
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${notes[index]}`, 155, textStart, { width: 305, align: "left" });
            }
            doc
                .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
                .stroke("#e8eef3");
        }
        doc.end();
        return { doc, docPath, docName };
    } catch (error) {
        console.log(error);
    }
};

exports.pdfFileDownload = async(quote, user) => {
    try {
        const docName = `${user.profile.document}-${Date.now()}.pdf`
            .split(" ")
            .join(".");

        //const docPath = path.join(__dirname, `../uploads/${docName}`);
        const docPath = path.join(__dirname, `../public/images/uploads/${docName}`);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(docPath));
        let i = 1
        quote.projects.forEach((p) => {
            if (i > 1) {
                doc.addPage();
            }
            doc.moveTo(50, 15).lineTo(562, 15).stroke();
            doc.image(path.join(__dirname, "../public/images/menorca-text-2.png"), 60, 22, {
                fit: [110, 45],
            });

            doc.fontSize(10).font("Helvetica-Bold").text("DETALLE DE COTIZACIÓN REFERENCIAL", 340, 27.5);

            doc.moveTo(50, 45).lineTo(562, 45).stroke();

            doc.font("Helvetica");
            doc.fontSize(10).text(
                `Usuario: ${user.profile.name} – DNI/RUC: ${
          user.profile.document
        } – ${moment()
          .utc(false)
          .subtract(5, "hours")
          .format("DD/MM/YYYY [-] hh:mm a")}`,
                50,
                50, { align: "left" }
            );
            let topStart = 60;

            doc.fillColor("black");
            const quoteFields = [
                { name: "Tipo de construcción", field: "projectType" },
                { name: "Tentativa de construcción", field: "startDate" },
                { name: "¿Desea asesoría?", field: "counseling" },
                { name: "Costo total de construcción", field: "totalCostNumber" }
            ];
            if (i == 1) {
                topStart = 45;
                for (let index = 0; index < quoteFields.length; index++) {
                    topStart += 20;
                    textStart = topStart + 10.5;
                    doc
                        .font("Helvetica-Bold")
                        .fontSize(10).fillColor('#78ad25')
                        .text(`${quoteFields[index].name}`, 90, textStart, { width: 206, align: "right" });
                    if (quoteFields[index].field == 'totalCostNumber') {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`S/${formatMoneyFaik(quote[quoteFields[index].field])}`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    } else if (quoteFields[index].field == 'counseling' && quote[quoteFields[index].field]) {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`Si`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    } else if (quoteFields[index].field == 'counseling' && !quote[quoteFields[index].field]) {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`No`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    } else {
                        doc
                            .font("Helvetica")
                            .fontSize(10).fillColor('#a1aab2')
                            .text(`${quote[quoteFields[index].field]}`, 316, textStart, {
                                width: 206,
                                align: "left",
                            });
                    }


                }
            }
            topStart += 25;
            textStart = topStart + 10.5;
            doc
                .font("Helvetica-Bold")
                .fontSize(14).fillColor('#78ad25')
                .text(`Proyecto: ${p.roomType} / Piso: ${p.location}`, 48, textStart, { width: 512, align: "center" });
            const normalFields = [
                { name: "Largo", field: "long" },
                { name: "Ancho", field: "width" }
            ];
            for (let index = 0; index < normalFields.length; index++) {
                topStart += 20;
                textStart = topStart + 10.5;
                doc
                    .font("Helvetica-Bold")
                    .fontSize(10).fillColor('#78ad25')
                    .text(`${normalFields[index].name}`, 90, textStart, { width: 206, align: "right" });
                doc
                    .font("Helvetica")
                    .fontSize(10).fillColor('#a1aab2')
                    .text(`${normalFields[index].field=='long'||normalFields[index].field=='width'?p[normalFields[index].field]+' metros':p[normalFields[index].field]}`, 316, textStart, {
                        width: 206,
                        align: "left",
                    });

            }
            topStart += 40;
            textStart = topStart + 10.5;
            var bot = topStart + 25;
            doc
                .polygon([50, topStart], [50, bot], [562, bot], [562, topStart])
                .fillAndStroke("#008533", "#008533")
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("ÍNDICE", 55, textStart, { width: 30, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("MATERIALES EN CANTIDADES Y UNIDADES COMERCIALES", 95, textStart, { width: 260, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("CANTIDAD", 342.5, textStart, { width: 50, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("UNIDAD", 395, textStart, { width: 45, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("PRECIO", 440, textStart, { width: 45, align: "left" });
            doc
                .font("Helvetica-Bold")
                .fontSize(8).fillColor('#FFFFFF')
                .text("COSTO PARCIAL", 485, textStart, { width: 70, align: "left" });
            for (let index = 0; index < p.materials.length; index++) {
                topStart += 25;
                textStart = topStart + 10.5;
                var bot = topStart + 25;
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].index}`, 55, textStart, { width: 30, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].name}`, 95, textStart, { width: 260, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].quantity}`, 342.5, textStart, { width: 50, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${p.materials[index].unit}`, 395, textStart, { width: 45, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`S/${p.materials[index].price}`, 440, textStart, { width: 45, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`S/${p.materials[index].parcialCost}`, 485, textStart, { width: 70, align: "left" });
                doc.moveTo(50, bot).lineTo(562, bot).stroke("#e8eef3");
            }
            textStart = topStart + 8;
            doc
                .polygon([50, topStart], [50, bot], [562, bot], [562, topStart])
                .fillAndStroke("#008533", "#008533")
            doc
                .font("Helvetica-Bold")
                .fontSize(12).fillColor('#FFFFFF')
                .text("COSTO TOTAL", 55, textStart, { width: 500, align: "center" });
            doc
                .font("Helvetica-Bold")
                .fontSize(12).fillColor('#FFFFFF')
                .text(`S/${p.totalCost}`, 485, textStart, { width: 70, align: "left" });
            i += 1;

        });
        doc.addPage();
        doc.moveTo(50, 15).lineTo(562, 15).stroke();
        doc.image(path.join(__dirname, "../public/images/menorca-text-2.png"), 60, 22, {
            fit: [110, 45],
        });

        doc.fontSize(10).font("Helvetica-Bold").text("DETALLE DE COTIZACIÓN REFERENCIAL", 340, 27.5);

        doc.moveTo(50, 45).lineTo(562, 45).stroke();

        doc.font("Helvetica");
        doc.fontSize(10).text(
            `Usuario: ${user.profile.name} – DNI/RUC: ${
        user.profile.document
      } – ${moment()
        .utc(false)
        .subtract(5, "hours")
        .format("DD/MM/YYYY [-] hh:mm a")}`,
            50,
            50, { align: "left" }
        );

        let topStart = 100;
        textStart = topStart + 8;
        var bot = topStart + 25;
        doc
            .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
            .fillAndStroke("#008533", "#008533")
        doc
            .font("Helvetica-Bold")
            .fontSize(12).fillColor('#FFFFFF')
            .text("COSTO FINAL", 155, textStart, { width: 185, align: "center" });
        doc
            .font("Helvetica-Bold")
            .fontSize(12).fillColor('#FFFFFF')
            .text(`S/${formatMoneyFaik(quote.totalCostNumber)}`, 300, textStart, { width: 185, align: "center" });
        topStart += 40;
        textStart = topStart;
        bot += topStart + 55;
        doc
            .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
            .stroke("#e8eef3");
        topStart += 15;
        textStart = topStart
        doc
            .font("Helvetica-Bold")
            .fontSize(12).fillColor('#158A2F')
            .text("¡MUY IMPORTANTE!", 155, textStart, { width: 312, align: "center" });
        topStart += 15;
        textStart = topStart
        doc
            .font("Helvetica-Bold")
            .fontSize(10).fillColor('#78ad25')
            .text("Antes de construir recuerda que:", 155, textStart, { width: 312, align: "center" });
        topStart += 15;
        textStart = topStart
        doc
            .font("Helvetica-Bold")
            .fontSize(8).fillColor('#67757c')
            .list(["Realizar una buena mezcla y vaciado nos ayudará a evitar burbujas de aire en las losas, columnas y vigas, con esto evitaremos caer en costos adicionales en la compra de aditivos para solucionar cangrejeras.", "Es recomendable utilizar una vibradora eléctrica para garantizar el movimiento que eliminará las burbujas de aire en la mezcla.", "Los muros de contención o pircas deben estar bien asentados para evitar deslizamientos futuros. Una buena cimentación puede asegurar tu construcción y los pisos futuros que quieras construir. Las vigas y columnas siempre deben de estar unidas.", "Estudio de la calidad de suelo te puede y te sirve para saber la forma de segura de construir tu hogar."], 170, textStart, { width: 275 })
        topStart += 150;
        textStart = topStart + 10;
        bot = topStart + 25;
        let notes = ["Todos los costos son referenciales y no incluye IGV.",
            "Los precios fueron actualizados y modificados de acuerdo a la mano de obra y materiales en Lima Metropolitana y Callao, conforme a lo publicado, en la revista especializada para construcción COSTOS del año 2019 y su página web: ",
            "Es importante mencionar que no se contemplan en estos costos los precios de las instalaciones sanitarias y eléctricas, estas se definirán por punto instalado por el mismo usuario.",
            "Es importante contemplar sobre el costo final un 20% adicional para mantener un margen según el mercado."
        ]
        doc
            .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
            .fillAndStroke("#008533", "#008533")
        doc
            .font("Helvetica-Bold")
            .fontSize(8).fillColor('#FFFFFF')
            .text("NOTA IMPORTANTE", 155, textStart, { width: 185, align: "left" });
        for (let index = 0; index < notes.length; index++) {
            if (index == 0) {
                topStart += 25;
                bot = topStart + 25;
            } else if (index == 1) {
                topStart += 25;
                bot = topStart + 55;
            } else if (index == 2) {
                topStart += 55;
                bot = topStart + 45;
            } else if (index == 3) {
                topStart += 45;
                bot = topStart + 35;
            }
            textStart = topStart + 10.5;
            if (index == 1) {
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${notes[index]}`, 155, textStart, { width: 305, align: "left" });
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#78ad25')
                    .text(`Costos Perú`, 175, textStart + 28.5, { width: 50, link: "https://costosperu.com/PortalSuscriptores/Partidas", lineBreak: true, align: "left" });

            } else {
                doc
                    .font("Helvetica-Bold")
                    .fontSize(8).fillColor('#67757c')
                    .text(`${notes[index]}`, 155, textStart, { width: 305, align: "left" });
            }
            doc
                .polygon([150, topStart], [150, bot], [462, bot], [462, topStart])
                .stroke("#e8eef3");
        }
        return { doc, docPath, docName };
    } catch (error) {
        console.log(error);
    }
};

exports.formatPaginateValues = ({ page, limit = 10 }) => {
    const pageNum = Number(page)
    const limitNum = Number(limit)
    if (pageNum && limitNum) {
        const skip = pageNum ? (pageNum - 1) * limitNum : 0
        return { skip: skip, page: pageNum, limit: limitNum }
    }
    return { skip: 0, page: 1, limit: 10 }
};

exports.paginate = (page, limit, count) => {
    const pages = Math.ceil(count / limit);
    return { page, limit, pages: pages ? pages : 1, total: count }
};

exports.downloadFile = async function(url, originalName) {
    try {
        const originalPath = path.resolve(__dirname, "../uploads", originalName);
        const writer = fs.createWriteStream(originalPath);

        const response = await axios({
            url,
            method: "GET",
            responseType: "stream",
        });

        response.data.pipe(writer);

        new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
        const form = new FormData();
        form.append('files', fs.createReadStream(originalPath));
        return form;
    } catch (e) {

    }

};

exports.deleteFie = (originalName) => {
    const originalPath = path.resolve(__dirname, "../uploads", originalName);
    fs.unlink(originalPath, (err) => {
        if (err) throw err;
        console.log(`successfully deleted file ${originalName}`);
    });
};