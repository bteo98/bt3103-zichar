<template>
    <div>
        Menu
        <ul>
            <li v-for="(item, index) in itemsSelected" :key="index" id="shoppingBasket">
                {{item[0] + " x " + item[1]}}
            </li>
        </ul>
        <button type="button" v-on:click="findTotal(); sendOrder();">Add Order</button>
        <p v-show="showTotal">{{"Subtotal: $" + Subtotal}}</p>
        <p v-show="showTotal">{{"Grand Total: $" + GrandTotal}}</p>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {
    data() {
        return {
            Subtotal: 0,
            GrandTotal: 0,
            showTotal: false
        };
    },
    props: {
        itemsSelected: Array
    },
    methods: {
        findTotal: function() {
            var total = 0;

            for (let item of this.itemsSelected) {
                total += (item[2] * item[1]);
            }
            this.Subtotal = total;
            this.GrandTotal = Math.round(total * 1.07 * 100)/100;
            this.showTotal = true;
        },
        sendOrder: function() {
            let orders = {
                "Prawn omelette": 0,
                "Dry Beef Hor Fun": 0,
                "Sambal KangKung": 0,
                "Pork Fried Rice": 0,
                "Mapo Tofu": 0,
                "Cereal Prawn": 0
            };

            for (let item of this.itemsSelected) {
                orders[item[0]] = item[1];
            }
            
            database.collection("orders")
                .add(orders)
                .then(() => location.reload());
        }
    }
}
</script>

<style scoped>
button {
    width: 90px;
    height: 30px;
    color: white;
    background-color: #60b1f0;
    border-radius: 10px;
    border-width: 1px;
}
</style>