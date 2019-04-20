import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Action from '../actions/cartActions';
export default class Wishlist extends Component {
  render() {
    return (
      <div class="sub-pg-main-container container">
        <div class="row">
          <table class="shop_table" cellspacing="0">
            <thead>
              <tr>
                <th class="shop_table_th-title">&nbsp;</th>
                <th class="shop_table_th-title">&nbsp;</th>
                <th class="shop_table_th-title shop_table_th-title-pro-nm">PRODUCT NAME</th>
                <th class="shop_table_th-title">Product PRICE</th>
                <th class="shop_table_th-title">STOCK STATUS</th>
                <th class="shop_table_th-title">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr class="shop-table_tr">
                <td class="shop-table-td_product-remove">
                  <a href="#" class="shop-table_remove-item" aria-label="Remove this item">
                    <i class="fas fa-times"></i>
                  </a>	
                </td> 
                <td class="shop-table-td_product-thumbnail">
                  <a href="#">
                    <img src="../public/images/wl-product/w-pr-1.jpg" />
                  </a>			
                </td>
                <td class="shop-table-td_product-name" data-title="Product">
                  <a href="#" class='shop-table_pro-name pro-name'>Cras condime nibh vel</a> 
                  <span class='shop-table_ref_pro pro-ref'>TPS615</span>
                </td> 
                <td class="shop-table-td_product-price" data-title="Price">
                  <span class='shop-table_pri'>$ 0.00</span>
                </td> 
                <td class="shop-table-td_product-stock" data-title="Status">
                  <span class='shop-table_stk'>IN STOCK</span>
                </td>
                <td class="shop-table-td_product-add-btn">
                  <span class='shop-table_add-btn btn btn-blue hvr-sweep-to-right'>Add to cart</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
