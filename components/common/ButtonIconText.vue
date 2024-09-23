<template>
	<button id="buttonIconText" class="button-icon-text" @click="$emit('click')" :class="{ active }">
		<div class="button-icon-text__icon"><img lass="button-icon-text__icon-src" :src="iconSrc" alt="" /></div>
		<span lass="button-icon-text__text">{{ text }}</span>
	</button>
</template>
<script>
export default {
	props: {
		iconSrc: {
			required: true,
			default: require('~/assets/img/icons/icon_like.svg'),
		},
		active: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			default: 'text',
		},
	},
	data() {
		return {};
	},
};
</script>
