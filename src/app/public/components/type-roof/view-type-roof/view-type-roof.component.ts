import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { roof } from '@app/core/models/typeroof.interface';
import { PermissionService } from '@app/core/services/permission.service';
import { RoofService } from '@app/core/services/roof.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-type-roof',
  templateUrl: './view-type-roof.component.html',
  styleUrls: ['./view-type-roof.component.scss']
})
export class ViewTypeRoofComponent implements OnInit {

  public roof: roof[] = [];
  @ViewChild('dt') table!: Table;
  closeResult: any = "";

  update: any;
  deleted: any;
  create: any;
  form!: FormGroup;
  id?: string;
  submitting = false;
  submitted = false;
  title!: string;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private RoofSrv: RoofService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getRoof();
    this.getPermissionRole(this.rol_id);
    this.form = this.formBuilder.group({
      roof_name: ['', [Validators.required]],
      description_roof: ['', [Validators.required]],
    });
  }

  public getPermissionRole(id: any) {
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for (let permiss of permission) {
          if (permiss.mod_id == 13) {
            this.update = permiss['update'];
            this.deleted = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
      })
  }

  public getRoof() {
    this.RoofSrv.getRoof()
      .subscribe((data: any) => {
        this.roof = data;
      })
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  public convertDateTime(date: any) {
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
    return (b[0] % 12 || 12) + ':' + b[1] +
      (b[0] <= 11 ? ' am' : ' pm');
  }

  public Roof(id: any) {
    this.RoofSrv.getRoofById(id)
      .subscribe((res: any) => {
        if (res) {
          setTimeout(() => {
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
          }, 100);
        }
      })
  }

  viewRoofModal(content: any, viewProduct: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.Roof(viewProduct);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public deleteRoof(id: any) {
    this.RoofSrv.deleteRoof(id)
      .subscribe((res: any) => {
        if (res) {
          setTimeout(() => {
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
          }, 100);
        }
      })
  }

  deleteRoofModal(content: any, viewProduct: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteRoof(viewProduct);
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

  editRoofModal(content: any, id: any) {
    this.RoofSrv.getRoofById(id)
      .subscribe((next: any) => {
        this.form = this.formBuilder.group({
          roof_name: [next['roof_name'], [Validators.required]],
          description_roof: [next['description_roof'], [Validators.required]]
        });
      })
    if (id >= 1) {
      this.title = "Edit Type Roof"
    } else if (id == 0) {
      this.title = "Create Type Roof"
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        if (id >= 1) {
          this.title = "Edit Type Roof"

          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.RoofSrv.updateRoof(formValue, id)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/type-roof/view'])
                    .then(() => {
                      let currentUrl = this.router.url;
                      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                      this.router.onSameUrlNavigation = 'reload';
                      this.router.navigate([currentUrl]);
                    })
                } else {
                }
              })
          }, 1200);

        } else if (id == 0) {
          this.title = "Create Type Roof"
          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.RoofSrv.createRoof(formValue)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/type-roof/view'])
                    .then(() => {
                      let currentUrl = this.router.url;
                      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                      this.router.onSameUrlNavigation = 'reload';
                      this.router.navigate([currentUrl]);
                    })
                } else {
                }
              })
          }, 1200);

        }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  get position() { return this.form.controls }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['roof_name']?.errors) {
    }
    if (this.submitted && this.position['description_roof	']?.errors) {
    }

  }

  public isValid() {
    return !this.form.valid
  }

  isValidField(field: string) {
    return (
      (this.form.get(field) || this.form.get(field)?.dirty) && !this.form.get(field)?.valid
    );
  }

  getUserInfo(inf: any) {
    const token = this.getTokens();
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

  rol_id: any = this.getUserInfo('rol_id');
}
