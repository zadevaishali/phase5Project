import { Component, OnInit } from '@angular/core';
import { FoodServices } from 'src/app/services/food.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  constructor(
    private routerService: Router,
    private activatedRoute: ActivatedRoute,
    protected foodService: FoodServices,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddFoodComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.foodService.foodForm.valid) {
      if (this.foodService.foodForm.get('id').value === 0) {
        this.foodService
          .addFood(this.foodService.foodForm.value)
          .subscribe();
        this.notificationService.sucess('Added food successfully!');
      } else {
        this.foodService
          .updateFood(
            this.foodService.foodForm.get('id').value,
            this.foodService.foodForm.value
          )
          .subscribe();
        this.notificationService.sucess('Modified food successfully!');
      }
      this.foodService.foodForm.reset();
      this.foodService.initializeFormGroup();
      this.routerService.navigate(['/admin/foods'], {
        relativeTo: this.activatedRoute,
      });
      this.onClose();
    } else {
      console.log('Form is invalid');
    }
  }

  onClear() {
    this.foodService.foodForm.reset();
    this.foodService.initializeFormGroup();
  }

  onClose() {
    this.routerService.navigate(['admin/foods'], {
      relativeTo: this.activatedRoute,
    });
    this.foodService.foodForm.reset();
    this.foodService.initializeFormGroup();
    this.dialogRef.close();
  }
}
