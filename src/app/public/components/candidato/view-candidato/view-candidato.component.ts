import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '@app/core/services/candidato.service';
import { environment } from '@encoding/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-candidato',
  templateUrl: './view-candidato.component.html',
  styleUrls: ['./view-candidato.component.scss']
})
export class ViewCandidatoComponent implements OnInit {
  public candidatos: any[] = [];
  @ViewChild('dt') table!: Table;
  closeResult: any = "";
  public token:any;
  loading= false;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private candidatoSrv: CandidatoService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private router: Router,/* 
    private PermissionSrv: PermissionService, */
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCandidatos()
  }

  public getCandidatos() {
    this.candidatoSrv.getCandidato(this.token)
    .subscribe((data: any) => {
      console.log(data)
      this.candidatos = (data);
    })
  }

  public deleteCandidato(id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Realmente deseas eliminar este cadidato!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidatoSrv.deleteCandidato(id, this.token)
          .subscribe((res: any) => {
            if(res.statusCode == 200){
              Swal.fire(
                'Eliminado!',
                'Su registro ha sido eliminado exitosamente.',
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
  }


  applyFilterGlobal($event: any) {
    //this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
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
