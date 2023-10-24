import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DestinoSufragioService } from '@app/core/services/destino-sufragio.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-view-generar-qr',
  templateUrl: './view-generar-qr.component.html',
  styleUrls: ['./view-generar-qr.component.scss']
})
export class ViewGenerarQrComponent implements OnInit {

  url: SafeUrl = ''
  public token: any
  formVerificarDui!: FormGroup

  CodeGenerado: boolean = true
  uui: any

  @ViewChild('duiInput') duiInput!: ElementRef;


  onCodeChange(url: SafeUrl) {
    this.url = url;
  }

  constructor(
    private generarQrSrv: DestinoSufragioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formVerificarDui = formBuilder.group({
      dui: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  public verificarDui() {
    const dui = {
      dui: this.formVerificarDui.value.dui
    }
    this.generarQrSrv.createQR(dui.dui, this.token)
    .subscribe(
      (res: any) => {
        Swal.fire(
          'Buen Trabajo!',
          'Su informacion ha sido validada!',
          'success'
        )
        this.CodeGenerado = true
        console.log('Respuesta de la creación del QR', res);
        // Aquí puedes manejar la respuesta exitosa.
      },
      (error) => {
        if (error) {
          // Handle the 404 error here
          console.error('Error 404: Recurso no encontrado', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Ha ocurrido un error, usted no esta apto para votar en estas elecciones!`
          })
          // Puedes tomar medidas específicas para manejar el error 404, como mostrar un mensaje al usuario.
        } else {
          // Handle other errors
          console.error('Error en la creación del QR', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Ha ocurrido un error al momento de crear tu QR!`
          })
          // Puedes manejar otros tipos de errores aquí.
        }
      }
    );
    //this.CodeGenerado = true
  }

  public onInputChange(event: Event) {
    const inputElement = this.duiInput.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;
  
    // Utilizar una expresión regular para permitir solo números y "-"
    const validValue = inputValue.replace(/[^\d-]/g, '');
  
    // Asignar el valor válido de vuelta al campo de entrada
    inputElement.value = validValue;
  }

  /*Obtener el token*/
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
