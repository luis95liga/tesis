import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { UserResponse, UserView } from '@shared/models/user.interface';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { UserprofileComponent } from '@displaypanel/components/userprofile/userprofile.component';
import { UtilsService } from '@shared/service/utils.service';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@env/environment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAdmin = false;
  isLogged = false;
  id: any;
  sr!: UserView;
  img = '';
  private destroy$ = new Subject<any>();
  @ViewChild('menu')
  menu!: ElementRef;
  @Output() toggleSidenav = new EventEmitter<void>();
  name: string = '';
  constructor(
    private authSvc: AuthService,
    private utilsSvc: UtilsService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: UserResponse) => {
      if(user){
        this.id = user?.user.id;
        this.isLogged = true;
        this.isAdmin = user?.user.is_superuser;
        this.authSvc.UserView(this.id).subscribe((user: UserView)=>{
          this.name = user.name;
          this.sr = user;
        });
      }
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onTogglesSidenav(): void{
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
    this.isLogged = false;
  }

  onModalEmployee(): void{
    let dialogRef = this.dialog.open(UserprofileComponent, {
      height: '400px',
      width: '3000px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Usuario', Usuario: this.sr },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // Update result after adding new user.
      //this.userSvc.getAll().subscribe((users) => {
        //this.dataSource.data = users;
      //});
    });
  }

}
