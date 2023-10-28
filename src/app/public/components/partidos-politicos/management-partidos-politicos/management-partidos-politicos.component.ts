import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '@app/core/services/candidato.service';
import { PartidosPoliticosService } from '@app/core/services/partido-politico.service';
import { PersonaNaturalService } from '@app/core/services/persona-natural.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-management-partidos-politicos',
  templateUrl: './management-partidos-politicos.component.html',
  styleUrls: ['./management-partidos-politicos.component.scss']
})
export class ManagementPartidosPoliticosComponent implements OnInit {
  public id: any
  public token: any
  formBuscar!: FormGroup
  valor: any

  public PartidoPolitico: any = []
  public personaNatural: any[] = [];
  public personaNaturalEncontrada: any[] = [];
  public candidatos: any[] = []

  public formData: any = new FormData();

  public obtenidoPartidoPolitico: boolean = false

  public uploadFiles: any;
  public url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';

  constructor(
    private modalService: NgbModal,
    private PartidosPoliticosSrv: PartidosPoliticosService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private PersonaNaturalSrv: PersonaNaturalService,
    private formBuilder: FormBuilder,
    private candidatoSrv: CandidatoService
  ) {
    this.formBuscar = formBuilder.group({
      valor: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.traerPartidoPoliticoById()
    this.getPersonasNaturales()
    this.getCandidatos()
  }

  public getPersonasNaturales(){
    this.PersonaNaturalSrv.getPersonaNatural()
    .subscribe((data: any) => {
      for(let personanatural of data){
        this.personaNatural.push(personanatural);
      }    
      console.log(this.personaNatural)
    })
    
  }

  public getCandidatos(){
    this.candidatoSrv.getCandidato(this.token)
    .subscribe((data: any) => {
      for(let candidato of data){
        this.candidatos.push(candidato)
      }
      console.log(this.candidatos)
    })
  }

  buscarEnArreglo() {
    this.personaNaturalEncontrada = []
    this.valor = this.formBuscar.value.valor;
    console.log(this.valor);
      this.personaNaturalEncontrada = this.personaNatural.filter((persona) => {
      const nombreCompleto = persona.nombres + ' ' + persona.apellidos;
      const valorMinusculas = this.valor.toLowerCase();
      return (
        nombreCompleto.toLowerCase().includes(valorMinusculas) ||
        persona.dui.toLowerCase().includes(valorMinusculas)
      );
    });
      console.log(this.personaNaturalEncontrada);
  }

  public vincularCandidato(id_persona_natural: any){
    console.log(id_persona_natural)

    this.formData.append("estado", "ACTIVO");
    this.formData.append("id_partido_politico", Number(this.id));
    this.formData.append("id_persona_natural", id_persona_natural);
    this.formData.append("foto_candidato", this.uploadFiles);

    Swal.fire({
      title: 'Estas seguro?',
      text: "Deseas agregar este candidato a este partido politico!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidatoSrv.createCandidato(this.token, this.formData)
        .subscribe((res: any) => {
          console.log(res);
          if(res){
            Swal.fire(
              'Registrado!',
              'Candidato Agregado exitosamente!',
              'success'
            )
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
          console.log(res)
        })
      }
    })


    
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadFiles = event.target.files[0];
    }
    console.log(this.uploadFiles);   
  }

  public traerPartidoPoliticoById(){
    this.PartidosPoliticosSrv.getPartidosPoliticosById(this.id, this.token)
      .subscribe((data: any) => {
        this.PartidoPolitico.push(data)
        console.log(this.PartidoPolitico)
        this.obtenidoPartidoPolitico = true
      })
  }

  public transformarFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO); // Crear un objeto Date a partir de la fecha ISO
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('default', { month: 'long' }); // Nombre del mes
    const año = fecha.getFullYear();
    const hora = fecha.getHours();
    const minuto = fecha.getMinutes();
  
    const fechaTransformada = `${dia} ${mes} ${año} ${hora}:${minuto}`;
    return fechaTransformada;
  }


  public formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getUTCDate();
    const mes = fechaObj.getUTCMonth() + 1; // Sumamos 1 porque los meses comienzan desde 0
    const año = fechaObj.getUTCFullYear();
  
    // Asegurémonos de que el día y el mes tengan dos dígitos
    const diaStr = dia.toString().padStart(2, '0');
    const mesStr = mes.toString().padStart(2, '0');
  
    return `${diaStr}/${mesStr}/${año}`;
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
