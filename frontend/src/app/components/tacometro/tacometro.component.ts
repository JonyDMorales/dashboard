import { Component, OnInit } from '@angular/core';
import { ConsultaEventosService } from '../../services/consulta.eventos.service';
import { ConsultaTierraService } from '../../services/consulta.tierra.service';

@Component({
    selector: 'app-tacometro',
    templateUrl: './tacometro.component.html',
    styles: []
})
export class TacometroComponent implements OnInit {

    busquedaPRI = 'PRI-PVEM-PANAL';
    busquedaPAN = 'PAN-PRD-MC';
    busquedaMORENA = 'MORENA-PT-PES';
    valorPermitido = 0;
    candidato = '';
    estado = '';
    partido = '';
    max = 0;
    valorMax = 0;

    gaugeValuePRI:any = 0;
    costoPRI = 0;
    colorPRI = '';

    gaugeValuePAN:any = 0;
    costoPAN = 0;
    colorPAN = '';

    gaugeValueMORENA:any = 0;
    costoMORENA = 0;
    colorMORENA = '';

    gaugeValueCandidato:any = 0;
    costoCandidato = 0;
    colorCandidato = '';

    constructor(public _consultaEventosService: ConsultaEventosService, public _consultaTierraService: ConsultaTierraService) {
        this.candidato = localStorage.getItem('candidato');
        this.estado = localStorage.getItem('estado');
        this.partido = localStorage.getItem('partido');
        if(this.candidato == 'todos' || this.candidato == 'presidente'){
            this.candidato = 'presidente';
            this.valorPermitido = 429633325;
            this.max = 1000;
        }else if(this.candidato == 'gobernador'){
            if(this.estado == 'MORELOS'){
                this.valorPermitido = 29372493.80;
            }else if(this.estado == 'PUEBLA'){
                this.valorPermitido = 35851955.64;
            }else{
                this.valorPermitido = 30259504.80;
            }
            this.max = 60;
        }else{
            this.valorPermitido = 10000000;
            this.max = 30;
        }
        this.valorMax = this.valorPermitido + (this.valorPermitido * 0.05);
    }

    ngOnInit() {
        this.getTotalPRI();
        this.getTotalPAN();
        this.getTotalMORENA();
        this.getTotalCandidatoEstado();
    }

    public getTotalPRI() {
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPRI, '', this.candidato, '', '', '', '', '', '').subscribe(eventosPRI => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPRI, '', this.candidato, '', '', '', '', '', '').subscribe(tierraPRI => {
                this.costoPRI = eventosPRI['total'] + tierraPRI['total'];
                this.gaugeValuePRI = (this.costoPRI / 1000000).toFixed(1);
                if (this.costoPRI < this.valorPermitido) {
                    this.colorPRI = '#2ecc71';
                } else if ( this.costoPRI < this.valorMax ) {
                    this.colorPRI = '#FFFF99';
                } else {
                    this.colorPRI = '#FF0000';
                }
            });
        });
    }

    public getTotalPAN() {
        this._consultaEventosService.getGastoTotalEventos(this.busquedaPAN, '', this.candidato, '', '', '', '', '', '').subscribe(eventosPAN => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaPAN, '', this.candidato, '', '', '', '', '', '').subscribe(tierraPAN => {
                this.costoPAN = eventosPAN['total'] + tierraPAN['total'];
                this.gaugeValuePAN = (this.costoPAN / 1000000).toFixed(1);
                if (this.costoPAN < this.valorPermitido) {
                    this.colorPAN = '#2ecc71';
                } else if ( this.costoPAN < this.valorMax ) {
                    this.colorPAN = '#FFFF99';
                } else {
                    this.colorPAN = '#FF0000';
                }
            });
        });
    }

    public getTotalMORENA() {
        this._consultaEventosService.getGastoTotalEventos(this.busquedaMORENA, '', this.candidato, '', '', '', '', '', '').subscribe(eventosMORENA => {
            this._consultaTierraService.getGastoTotalTierra(this.busquedaMORENA, '', this.candidato, '', '', '', '', '', '').subscribe(tierraMORENA => {
                this.costoMORENA = eventosMORENA['total'] + tierraMORENA['total'];
                this.gaugeValueMORENA = (this.costoMORENA / 1000000).toFixed(1);
                if (this.costoMORENA < this.valorPermitido) {
                    this.colorMORENA = '#2ecc71';
                } else if ( this.costoMORENA < this.valorMax ) {
                    this.colorMORENA = '#FFFF99';
                } else {
                    this.colorMORENA = '#FF0000';
                }
            });
        });
    }

    public getTotalCandidatoEstado(){
        this._consultaEventosService.getGastoTotalEventos('', this.partido, this.candidato, '', '', '', this.estado, '', '').subscribe(eventosCandidato => {
            this._consultaTierraService.getGastoTotalTierra('', this.partido, this.candidato, '', '', '', this.estado, '', '').subscribe(tierraCandidato => {
                this.costoCandidato = eventosCandidato['total'] + tierraCandidato['total'];
                this.gaugeValueCandidato = (this.costoCandidato / 1000000).toFixed(1);
                if (this.costoCandidato < this.valorPermitido) {
                    this.colorCandidato = '#2ecc71';
                } else if ( this.costoCandidato < this.valorMax ) {
                    this.colorCandidato = '#FFFF99';
                } else {
                    this.colorCandidato = '#FF0000';
                }
            });
        });
    }
}
