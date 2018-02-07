import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class GraphicsService {

    constructor() { }

    public graphicDonut(alianza) {
        return new Chart(alianza, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        5, 10, 20
                    ],
                    backgroundColor: [
                        '#ffffff', '#000000', '#f56db3'
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'PRI',
                    'PAN',
                    'MORENA'
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Dona'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

}
