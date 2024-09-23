<template>
	<div id="preguntas_frecuentes">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box">
						<h3 class="title">Preguntas Frecuentes</h3>

						<div class="row mt-4">
							<div class="col-12">
								<div v-show="loadingQuestions" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingQuestions" class="card sm-card">
									<h3 class="subtitle">Buscador</h3>
									<div class="filters">
										<div class="filter-field">
											<div>
												<input
													v-model="filter.form.title"
													id="buscar_text"
													class="input-fix"
													v-bind:class="{
														error: filter.errors.title,
													}"
													type="text"
													required />
												<label for="buscar_text" placeholder="Buscar"></label>
												<span v-if="filter.errors.title" class="error">
													{{ filter.errors.title }}
												</span>
											</div>
										</div>
										<div class="filter-field">
											<div>
												<select
													v-model="filter.form.category"
													
													v-bind:class="{ error: filter.errors.categories }"
													required>
													<!-- <option value="-" selected>Todo</option> -->
													<option
														v-for="questionCategory in questionCategoriesOptions"
														:key="questionCategory._id"
														:value="questionCategory"
														:selected="questionCategory.name == 'Todo'"
														>
														<span v-if="!questionCategory.subcategories">&nbsp;&nbsp;&nbsp;</span>
														{{ questionCategory.name }}
													</option>
												</select>
												<label for="category" placeholder="Categorías"></label>
												<span v-if="filter.errors.categories" class="error">
													{{ filter.errors.categories }}
												</span>
											</div>
										</div>
										<div class="filter-button-space">
											<button class="btn btn-green" @click="toFilter">Buscar</button>
										</div>
									</div>

									<h3 class="subtitle" v-show="questions.length > 0">Preguntas frecuentes</h3>
									<Accordion
										v-for="question in favoriteQuestions"
										:title="question.question"
										:key="question._id + 'favoriteQuestions'">
										<div v-html="question.answer"></div>
										<div class="question-answer-rating">
											<span class="question-answer-rating__title"
												>¿Te ha resultado útil esta información?</span
											>
											<div class="question-answer-rating__actions">
												<ButtonIconText
													@click="toRate(question, 1)"
													:iconSrc="require('~/assets/img/icons/icon_like.svg')"
													:active="question.rating > 0"
													text="SÍ" />
												<ButtonIconText
													@click="toRate(question, -1)"
													:active="question.rating < 0"
													text="NO"
													:iconSrc="require('~/assets/img/icons/icon_dislike.svg')" />
											</div>
											<p class="question-answer-rating__categories">
												categorias:
												<span
													v-for="(category, index) in question.categories"
													:key="category._id">
													<span class="categories-tag">
														{{ category.name }}
													</span>
													<span class="categories-tag__separator">
														{{ index == question.categories.length - 1 ? '' : ', ' }}
													</span>
												</span>
											</p>
										</div>
									</Accordion>

									<h3 class="subtitle" style="margin-top: 48px">Otras preguntas</h3>
									<Accordion
										v-for="question in moreQuestions"
										:title="question.question"
										:key="question._id + 'moreQuestion'">
										<div v-html="question.answer"></div>
										<div class="question-answer-rating">
											<span class="question-answer-rating__title"
												>¿Te ha resultado útil esta información?</span
											>
											<div class="question-answer-rating__actions">
												<ButtonIconText
													@click="toRate(question, 1)"
													:iconSrc="require('~/assets/img/icons/icon_like.svg')"
													:active="question.rating > 0"
													text="SÍ" />
												<ButtonIconText
													@click="toRate(question, -1)"
													:active="question.rating < 0"
													text="NO"
													:iconSrc="require('~/assets/img/icons/icon_dislike.svg')" />
											</div>
											<p class="question-answer-rating__categories">
												categorias:
												<span
													v-for="(category, index) in question.categories"
													:key="category._id">
													<span class="categories-tag">
														{{ category.name }}
													</span>
													<span class="categories-tag__separator">
														{{ index == question.categories.length - 1 ? '' : ', ' }}
													</span>
												</span>
											</p>
										</div>
									</Accordion>

									<div v-if="nextMoreQuestions" class="text-center mt-3">
										<div @click="fetchMoreQuestions()" style="cursor: pointer">
											<span class="see-more" :class="{ loading: loadingFetchMoreQuestions }"
												>VER MÁS</span
											>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';
import Sidebar from '@/components/common/Sidebar';
import Accordion from '@/components/common/Accordion';
import ButtonIconText from '../../components/common/ButtonIconText.vue';

export default {
	middleware: 'auth',
	transition: 'slide-left',
	data() {
		return {
			filter: {
				exceptions: {
					categories: [],
				},
				options: {
					categories: [],
				},
				form: {
					title: '',
					category: null,
				},
				errors: { title: null, category: null },
			},
			positionFixed: true,

			loadingQuestions: true,
			loadingTickets: true,
			loadingFetchMoreTickets: false,
			loadingFetchMoreQuestions: false,
			nextMoreQuestions: true,
			nextMoreTickets: true,
			page: 1,
		};
	},
	components: {
		Menu,
		Sidebar,
		Accordion,
		ButtonIconText,
	},
	watch: {
		nextQuestions(newObj) {
			if (typeof newObj !== 'undefined') {
				//console.log('more questions', newObj);

				if (newObj.page == newObj.pages) {
					this.nextMoreQuestions = false;
				} else {
					this.nextMoreQuestions = true;
				}
			} else {
				this.nextMoreTickets = true;
			}
		},
	},
	computed: {
		...mapGetters({
			user: 'account/getUser',
			budgets: 'atencioncliente/getBudgets',
			questions: 'faq/getQuestions',
			moreQuestions: 'faq/getMoreQuestions',
			nextQuestions: 'faq/getNextQuestions',
			questionCategories: 'faq/getQuestionCategories',
		}),
		favoriteQuestions() {
			const favoriteQuestions = [];
			const favoriteQuestionTop = 5;
			for (let i = 0; i < favoriteQuestionTop; i++) {
				if (i < this.questions.length) {
					favoriteQuestions.push(this.questions[i]);
				}
			}
			return favoriteQuestions;
		},
		remainingQuestions() {
			const remainingQuestions = [];
			const favoriteQuestionTop = 5;
			for (let i = 0; i < this.questions.length; i++) {
				if (i >= favoriteQuestionTop) {
					remainingQuestions.push(this.questions[i]);
				}
			}
			return remainingQuestions;
		},
		questionCategoriesOptions(){
			let categoriesOptions = []
			this.questionCategories.forEach((category)=>{
				if(category.name =="Todo")
					this.filter.form.category = category/* ._id */;
				categoriesOptions.push(category)
				category.subcategories?.forEach(subcategories=>{
					categoriesOptions.push(subcategories)
				})
			})
			return categoriesOptions
		}
	},
	async created() {
		this.fetchQuestionCategories();
	},
	async mounted() {
		const session = JSON.parse(Cookies.get('session'));
		const token = session.token;

		const obj = {
			token: token,
			payload: {
				token,
			},
		};

		this.$store.dispatch('faq/fetchQuestions', obj).then(() => {
			this.loadingQuestions = false;
		});
	},
	methods: {
		fetchMoreQuestions() {
			this.loadingFetchMoreQuestions = true;

			this.page++;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					page: this.page,
				},
			};

			this.$store.dispatch('faq/fetchMoreQuestions', obj).then((response) => {
				this.loadingFetchMoreQuestions = false;
			});
		},
		fetchQuestionCategories() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token: token,
				payload: {
					page: this.page,
				},
			};
			this.$store.dispatch('faq/fetchQuestionCategories', obj).then((data) => {
				data.questionCategories.forEach((item) => {
					if (item.name == 'Todo') {
						this.filter.exceptions.categories.push(item._id);
					}
				});
				//this.loadingFetchMoreQuestions = false;
			});
		},
		toFilter() {
			let filterForm = {};
			console.log("filterform: ", this.filter.form);
			if(this.filter.form.category?.questionCategory){
				const subcategory =  this.filter.form.category;
				filterForm.subcategory = subcategory._id;
			}else{
				filterForm.category = this.filter.form.category._id;
			}
			if(this.filter.form.title){
				filterForm.title = this.filter.form.title
			}
			if (this.filter.exceptions.categories.includes(filterForm.category)) {
				filterForm.category = null;
			}
			console.log("filterform sale: ", filterForm);

			this.loadingQuestions = true;
			/* Object.keys(this.filter.form).forEach(key => {
        const value = this.filter.form[key]
        if(value){
          filterForm[key] = value
        }
      }) */
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token: token,
				payload: {
					token: token,
					page: this.page,
				},
				params: filterForm,
			};
			console.log(obj);
			this.page = 1;
			this.$store.commit('faq/cleanMoreQuestions');
			this.$store.dispatch('faq/fetchQuestions', obj).then(() => {
				this.loadingQuestions = false;
			});
		},
		toRate(question, rateNumber) {
			if (!question || !rateNumber) {
				return;
			}

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token,
				questionId: question._id,
				payload: {
					rating: question.rating == rateNumber ? 0 : rateNumber,
				},
			};
			this.$store.dispatch('faq/rateQuestionAnswer', obj).then((data) => {
				if (data.success) {
					const payload = {
						question: data.frequentQuestion,
					};
					this.$store.commit('faq/modifyQuestionRate', payload);
				}
			});
		},
	},
};
</script>
