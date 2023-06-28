import { StyledValue } from './Global.styled';

const CostItem = ({ costItem }) => {
  return (
    <div>
      <p>------------------</p>
      <h4>{costItem.name}</h4>
      <p>
        Price: <StyledValue>{costItem.price} €</StyledValue>
      </p>
      <p>
        Tax rate: <StyledValue>{costItem.taxRate} %</StyledValue>
      </p>
      <p>
        Discounted price:{' '}
        <StyledValue>{costItem.priceWithPhaseAndInvoiceDiscount} €</StyledValue>
      </p>
      <p>
        <span>
          Billed for:{' '}
          <StyledValue>
            {costItem.amount} {costItem.billingType}
            {costItem.amount > 1 ? 's' : ''}
          </StyledValue>
        </span>
      </p>
    </div>
  );
};

export default CostItem;
