<template>
	<b-modal id="modal_sac" centered class="modal fade" tabindex="-1" :hide-footer="hideFooterModal" aria-hidden="true">
		<component :is="getComponentMain" @nextModal="nextModal"></component>
		<!-- <NewDocumentForm @handleVerificationModal="handleVerificationModal" />
		<SuccessMessage /> -->
	</b-modal>
</template>
<script>
	import NewDocumentForm from '../../components/modals/NewDocumentForm.vue';
	import SuccessMessage from '../../components/modals/SuccessMessage.vue';
	import MainModal from '../../components/modals/MainModal.vue';
	import ErrorModal from '../../components/modals/ErrorModal.vue';

	export default {
		components: { NewDocumentForm, SuccessMessage, MainModal, ErrorModal },
		data() {
			return {
				hideFooterModal: true,
				activeForm: true,
				indexComponent: 0,
			};
		},
		methods: {
			handleNextButton() {
				this.activeForm = false;
			},
			handleVerificationModal() {},
			nextModal(value) {
				this.indexComponent = value;
			},
		},
		computed: {
			getComponentMain(value) {
				if (this.indexComponent == 0) {
					return 'MainModal';
				} else if (this.indexComponent == 1) {
					return 'NewDocumentForm';
				} else if (this.indexComponent == 2) {
					return 'SuccessMessage';
				} else if (this.indexComponent == 3) {
					return 'ErrorModal';
				}
			},
		},
	};
</script>
