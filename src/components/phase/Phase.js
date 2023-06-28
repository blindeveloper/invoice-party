import CostItem from '../CostItem';
import { StyledPhase } from './Phase.styled';
import { StyledValue } from '../Global.styled';
const Phase = ({ phase }) => {
  return (
    <StyledPhase>
      <h2>{phase.name}</h2>

      <p>
        Phase fee: <StyledValue>{phase.fee} €</StyledValue>
      </p>
      <p>
        Subtotal added tax:{' '}
        <StyledValue>{phase.subtotalTaxAmount} €</StyledValue>
      </p>
      <p>
        Subtotal price:{' '}
        <StyledValue>{phase.priceWithFeePhaseAndInvoiceDiscount} €</StyledValue>
      </p>
      <p>
        Discount:{' '}
        <StyledValue>
          {phase.discount.amount}{' '}
          {phase.discount.type.includes('fixed') ? '€' : '%'}
        </StyledValue>
      </p>

      {phase.costItems.map((costItem, index) => {
        return <CostItem key={index} costItem={costItem} />;
      })}
    </StyledPhase>
  );
};

export default Phase;
