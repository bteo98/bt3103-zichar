<template>
    <div>
        <ul id="navList">
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
        <ul id="itemsList">
            <li v-for="item in items" :key="item.id">
                <p id="itemName">{{ item.name }}</p>
                <img v-bind:src="item.imageURL" v-bind:alt="item.name" />
                <p id="price">{{ "$" + item.price }}</p>
                <QuantityCounter
                    v-bind:item="item"
                    v-on:counter="onCounter"
                ></QuantityCounter>
            </li>
        </ul>
        <Basket
            v-bind:itemsSelected="itemsSelected"
            id="shoppingBasket"
        ></Basket>
    </div>
</template>

<script>
import QuantityCounter from "./components/QuantityCounter";
import database from "./firebase.js";
import Basket from "./components/Basket.vue";

export default {
    data() {
        return {
            itemsSelected: [],
            items: [],
        };
    },
    props: {
        itemsList: Array,
    },
    components: {
        QuantityCounter,
        Basket,
    },
    methods: {
        onCounter: function(item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    var contains = false;
                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    if (item_name === item.name && count > 0) {
                        this.itemsSelected.splice(i, 1, [
                            item.name,
                            count,
                            item.price,
                        ]);
                        contains = true;
                        break;
                    } else if (item_name === item.name && count == 0) {
                        this.itemsSelected.splice(i, 1);
                        contains = true;
                        break;
                    }
                }
                if (!contains) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
        fetchItems: function() {
            database
                .collection("menu")
                .get()
                .then((snapshot) => {
                    let item = {};

                    snapshot.forEach((doc) => {
                        item = doc.data();
                        item.id = doc.id;
                        this.items.push(item);
                    });
                });
        },
    },
    created() {
        this.fetchItems();
    },
};
</script>

<style scoped>
#navList {
    width: 100%;
    max-width: 70%;
}
#itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
}
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
img {
    width: 135px;
    height: 135px;
}

#price {
    font-size: 30px;
}

#itemName {
    font-size: 30px;
}

#shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
}
</style>
