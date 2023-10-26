import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { partidosPoliticosGlobalMsg } from '@app/core/models/partidos_politicos.interface';
import { PartidosPoliticosService } from '@app/core/services/partido-politico.service';
import { environment } from '@encoding/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-partidos-politicos',
  templateUrl: './view-partidos-politicos.component.html',
  styleUrls: ['./view-partidos-politicos.component.scss']
})
export class ViewPartidosPoliticosComponent implements OnInit {

  public partidos_politicos: partidosPoliticosGlobalMsg[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";

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
  ) { }

  ngOnInit(): void {
    this.getPartidosPoliticos();
    /* this.getPermissionRole(this.rol_id); */
  }

 /*  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 21){
            this.update = permiss['update'];
            this.deleted = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
      })
  } */

  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  public getPartidosPoliticos(){
    this.PartidosPoliticosSrv.getPartidosPoliticos(this.token)
    .subscribe((data: any) => {
      this.partidos_politicos = data;
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

 /*  public partidosPoliticosLanguage(id: any){
    this.PartidosPoliticosSrv.getPartidosPoliticosById(id)
    .subscribe((res: any) =>{
      if(res){
        setTimeout(() =>{
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }, 100);
      }
    })
  }
 */
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
