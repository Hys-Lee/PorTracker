// import StarRatings from 'react-star-ratings';
import { css } from '@styled-system/css';
import { Rating } from 'react-simple-star-rating';

interface CompoundFormRatingProps {
  allowFraction?: boolean;
  maxRate: number;
  rate: number;
  onClick: (rate: number, index: number) => void;
}

const CompoundFormRating = ({
  allowFraction = false,
  maxRate,
  rate,
  onClick,
}: CompoundFormRatingProps) => {
  return (
    <div className={CompoundFormRatingWrapper}>
      <Rating
        onClick={onClick}
        SVGstyle={{ display: 'inline' }}
        initialValue={rate}
        iconsCount={maxRate}
        allowFraction={allowFraction}
      />
    </div>
  );
};

export default CompoundFormRating;

const CompoundFormRatingWrapper = css({
  display: 'flex',
  flexDirection: 'row',
});
