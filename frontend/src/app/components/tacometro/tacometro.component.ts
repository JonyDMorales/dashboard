import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tacometro',
    templateUrl: './tacometro.component.html',
    styles: []
})
export class TacometroComponent implements OnInit {
    
    color = '#2ecc71';
    gaugeType = 'arch';
    gaugeValue = 300;
    gaugeLabel = 'MXN';
    gaugeAppendText = 'mdp';
    
    constructor() { }

    ngOnInit() {}

}
