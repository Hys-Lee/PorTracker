import Tile from 'src/shared/ui/MOLECULES/Tile';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';

const defaultOption = {
  animation: false,

  series: {
    type: 'pie',
    data: [
      { name: 'one', value: 12 },
      { name: 'two', value: 34 },
      { name: 'three', value: 56 },
      { name: 'four', value: 10 },
      { name: 'five', value: 23 },
    ],
    labelLine: {
      show: false,
    },
    label: {
      show: false,
      // position: 'center',
      // formatter: '야',
    },
    emphasis: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
    },
  },
  tooltip: {
    formatter: '{b}:{c}',
  },
};

const RelatedPresetPortfolio = () => {
  // 날짜를 받으면, 이전 것들 중 제일 최근의 설정포폴을 가져오기.
  const noPreset = true; // 임시
  return (
    <>
      <Tile>
        {noPreset ? (
          /** 설정 포폴이 없다면 */ <p>설정 포트폴리오가 없어요</p>
        ) : (
          <>
            <p>설정 포트폴리오</p>
            <div>
              <ReactECharts option={defaultOption} />
              echarts로 만드는 간단한 pie차트. 데이터 처리해서.기타 처리
            </div>
          </>
        )}
      </Tile>
    </>
  );
};

export default RelatedPresetPortfolio;
