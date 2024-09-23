<template>
	<div id="news">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="">
						<h3 class="title">Noticias</h3>

						<div class="news mt-2" v-if="news">
							<div class="news__item" v-for="post in news" :key="post.id">
								<div class="post">
									<img :src="post.image" alt="" />

									<div class="body">
										<h4>{{ post.title }}</h4>
										<span class="time">{{ $moment(post.updatedAt).format('DD/MM/YYYY') }}</span>

										<p v-html="post.content.split(' ').slice(0, 30).join(' ') + '...'"></p>

										<nuxt-link :to="'/noticias/post/' + post._id" class="see-more"
											>Ver más</nuxt-link
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
</template>

<script>
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';
import Sidebar from '@/components/common/Sidebar';

export default {
	middleware: 'auth',
	transition: "slide-left",
	data() {
		return {
			positionFixed: true,
		}
	},
	components: {
		Menu,
		Sidebar
	},
	watch: {

	},
	computed: {
		...mapGetters({
			news: 'news/getNews',
		}),
	},
	async mounted() {
		this.$store.dispatch('news/fetchNews')
			.then(() => {
				//this.loadingPaymentProgress = false;
			});
	},
	methods: {

		fetchMoreHistoryPayments() {

			this.loadingFetchMorePaymentHistory = true;

			this.page++;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;



			if (this.status) {
				const obj2 = {
					token: token,
					payload: {
						budgetCode: localStorage.getItem("budget_code"),
						page: this.page,
						status: this.status
					}
				}

				this.$store.dispatch('property/fetchMorePaymentStatus', obj2)
					.then((response) => {
						this.loadingFetchMorePaymentHistory = false;
					}
					)
			} else {
				const obj2 = {
					token: token,
					payload: {
						budgetCode: localStorage.getItem("budget_code"),
						page: this.page
					}
				}

				this.$store.dispatch('property/fetchMorePaymentHistory', obj2)
					.then((response) => {
						this.loadingFetchMorePaymentHistory = false;
					}
					)
			}



		},
	}
}
</script>
