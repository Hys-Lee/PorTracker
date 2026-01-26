import { getAllActualPortfolios, getAllPortfolios } from '@core/services';
import MemoFormArea from '../MemoFormModalView/_ingredients/MemoFormArea/MemoFormArea';
import MemoReference from '../MemoFormModalView/_ingredients/MemoReference/MemoReference';
import PortfolioReference from '../MemoFormModalView/_ingredients/PortfolioReference/PortfolioReference';
import MemoFormModalView from '../MemoFormModalView/MemoFormModalView';
import StoreProvider from '@core/utils/components/StoreProvider/StoreProvider';

const MemoFormModal = async () => {
  const tmpAllPortfoliosRes = await getAllPortfolios();
  //test
  console.log('tmpALl in memoformmodal: ', tmpAllPortfoliosRes);
  return (
    <>
      <StoreProvider>
        <MemoFormModalView
          formArea={
            <MemoFormArea
              tmpPortfoliosInfo={
                tmpAllPortfoliosRes.data?.map((data) => ({
                  ...data,
                  // portfolioType: 'actual',
                })) ?? []
              }
            />
          }
          memoReference={<MemoReference />}
          portfolioReference={<PortfolioReference />}
        />
      </StoreProvider>
    </>
  );
};

export default MemoFormModal;
