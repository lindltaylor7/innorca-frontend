<template>
    <div class="option mx-2">
        <input class="float-right" type="radio" name="newDocument" :id="value" ref="value" @click="handleOptionSelect">
        <div class="content-button d-flex flex-column align-items-center mt-4" @click="handleOptionSelect">
            <img :src="img" alt="Solicitud" />
            <span>{{ title }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        img: String,
        value: Number
    },
    methods: {
        handleOptionSelect() {
            this.$refs.value.click()
            this.$emit('handleOptionSelected', this.value)
        }

    }

}
</script>
<style scoped>
img {
    width: 100%;
}

.option {
    height: 10em;
    width: 10em;
    border: 1px solid green;
    border-radius: 10px;
}

input[type="radio"] {
    width: 20px;
    height: 20px;
    margin: 5px 3px 0px 0px;
    accent-color: green;
}

span {
    font-size: .8rem;
}

.content-button {
    margin: 0px 0px 0px 20px;
}
</style>