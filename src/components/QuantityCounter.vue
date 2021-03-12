<template>
    <div id="app">
        <button v-on:click="decrement">-</button>
        <h3>{{ counter }}</h3>
        <button v-on:click="increment">+</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0,
        };
    },
    props: {
        item: Object,
    },
    methods: {
        increment: function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter++;
                this.$emit("counter", this.item, this.counter);
            }
        },
        decrement: function() {
            if (this.counter > 0) {
                this.counter--;
                this.$emit("counter", this.item, this.counter);
            }
        },
    },
};
</script>

<style scoped>
h3 {
    display: inline;
    padding: 0 5%;
    font-size: 30px;
}

button {
    font-size: 30px;
    width: 40px;
    height: 40px;
    color: white;
    background-color: #60b1f0;
    border-radius: 10px;
    border-width: 1px;
}
</style>
