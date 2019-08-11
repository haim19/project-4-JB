import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private shopService: ShopService) { }
  
  amountOfInspected:number=0;
  inspectedProduct: any;
  currentlyAdding: boolean = false;
  searchProduct: string;
  allCategories: any;
  allProducts: any;

  showCategory(ev) {
    this.shopService.getProducts().subscribe(productsData => {
      this.allProducts = productsData.filter(prod => prod.categoryType === ev);
    });
  }
  searchProd() {

    this.shopService.getProducts().subscribe(product => {
      this.allProducts = product.filter(prod => prod.title.toLowerCase().includes(this.searchProduct.toLowerCase()))
    })
  }

  addProduct(prodId) {
    this.currentlyAdding = true;
    this.inspectedProduct = this.allProducts.filter(prod => prod._id === prodId)[0]

    debugger;
  }

  ngOnInit() {
    this.shopService.getCategories().subscribe(categoryData => {
      this.allCategories = categoryData;
      this.showCategory(this.allCategories[0]._id);

    });
  }

}


