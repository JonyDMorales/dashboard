import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { Chart } from 'chart.js';
import { ConsultaService } from '../../services/consulta.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    eventos = [];
    constructor( public _graphicsService: GraphicsService,
                 public _consultaService: ConsultaService ) { }

    ngOnInit() {
        this._consultaService.getEventPRI().subscribe(res => {
            console.log(res);
        });
    }
}
