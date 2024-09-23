<template>
	<div id="news">
		<Menu :positionFixed="positionFixed" :logged="true" />
        <div class="page" v-bind:class="{ fixed: positionFixed }">

            <div class="container">

                <Sidebar />

                <!-- Page Content -->
                <div class="h-100 page-content">

                    <div class="box">
                        
                        <div class="card post-detail" v-if="post.post">

                            <h3>{{ post.post.title }}</h3>

                            <img v-if="post.post" class="image" :src="post.post.image" alt="">

                            <span class="time mt-4">{{ $moment(post.post.updatedAt).format('DD [de] MMMM [de] YYYY') }}</span>

                            <h4 class="my-3">{{ post.post.subTitle }}</h4>

                            <div v-html="post.post.content"></div>
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
            loading: false,
            positionFixed: true,
        }
    },
    components: {
        Menu,
        Sidebar,
    },
    watch: {

    },
    computed:{
        ...mapGetters({
            post: 'news/getPost',
        }),
    },
    async mounted() {
        this.loading = true;

        const payload = {
          id: this.$route.params.id
        }
        
        await this.$store.dispatch('news/fetchPost', payload);

        this.loading = false;
        
    },
    methods: {
        capitalizeWord(str) {
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            return str2;
        }
    }
}
</script>