<template>
    <div>
        <h6 class="mt-5">Acta de Matrimonio</h6>
        <p>
            Copia de acta de matrimonio debidamente certificado por RENIEC. No mayor a 3 meses
            <a href="">Más información</a>
        </p>
        <div class="row">
            <div class="col upload-file">
                <img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
                <p>Sube tu acta de matrimonio</p>
            </div>
        </div>
        <h6 class="mt-5">Régimen patrimonial de separación de patrimonio (Opcional)</h6>
        <p>
            Copia literal de la partida donde se encuentra inscrita con una vigencia no mayor a 3 meses emitido por
            SUNARP
            <a href="">Más información</a>
        </p>
        <div class="row">
            <div class="col upload-file">
                <img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
                <p>Sube tu régimen patrimonial de seperación de patrimonio</p>
            </div>
        </div>
        <h6 class="mt-5">Documento de identificación de cónyuge</h6>
        <div class="row">
            <div class="col-5 upload-file" @click="openFileWindow(1)">
                <img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" />
                <p>Subir imagen delantera de DNI</p>
                <input type="file" class="form-control" ref="dniFront" accept="image/png, image/gif, image/jpeg" />
            </div>
            <div class="col-5 upload-file mx-2" @click="openFileWindow(2)">
                <img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2 mb-3" alt="" />
                <p>Subir imagen reversa de DNI</p>
                <input type="file" class="form-control" ref="dniBack" accept="image/png, image/gif, image/jpeg" />
            </div>
        </div>
    </div>

</template>
<script>
export default {

}
</script>
<style scoped>
.upload-file {
    border: 1px dashed #bebebe;
    border-radius: 20px;
    color: #bebebe;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.heir-dni {
    border: 1px solid green;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 10px;
}

.heir-dni img {
    width: 100px;
}

input[type='radio'] {
    width: 20px;
    height: 20px;
    margin: 5px 3px 0px 0px;
    accent-color: green;
}
</style>