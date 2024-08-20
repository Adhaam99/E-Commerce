import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Categories } from '../../core/interfaces/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  allCategories:Categories[]=[]

  constructor(private _CategoriesService:CategoriesService){}

  getCategories=()=>{

    this._CategoriesService.getCategories().subscribe({

      next:(res)=>{ this.allCategories=res.data},

      error:(err)=>{console.log(err)}
    })
  }

  ngOnInit(): void {
    
    this.getCategories();

  }
}
