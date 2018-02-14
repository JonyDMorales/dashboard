import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';

@Component({
    selector: 'app-pan',
    templateUrl: './pan.component.html',
    styles: []
})
export class PanComponent implements OnInit {


    constructor(public _graphicsService: GraphicsService) {

    }

    ngOnInit() {}

}

