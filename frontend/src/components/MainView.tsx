import Analytics from '../pages/Analytics';
import BarChart from './BarChart';
import DataTable from './DataTable';
import './MainView.css';

function MainView() {
  const activeView = {
    search: true,
    analytics: false,
  };

  return (
    <div className="main-view">
      {activeView['search'] && <DataTable />}
      {activeView['analytics'] && <Analytics />}
    </div>
  );
}

export default MainView;
