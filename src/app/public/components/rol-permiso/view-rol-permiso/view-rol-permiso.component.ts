import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { permission } from '@app/core/models/permission.interface';
import { ModuleService } from '@app/core/services/module.service';
import { PermissionService } from '@app/core/services/permission.service';
import { RolPermissionService } from '@app/core/services/rol-permission.service';
import { module } from '@core/models/modules.interface';

@Component({
  selector: 'app-view-rol-permiso',
  templateUrl: './view-rol-permiso.component.html',
  styleUrls: ['./view-rol-permiso.component.scss']
})
export class ViewRolPermisoComponent implements OnInit {

  public permissions: permission[] = [];
  public isChecked!: number;

  public id_module: any;
  public id_permissions: any;
  public Checked: any = 1;
  public id: any;

  constructor(
    private ModuleSrv: ModuleService, 
    private PermissionSrv: PermissionService,
    private RolePermissionSrv: RolPermissionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getPermission(this.id);

  }

  public getPermission(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
    .subscribe((next: any) => {
      this.permissions = next;
    })
  }

  checkValue(event: any, permission_id: any, module_id: any, type: any){
    this.Checked = event.target.checked;
    this.id_permissions = permission_id;
    this.id_module = module_id;

    //Console - log 
    console.log("CHECKED --", event.target.checked);
    console.log("PERMISSION_ID --", permission_id)
    console.log("MODULE_ID --", module_id)
    console.log("TYPE --", type)

    if(event.target.checked == true){
      this.PermissionSrv.changePermissionByTyped(1, type, permission_id)
      .subscribe((next: any) => {
        if(next){
          console.log(next)
        }
      })
    }if(event.target.checked == false){
      this.PermissionSrv.changePermissionByTyped(0, type, permission_id)
      .subscribe((next: any) => {
        if(next){
          console.log(next)
        }
      })
    }
  }

}
