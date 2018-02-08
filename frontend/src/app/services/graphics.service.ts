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

}
