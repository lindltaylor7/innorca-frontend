<template>
    <div>
        <h6 class="mt-5">Inscripción de Divorcio</h6>
        <p>
            Copia literal de la partida donde se encuentra la inscripción de divorcio e registros públicos
            <a href="">Más información</a>
        </p>
        <div class="row">
            <div class="col upload-file">
                <img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
                <p>Sube tu régimen patrimonial de seperación de patrimonio</p>
            </div>
        </div>
        <h6 class="mt-5">Tipo de divorcio</h6>
        <div class="row">
            <div class="col-6">
                <ButtonWizard :title="'Inscripción de divorcio en registros públicos '" :value="1"></ButtonWizard>
            </div>
            <div class="col-6">
                <ButtonWizard :title="'Divorcio en vía judicial'" :value="2"></ButtonWizard>
            </div>
        </div>
        <p>
            Copia literal de la partida donde se encuentra la inscripción de divorcio e registros públicos
            <a href="">Más información</a>
        </p>
        <div class="row">
            <div class="col upload-file">
                <img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
                <p>Sube tu régimen patrimonial de seperación de patrimonio</p>
            </div>
        </div>
    </div>

</template>
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