import { PermissionService } from './../../../../core/services/permission.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import MetisMenu from 'metismenujs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('sidebarToggler') sidebarToggler: any = ElementRef;
  @ViewChild('sidebarMenu') sidebarMenu: any = ElementRef;

  public PermissionUsers: any;
  public PermissionPersonaNatural: any;
  public PermissionAppointments: any;
  public PermissionLanguage: any;
  public PermissionDashBoard: any;
  public PermissionAssignAppointment: any;
  public PermissionLeads: any;
  public PermissionInstallers: any;
  public PermissionEnergyProviders: any;
  public PermissionDisqualification: any;
  public PermissionTimeZone: any;
  public PermissionStates: any;
  public PermissionProviders: any;
  public PermissionRoof: any;
  public PermissionSalesRepresentative: any;



  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private PermissionSrv: PermissionService, router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });
  }

  ngOnInit(): void {
    this.getPermissionMenu(this.rol_id);
    this.document.body.classList.add('sidebar-dark');

    const desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
    desktopMedium.addEventListener('change', () => {
      this.iconSidebar;
    });
    this.iconSidebar(desktopMedium);
  }

  public getPermissionMenu(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
    .subscribe((permission: any) => {
      console.log(permission);
      for(let permiss of permission){
        if(permiss.mod_id == 1){
          this.PermissionUsers = permiss['read'];
        }if(permiss.mod_id == 2){
          this.PermissionAppointments = permiss['read'];
        }if(permiss.mod_id == 3){
          this.PermissionLanguage = permiss['read'];
        }if(permiss.mod_id == 4){
          this.PermissionDashBoard = permiss['read'];
        }if(permiss.mod_id == 5){
          this.PermissionAssignAppointment = permiss['read'];
        }if(permiss.mod_id == 6){
          this.PermissionLeads = permiss['read'];
        }if(permiss.mod_id == 7){
          this.PermissionInstallers = permiss['read'];
        }if(permiss.mod_id == 8){
          this.PermissionEnergyProviders = permiss['read'];
        }if(permiss.mod_id == 9){
          this.PermissionDisqualification = permiss['read'];
        }if(permiss.mod_id == 10){
          this.PermissionTimeZone = permiss['read'];
        }if(permiss.mod_id == 11){
          this.PermissionStates = permiss['read'];
        }if(permiss.mod_id == 12){
          this.PermissionProviders = permiss['read'];
        }if(permiss.mod_id == 13){
          this.PermissionRoof = permiss['read'];
        }if(permiss.mod_id == 14){
          this.PermissionSalesRepresentative = permiss['read'];
        }
      }
    })
  }

  ngAfterViewInit() {
    new MetisMenu(this.sidebarMenu.nativeElement);
    this._activateMenuDropdown();
  }

  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }

  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }

  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')){
      this.document.body.classList.add("open-sidebar-folded");
    }
  }

  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')){
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }

  onSidebarThemeChange(event: Event) {
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add((<HTMLInputElement>event.target).value);
    this.document.body.classList.remove('settings-open');
  }

  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  resetMenuItems() {

    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
          parentEl.classList.remove('mm-active');
          const parent2El = parentEl.parentElement;

          if (parent2El) {
            parent2El.classList.remove('mm-show');
          }
          const parent3El = parent2El?.parentElement;
          if (parent3El) {
            parent3El.classList.remove('mm-active');

            if (parent3El.classList.contains('side-nav-item')) {
              const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

              if (firstAnchor) {
                firstAnchor.classList.remove('mm-active');
              }
            }

            const parent4El = parent3El.parentElement;
            if (parent4El) {
              parent4El.classList.remove('mm-show');

              const parent5El = parent4El.parentElement;
              if (parent5El) {
                parent5El.classList.remove('mm-active');
              }
            }
          }
      }
    }
  };

  activateMenuItems() {

    const links: any = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
        if (window.location.pathname === links[i]['pathname']) {

            menuItemEl = links[i];

            break;
        }
    }

    if (menuItemEl) {
        menuItemEl.classList.add('mm-active');
        const parentEl = menuItemEl.parentElement;

        if (parentEl) {
            parentEl.classList.add('mm-active');

            const parent2El = parentEl.parentElement;
            if (parent2El) {
                parent2El.classList.add('mm-show');
            }

            const parent3El = parent2El.parentElement;
            if (parent3El) {
                parent3El.classList.add('mm-active');

                if (parent3El.classList.contains('side-nav-item')) {
                    const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

                    if (firstAnchor) {
                        firstAnchor.classList.add('mm-active');
                    }
                }

                const parent4El = parent3El.parentElement;
                if (parent4El) {
                    parent4El.classList.add('mm-show');

                    const parent5El = parent4El.parentElement;
                    if (parent5El) {
                        parent5El.classList.add('mm-active');
                    }
                }
            }
        }
    }
  };

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

  uid: any = this.getUserInfo('uid');
  FullName: any = this.getUserInfo('name');
  rol_id: any = this.getUserInfo('rol_id');

}
