<template lang="pug">
a.w-full.h-full.pointer-events-auto(:href="iconLinkPath" target="_blank" v-if="iconLinkPath")
	svg(xmlns="http://www.w3.org/2000/svg" 
	:width="sizepx" 
	:height="sizepx" 
	:viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`")
		path.iconBase(:d="svgPath")
div(v-else="iconLinkPath")
	svg(xmlns="http://www.w3.org/2000/svg" 
	:width="sizepx" 
	:height="sizepx" 
	:viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`")
		path.iconBase(:d="svgPath")
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps({
	sizepx: {
		type: Number,
		required: false,
		default: 32,
	},
	svgPath: {
		type: String,
		required: true,
	},
	iconLinkPath: {
		type: String,
		required: false,
	},
	viewBoxSize: {
		type: Number,
		required: false,
		default: 16,
	},
});
</script>

<style scoped lang="scss">
.iconBase {
	// @apply fill-gray-200;
	@apply fill-GWHITE;
	transition: fill 0.05s ease-in-out;

	&:hover {
		@apply fill-GACTIVE;
	}
}
</style>
