import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinoSufragioService } from '@app/core/services/destino-sufragio.service';
import { PersonaNaturalService } from '@app/core/services/persona-natural.service';
import { UsersService } from '@app/core/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrReaderComponent implements OnInit {

  title = 'qr-reader';
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];
  canScan = true;

  public token: any

  public dui: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSrv: UsersService,
    private destinoSufragioSrv: DestinoSufragioService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private personasNaturales:PersonaNaturalService,
  ) {
   /*  navigator.mediaDevices.enumerateDevices().then((devices) => {
      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        if (device.kind === 'videoinput') {
          console.log(device);
          this.myDevice = devices[1];          
        }
      }
      console.log(this.myDevice);
    }); */
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    console.log(this.cameras)
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event:string){
    console.log(event);
    this.destinoSufragioSrv.getPersonaNaturalValida(event, this.token)
    .subscribe((data: any) => {
      if(data){
        this.dui = data.informacion_personal.dui
        let cadenaRecuperada: any = localStorage.getItem(`dui-${this.dui}`);
        const objetoRecuperado = JSON.parse(cadenaRecuperada);
        if (objetoRecuperado) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Persona Natural ya asistio a esta JRV!"
          });
          return
        }

        Swal.fire({
          title: "Persona Natural Apta para votar!",
          text: "Nombres: " + data.informacion_personal.nombres + "\n" +
                "Apellidos: " + data.informacion_personal.apellidos + "\n" +
                "Dui: " + this.dui + "\n" +
                "Genero: " + data.informacion_personal.genero + "\n" +
                "Direccion: " + data.informacion_personal.detalle_direccion ,
          icon: "success"
        })              
        setTimeout(() => {
          this.personasNaturales.getPersonaNaturalByDui(this.dui)
            .subscribe(
              (data: any) => {
                let info_persona = JSON.stringify(data);
                localStorage.setItem(`dui-${this.dui}`, info_persona);
                Swal.fire({
                  title: "Validado!",
                  text: "Persona Natural asistió a esta JRV.",
                  icon: "success"
                });
              },
              (error) => {
                console.error("Error en getPersonaNaturalByDui:", error);
              }
            );
        }, 2500);
      }
    },
    (error) => {
      console.error(error); // Imprime el error en la consola
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error // Muestra el mensaje de error
      })
      return
    })
    this.results.unshift(event);
    this.scannerEnabled = false
  }

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
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
