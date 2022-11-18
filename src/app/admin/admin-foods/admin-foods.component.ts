import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Food } from 'src/app/model/food.model';
import { FoodServices } from 'src/app/services/food.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddFoodComponent } from '../add-food/add-food.component';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DeleteFoodComponent } from './delete-food/delete-food.component';

@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.component.html',
  styleUrls: ['./admin-foods.component.css'],
})
export class AdminFoodsComponent implements OnInit {
  foods: Food[] = [];
  faPen = faPen;
  faTrash = faTrash;
  searchKey: string;
  foodsTableList: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'foods',
    'name',
    'quantityAvailable',
    'price',
    'actions',
  ];

  routerEventSubscription = this.routerService.events.subscribe();

  constructor(
    private activatedRouterService: ActivatedRoute,
    private foodService: FoodServices,
    private routerService: Router,
    private dailog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.foodsTableList = new MatTableDataSource();
    this.getFoods();
    if (this.routerEventSubscription) {
      this.routerSubscription();
    }
  }

  routerSubscription(): void {
    this.routerEventSubscription = this.routerService.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.getFoods();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

  getFoods() {
    this.foods = [];

    this.foodService.getFoodsForAdmin().subscribe((response) => {
      response.forEach((food) => this.foods.push(food));
    });
  }

  onAdd() {
    this.foodService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dailog.open(AddFoodComponent, dialogConfig);
    this.routerService.navigate(['addFood'], {
      relativeTo: this.activatedRouterService,
    });
  }

  onEdit(food: Food) {
    this.foodService.populateEditFoodForm(food);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dailog.open(AddFoodComponent, dialogConfig);
    this.routerService.navigate([`editFood/${food.id}`], {
      relativeTo: this.activatedRouterService,
    });
  }

  onDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this food?',
    };
    this.dailog
      .open(DeleteFoodComponent, dialogConfig)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          let index = this.foods.findIndex((item) => item.id === id);
          if (index > -1) {
            this.foods.splice(index, 1);
          }
          this.foodService.deleteFood(id).subscribe();
          this.notificationService.warn('Deleted successfully.');
        }
      });
    this.routerService.navigate(['/admin/foods'], {
      relativeTo: this.activatedRouterService,
    });
  }
}
