import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Dish",
                backgroundColor: ["#3e95cd", "#8e5ea2","#34eb9e","#e8c3b9","#6b6e75", "#e32bca"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  stepSize: 1,
                  beginAtZero: true
                }
              }]
            }
        }
    }
  },
  methods: {
    fetchItems: function() {
        let orders = {};
        database.collection("orders").get().then(querySnapShot => {
            querySnapShot.forEach(doc => {

                for (let [name, count] of Object.entries(doc.data())) {
                    if (name in orders) {
                        orders[name] += count;
                    } else {
                        orders[name] = count;
                    }
                }
            })
 
            for (let [name, count] of Object.entries(orders)) {
              this.datacollection
                .labels
                .push(name);

              this.datacollection
              .datasets[0]
              .data
              .push(count);
            }
            this.renderChart(this.datacollection, this.options);
        })
    }
  },
  created() {
    this.fetchItems();
  }
}