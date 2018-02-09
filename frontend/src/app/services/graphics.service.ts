import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class GraphicsService {

    constructor() { }

    public graphicDonut(id, estructura, titulo) {
        return new Chart(id, {
            type: 'doughnut',
            data: estructura,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    fontSize: 20,
                    display: true,
                    text: titulo
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    public graphicPie(id, estructura, titulo) {
        return new Chart(id, {
            type: 'pie',
            data: estructura,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    fontSize: 20,
                    display: true,
                    text: titulo
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    public graphicHorizontal(id, estructura, titulo) {
        return new Chart(id, {
            type: 'horizontalBar',
            data: estructura,
            options: {
                responsive: true,
                legend: { display: false },
                title: {
                    fontSize: 20,
                    display: true,
                    text: titulo
              }
            }
        });
    }

    public graphicBar(id, estructura, titulo) {
        return new Chart(id, {
            type: 'bar',
            data: estructura,
            options: {
                responsive: true,
                legend: { display: false },
                title: {
                    fontSize: 20,
                    display: true,
                    text: titulo
              }
            }
        });
    }

}
