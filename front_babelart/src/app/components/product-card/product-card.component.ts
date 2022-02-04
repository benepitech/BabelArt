import { Component, OnInit, Input} from '@angular/core';
import IProductData from 'src/app/types/product.type';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  @Input() product?: IProductData = {};

  constructor() { }

  ngOnInit(): void {
  }

}
