<template>
	
    <div class="accordion">
        <div class="tab__header">
            <a href="#" class="tab__link" @click.prevent="active = !active">
                <strong>{{title}}</strong>
                <span class="down-Arrow" v-show="!active">
                    <font-awesome-icon :icon="['fas', 'chevron-down']"/>
                </span>
                <span class="up-Arrow" v-show="active">
                    <font-awesome-icon :icon="['fas', 'chevron-up']"/>
                </span>
            </a>
        </div>
        <div class="tab__content" v-show="active"><slot /></div>            
    </div>
    
</template>

<script>

export default {
    data() {
        return {
           active: false,  
        }
    },
    props: [
        'title'
    ],
    components: {
        
    },
    computed:{

    },
    async mounted() {


    },
    methods: {
   

    }
}
</script>
