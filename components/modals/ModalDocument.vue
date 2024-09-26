<template>
	<b-modal
		id="modal_sac"
		size="lg"
		centered
		class="modal fade"
		tabindex="-1"
		:hide-footer="hideFooterModal"
		:hide-header="true"
		aria-hidden="true">
		<div class="row">
			<div class="col-3">
				<Circles :circlesSelected="circlesSelected" />
			</div>
			<div class="col-9">
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
	import Circles from './Circles.vue';

	export default {
		components: {
			NewDocumentForm,
			SuccessMessage,
			MainModal,
			ErrorModal,
			RequestDocument,
			RequiredDocuments,
			ProgressBar,
			Circles,
		},
		data() {
			return {
				hideFooterModal: true,
				activeForm: true,
				indexComponent: 0,
				statusClient: 0,
				circlesSelected: 1,
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
						this.circlesSelected = 2;
						return 'NewDocumentForm';
					case 2:
						this.circlesSelected = 3;
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
