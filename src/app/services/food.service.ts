import { Food} from '../model/food.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../model/http-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoodServices {
  private hostUrl = environment.apiUrl;
    

  constructor(private http: HttpClient) {}

  foodForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    quantityAvailable: new FormControl(null, Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.foodForm.setValue({
      id: 0,
      name: '',
      price: null,
      quantityAvailable: null,
      imageUrl: '',
    });
  }

  populateEditFoodForm(food: Food) {
    this.foodForm.setValue({
      id: food.id,
      name: food.name,
      price: food.price,
      quantityAvailable: food.quantityAvailable,
      imageUrl: food.imageUrl,
    });
  }

  public getFoodsForUser(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.hostUrl}` + '/foods');
  }

  public getFoodsForAdmin(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.hostUrl}` + '/admin/foods');
  }

  public addFood(newFood: Food): Observable<Food> {
    console.log(newFood);
    return this.http.post<Food>(
      `${this.hostUrl}` + '/admin/foods/addFood',
      newFood
    );
  }

  public updateFood(id: number, updatedFood: Food): Observable<Food> {
    console.log(id);
    return this.http.put<Food>(
      `${this.hostUrl}/admin/foods/editFood/${id}`,
      updatedFood
    );
  }

  public deleteFood(id: number): Observable<CustomHttpResponse> {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(
      `${this.hostUrl}/admin/food/deleteFood/${id}`
    );
  }
}
