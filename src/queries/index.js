import { gql } from '@apollo/client';

export const GET_INVOICE = gql`
  query ($id: ID) {
    invoice(id: $id) {
      id
      fee
      discount {
        id
      }
      phases {
        id
      }
      price {
        subtotal
        total
      }
      totalAddedTaxAmount
    }
  }
`;

export const GET_PHASE = gql`
  query ($id: ID) {
    phase(id: $id) {
      id
      name
      discount
      fee
      priceWithFeePhaseAndInvoiceDiscount
      subtotalTaxAmount
      costItems {
        id
      }
    }
  }
`;

export const GET_COST_ITEM = gql`
  query ($id: ID) {
    costItem(id: $id) {
      id
      name
      billingType
      price
      priceWithPhaseAndInvoiceDiscount
      priceWithPhaseDiscount
      taxAmount
      taxRate
    }
  }
`;

export const GET_DISCOUNT = gql`
  query ($id: ID) {
    discount(id: $id) {
      type
      amount
    }
  }
`;
