<template>
	<div class="circles-advance w-100">
		<!-- <div class="bar"></div>
		<div class="bar-green"></div>
		<div class="circles">
			
		</div> -->
		<div class="bar"></div>
		<div class="circle active"></div>
		<div class="circle"></div>
		<div class="circle bg-ligth"></div>
		<div class="circle bg-ligth"></div>
	</div>
</template>
<script>
	export default {
		methods: {
			selectCircle(e) {
				let circle = e.target;
				let circles = circle.parentNode.children;
				for (let i = 0; i < circles.length; i++) {
					circles[i].classList.remove('active');
				}
				circle.classList.add('active');
			},
		},
		props: {
			circlesSelected: Number,
		},
		watch: {
			circlesSelected() {
				let circles = document.getElementsByClassName('circle');

				for (let i = 0; i < this.circlesSelected; i++) {
					circles[i].classList.add('active');
				}
			},
		},
	};
</script>
<style scoped>
	.circle {
		background-color: gray !important;
		width: 30px;
		height: 30px;
		margin: 0px 0px 60px 0px;
		color: #fff;
		font-size: 30px;
		z-index: 1;
	}
	.active {
		background-color: #158a2f !important;
	}

	.bg-ligth {
		background-color: #fff !important;
		outline: 1px solid gray;
	}

	.circles {
		position: absolute;
		z-index: 2;
		top: 40px;
	}

	.circles-advance {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		margin-top: 5%;
	}

	.bar-green {
		width: 5px;
		height: 30px;
		background-color: #158a2f;
		z-index: 1;
		position: absolute;
		top: 95px;
	}

	.bar {
		background-color: gray;
		width: 520px;
		height: 3px;
		z-index: 0;
		position: absolute;
		top: 96px;
	}

	.second .third {
		top: 10;
	}
</style>
