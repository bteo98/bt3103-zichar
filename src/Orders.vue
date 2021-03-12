<template>
    <div>
        <ul>
            <li>
                <router-link to="/" exact>Home</router-link>
            </li>
            <li>
                <router-link to="/orders" exact>Orders</router-link>
            </li>
            <li>
                <router-link to="/dashboard" exact>Dashboard</router-link>
            </li>
        </ul>
        <ul>
            <li v-for="order in orders" :key="order.id">
                <p v-for="item in order[1]" :key="item.id">
                    {{ item[0] + ": " + item[1] }}
                </p>
                <button
                    type="button"
                    v-bind:id="order[0]"
                    v-on:click="deleteItem($event)"
                >
                    Delete
                </button>
                <button type="button" v-bind:id="order[0]" v-on:click="route">
                    Modify
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import database from "./firebase.js";

export default {
    data() {
        return {
            orders: [],
        };
    },
    methods: {
        fetchItems: function() {
            database
                .collection("orders")
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        let order = [];

                        for (let [name, count] of Object.entries(doc.data())) {
                            order.push([name, count]);
                        }
                        this.orders.push([doc.id, order]);
                    });
                });
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database
                .collection("orders")
                .doc(doc_id)
                .delete()
                .then(() => location.reload());
        },
        route: function(event) {
            let id = event.target.getAttribute("id");
            this.$router.push({
                name: "modify",
                params: { doc_id: id },
            });
        },
    },
    created() {
        this.fetchItems();
    },
};
</script>

<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}
button {
    width: 65px;
    height: 30px;
    color: white;
    background-color: #60b1f0;
    border-radius: 10px;
    border-width: 1px;
}
</style>
