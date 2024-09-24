<template>
	<b-modal
		id="modal_sac"
		size="xl"
		centered
		class="modal fade"
		tabindex="-1"
		:hide-footer="hideFooterModal"
		:hide-header="true"
		aria-hidden="true">
		<div class="row">
			<div class="col-4">
				{{ statusClient }}
				<div class="circles-advance w-100">
					<div class="circle">1</div>
					<div class="circle">2</div>
					<div class="circle">3</div>
				</div>
			</div>
			<div class="col-8">
				<component
					:is="getComponentMain"
					@nextModal="nextModal"
					@backModal="backModal"
					@setStatusClient="setStatusClient"
					:statusClient="statusClient"></component>
			</div>
		</div>
	</b-modal>
</template>
<script>
	import NewDocumentForm from '../../components/modals/NewDocumentForm.vue';
	import SuccessMessage from '../../components/modals/SuccessMessage.vue';
	import MainModal from '../../components/modals/MainModal.vue';
	import ErrorModal from '../../components/modals/ErrorModal.vue';
	import RequestDocument from '../../components/modals/RequestDocument.vue';
	import RequiredDocuments from '../../components/modals/RequireDocuments.vue';
	import ProgressBar from '../../components/modals/ProgressBar.vue';

	export default {
		components: {
			NewDocumentForm,
			SuccessMessage,
			MainModal,
			ErrorModal,
			RequestDocument,
			RequiredDocuments,
			ProgressBar,
		},
		data() {
			return {
				hideFooterModal: true,
				activeForm: true,
				indexComponent: 0,
				statusClient: 0,
			};
		},
		methods: {
			handleNextButton() {
				this.activeForm = false;
			},
			handleVerificationModal() {},
			nextModal(value) {
				console.log('nani', value);
				this.indexComponent = value;
			},
			backModal(value) {
				this.indexComponent = value;
			},
			setStatusClient(value) {
				this.statusClient = value;
			},
		},
		computed: {
			getComponentMain(value) {
				switch (this.indexComponent) {
					case 0:
						return 'MainModal';
					case 1:
						return 'NewDocumentForm';
					case 2:
						return 'SuccessMessage';
					case 3:
						return 'ErrorModal';
					case 4:
						return 'RequestDocument';
					case 5:
						return 'RequiredDocuments';
					case 6:
						return 'ProgressBar';
					default:
						return 'MainModal';
				}
			},
		},
	};
</script>
<style scoped>
	.circle {
		background-color: green !important;
		width: 50px;
		height: 50px;
		margin: 20px 0px 20px 0px;
		color: #fff;
	}

	.circles-advance {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 20%;
	}
</style>
