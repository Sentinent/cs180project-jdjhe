import PieChartVC from '../components/PieChartVC';
import PieChartCB from '../components/PieChartCB';
import BarChart from '../components/BarChart';

function Analytics() {
  return (
    <div className="main-view">
      <PieChartVC />
      <PieChartCB />
      <BarChart />
    </div>
  );
}

export default Analytics;
