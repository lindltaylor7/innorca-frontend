<template>
    <div v-if="warningZone">
        Are you still with us?
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'AutoLogout',

    data: function() {
        return {
            events: ['click'],

            warningTimer: null,
            logoutTimer: null,
            warningZone: false,
        }
    },

    mounted() {
        this.events.forEach(function (event) {
            window.addEventListener(event, this.resetTimer);
        }, this);

        this.setTimers();
    },

    destroyed() {
        this.events.forEach(function (event) {
            window.removeEventListener(event, this.resetTimer);
        }, this);

        this.resetTimer();
    },

    methods: {
        setTimers: function () {
            this.warningTimer = setTimeout(this.warningMessage, 4 * 1000);
            this.logoutTimer = setTimeout(this.logoutUser, 10 * 1000);

            this.warningZone = false;
        },

        warningMessage: function () {
            this.warningZone = true;
            //alert('warning');
        },

        logoutUser: function () {
            //document.getElementById('logout-form').submit();
            Cookies.remove('session');
            localStorage.removeItem("budget_code");
            localStorage.removeItem("project_type");
            localStorage.removeItem("contract_num");
            localStorage.removeItem("budget_id");
            localStorage.removeItem("project_name");
            localStorage.removeItem("project_id");
            
            localStorage.removeItem("etapa");
            localStorage.removeItem("manzana");
            localStorage.removeItem("lote");

            localStorage.removeItem("budget_icon");

            window.location.reload(true);
        },

        resetTimer: function () {
            clearTimeout(this.warningTimer);
            clearTimeout(this.logoutTimer);

            this.setTimers();
        }
    }
}
</script>