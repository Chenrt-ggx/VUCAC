<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
import Settings from "./settings.json";

export default {
    name: "App",
    provide() {
        return {
            reload: this.reload,
        };
    },
    data() {
        return {
            isRouterAlive: true,
        };
    },
    created() {
        console.log(
            "\n---------------------------------------------------------------\n\n"
        );
        var text = Settings["consoleText"];
        for (var i = 0; i < text.length; i++) {
            if (text[i] === "") {
                console.log("\n");
            } else {
                console.log(text[i]);
            }
        }
        console.log(
            "\n---------------------------------------------------------------\n\n"
        );
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },
    },
};
</script>
