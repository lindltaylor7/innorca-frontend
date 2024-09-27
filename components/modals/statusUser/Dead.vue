<template>
    <div>
        <h6 class="mt-5">Sucesión intestada o testamento</h6>
        <p>
            Copia literal de sucesión intestada o testamento inscrito en registros públicos (SUNARP).
            <a href="">Más información</a>
        </p>
        <div class="row">
            <div class="col upload-file">
                <img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
                <p>Adjunta el archivo</p>
            </div>
        </div>
        <h6 class="mt-5">Documento de identidad de los apoderados</h6>
        <select name="nameProject" id="nameProject" class="w-50">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <label for="categoryAttention" placeholder="Cantidad de Herederos"></label>
        <template>
            <div class="heir-dni w-100">
                <p class="mb-0 important">Heredero</p>
                <img src="~/assets/img/modals/dnianverso.png" />
                <a href="">DNI imagen delantera</a>
                <img src="~/assets/img/modals/dnireverso.png" />
                <a href="">DNI imagen reversa</a>
                <input type="radio" name="" id="" />
            </div>
        </template>
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