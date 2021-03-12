import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "west",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: [],
                label: "national",
                borderColor: "#8e5ea2",
                fill: false
              }, { 
                data: [],
                label: "east",
                borderColor: "#3cba9f",
                fill: false
              }, { 
                data: [],
                label: "central",
                borderColor: "#e8c3b9",
                fill: false
              }, { 
                data: [],
                label: "south",
                borderColor: "#c45850",
                fill: false
              }, { 
                data: [],
                label: "north",
                borderColor: "#b07c0c",
                fill: false
              }
            ]
        },
        options: {
            legend: { 
              display: true,
              position: "top" 
            },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data
                .items
                .forEach(item => {
                    this.datacollection
                        .datasets
                        .forEach(dataset => {
                          dataset.data
                              .push(item.readings
                                  .psi_twenty_four_hourly[dataset.label]);
                        });
                    this.datacollection
                        .labels
                        .push(item.timestamp);
                });
            console.log(this.datacollection.datasets);
            this.renderChart(this.datacollection, this.options);
        });
    }
  },
  created () {
    this.fetchItems()
  }
}