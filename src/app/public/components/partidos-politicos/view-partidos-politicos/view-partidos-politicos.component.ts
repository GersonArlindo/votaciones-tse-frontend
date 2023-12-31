import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CentroVotacionService } from '@app/core/services/centro-votacion.service';
import { PartidosPoliticosService } from '@app/core/services/partido-politico.service';
import { environment } from '@encoding/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-partidos-politicos',
  templateUrl: './view-partidos-politicos.component.html',
  styleUrls: ['./view-partidos-politicos.component.scss']
})
export class ViewPartidosPoliticosComponent implements OnInit {

  public partidos_politicos: any[] = [];
  public estados: any[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";
  formEditPartidoPolitico!: FormGroup
  opcionSeleccionadaEstado: any
  id_seleccionado: any

  public estatusCentroVotacion: any = []
  public statusCentroVotacionBoolean: boolean = false

  public token: any
  update: any;
  deleted: any;
  create: any;
  public url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';

  constructor(
    private modalService: NgbModal,
    private PartidosPoliticosSrv: PartidosPoliticosService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private formBuilder: FormBuilder,
    private centroVotacionSrv: CentroVotacionService
  ) {
    this.formEditPartidoPolitico = this.formBuilder.group({
      nombre: ['', Validators.required],
      siglas: ['', Validators.required],
      estado: [],
    })
   }

  ngOnInit(): void {

    this.getPartidosPoliticos();
    this.getStatusCentroVotacion()
    this.estados = [
      { id: "ACTIVO", nombre: "ACTIVO" },
      { id: "INACTIVO", nombre: "INACTIVO" },
    ]
  }

  public getStatusCentroVotacion() {
    this.centroVotacionSrv.getCentrosVotaciones(this.token)
      .subscribe((data) => {
        for (let status of data) {
          this.estatusCentroVotacion.push(status.estado);
        }
  
        console.log(this.estatusCentroVotacion);
  
        // Verificar si todos son "CERRADA"
        const todosCerrados = this.estatusCentroVotacion.every((estado: any) => estado === 'CERRADA');
  
        // Verificar si al menos uno es "ABIERTA"
        const algunoAbierto = this.estatusCentroVotacion.some((estado: any) => estado === 'ABIERTA');
  
        if (todosCerrados) {
          this.statusCentroVotacionBoolean = true
        } else if (algunoAbierto) {
          this.statusCentroVotacionBoolean = false
        }
      });
  }



  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  public getPartidosPoliticos(){
    this.PartidosPoliticosSrv.getPartidosPoliticos(this.token)
    .subscribe((data: any) => {
      this.partidos_politicos = data;
      console.log(this.partidos_politicos);
      this.url = `${environment.API_URL}images/${data[0].imagen}`;
      console.log(this.url)
    })
  }

  public convertDateTime(date: any){
    const date_locale = new Date(`${date}`).toLocaleDateString('es', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    var date_timer_ = new Date(`${date}`);
    var hours = date_timer_.getUTCHours();
    var minutes = date_timer_.getUTCMinutes();
    var militaryTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;

    const formatted = `${date_locale} ${this.to12HourTime(militaryTime)}`;
    return formatted
  }

  public to12HourTime(time: any) {
    var b = time.split(/\D/);
    return (b[0]%12 || 12) + ':' + b[1] +
           (b[0]<=11? ' am' : ' pm');
  }


  ViewPartidosPoliticosModal(content: any, viewProduct:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        // this.partidosPoliticosLanguage(viewProduct);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public convertStatus(id: any){
    if(id == 1){
      return "Activo";
    }if(id == 0){
      return "Inactivo"
    }
    return
  }

  public getClassForEstado(id: any) {
    const className = id == 1 ? "activo-class" : id == 0 ? "inactivo-class" : "";
    return className;
  }

  editarPartidoPolitico(content: any, id: any){
    this.id_seleccionado = id
    this.PartidosPoliticosSrv.getPartidosPoliticosById(id, this.token)
      .subscribe((data: any)=>{
        if(data){
          console.log(data)
          this.opcionSeleccionadaEstado = data.estado
          this.formEditPartidoPolitico = this.formBuilder.group({
            nombre: [data.nombre, Validators.required],
            siglas: [data.siglas, Validators.required],
            estado: [this.opcionSeleccionadaEstado]
          })
          
        }
      })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  GuardarDatosEditadorPartidoPolitico(){
    const data: any = {
      nombre: this.formEditPartidoPolitico.value.nombre,
      siglas: this.formEditPartidoPolitico.value.siglas,
      estado: this.opcionSeleccionadaEstado
    }
    Swal.fire({
      title: 'Estas seguro?',
      text: "Realmente deseas editar este partido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.PartidosPoliticosSrv.updatePartidosPoliticos(data, this.id_seleccionado, this.token)
          .subscribe((res: any) => {
            console.log(res)
            if(res){
              Swal.fire(
                'Actualizado!',
                'Su registro ha sido actualizado exitosamente.',
                'success'
              )
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ah ocurrido un error!'
              })
            }
          })
      }
    })
    console.log(data)
  }

  public eliminarPartidoPolitico(id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Realmente deseas eliminar este partido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.PartidosPoliticosSrv.deletePartidosPoliticos(id, this.token)
          .subscribe((res: any) => {
            console.log(res)
            if(res.statusCode == 200){
              Swal.fire(
                'Eliminado!',
                'Su registro ha sido eliminado exitosamente.',
                'success'
              )
              // setTimeout(() => {
              //   window.location.reload();
              // }, 1500);
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ah ocurrido un error!'
              })
            }
          })
      }
    })
  }

  public estadoSeleccionado(event: any){
    console.log(event);
  }


  deletePartidosPoliticosModal(content: any, viewProduct:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
       // this.partidosPoliticosLanguage(viewProduct);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getUserInfo(inf: any) {
    const token = this.getTokens();
    this.token = token
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload)[`${inf}`];
    } else {
      return null;
    }
  }

  getTokens() {
    return localStorage.getItem("login-token");
  }

  rol_id: any = this.getUserInfo('rol');


}
