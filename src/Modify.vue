<template>
    <div>
        <ul>
            <li v-for="(item, index) in datapacket" :key="index">
                <p>{{ item[0] + ": " + item[1] }}</p>
                <input
                    type="number"
                    v-bind:id="index"
                    placeholder="0"
                    min="0"
                />
            </li>
        </ul>
        <button type="button" v-on:click="updateOrder">Update Order</button>
    </div>
</template>

<script>
import database from "./firebase.js";

export default {
    data() {
        return {
            datapacket: [],
        };
    },
    props: {
        doc_id: String,
    },
    methods: {
        fetchItems: function() {
            database
                .collection("orders")
                .doc(this.doc_id)
                .get()
                .then((items) => {
                    for (let [name, count] of Object.entries(items.data())) {
                        this.datapacket.push([name, count]);
                    }
                });
        },
        updateOrder: function() {
            let orders = {};
            let index = 0;
            let count = 0;

            this.datapacket.forEach((order) => {
                count = document.getElementById(index++).value;
                orders[order[0]] = count;
            });

            database
                .collection("orders")
                .doc(this.doc_id)
                .update(orders)
                .then(() =>
                    this.$router.push({
                        name: "orders",
                    })
                );
        },
    },
    created() {
        this.fetchItems();
        console.log(this.datapacket);
    },
};
</script>

<style scoped>
button {
    height: 30px;
    color: white;
    background-color: #60b1f0;
    border-radius: 10px;
    border-width: 1px;
}
</style>
