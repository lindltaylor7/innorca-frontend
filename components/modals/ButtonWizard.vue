<template>
	<div class="option mx-2">
		<input class="float-right" type="radio" name="newDocument" :value="value" ref="value" @click="getValueRadio" />
		<div class="content-button d-flex flex-column align-items-center mt-4" @click="handleOptionSelect">
			<img :src="img" alt="Solicitud" v-if="img != ''" />
			<span>{{ title }}</span>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			title: String,
			img: String,
			value: Number,
			result: Number,
		},
		methods: {
			handleOptionSelect() {
				console.log('nani');
				this.$refs.value.click();
			},
			getValueRadio(e) {
				console.log('nani2');
				console.log(e.target);
				this.$emit('handleOptionSelected', e.target.value);
			},
		},
	};
</script>
<style scoped>
	img {
		width: 100%;
	}

	.option {
		height: 10em;
		width: 100%;
		border: 1px solid green;
		border-radius: 10px;
	}

	input[type='radio'] {
		width: 20px;
		height: 20px;
		margin: 5px 3px 0px 0px;
		accent-color: green;
	}

	span {
		font-size: 9px;
	}

	.content-button {
		margin: 0px 0px 0px 20px;
	}
</style>
