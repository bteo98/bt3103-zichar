// Import the components you want to define routes for.
import Home from "./PageContent.vue";
import Modify from "./Modify.vue";
import Orders from "./Orders.vue";
import Dashboard from "./Dashboard.vue";

export default [
    { path: "/", name: "home", component: Home },
    { path: "/modify", name: "modify", component: Modify, props: true},
    { path: "/orders", name: "orders", component: Orders },
    { path: "/dashboard", name: "dashboard", component: Dashboard }
];