import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import ActualPortfolioBoard from 'src/widgets/portfolio/ui/ORGANISMS/ActualPortfolioBoard';

const Portfolio = () => {
  return (
    <>
      <div>
        <CompoundSegmentControl>
          <CompoundSegmentControl.Button textContent="실제" />
          <CompoundSegmentControl.Button textContent="설정" />
        </CompoundSegmentControl>
        <div>
          <h4>실제 포폴</h4>
          <ActualPortfolioBoard />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
