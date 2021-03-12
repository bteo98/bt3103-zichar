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
        <h1>BARCHART</h1>
        <BarChart></BarChart>
        <h1>LineChart</h1>
        <LineChart></LineChart>
    </div>
</template>

<script>
import BarChart from "./charts/BarChart.vue";
import LineChart from "./charts/LineChart.vue";

export default {
    components: {
        BarChart,
        LineChart
    },
};
</script>


<style scoped>
h1 {
  text-align: center;
  height: 10%;
  margin-top: 0;
  padding: 2%;
  background-color: #60b1f0;
  color: #ffffff;
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
</style>