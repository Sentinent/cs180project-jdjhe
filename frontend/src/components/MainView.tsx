import BarChart from './BarChart';
import DataTable from './DataTable_old';
import './MainView.css';

function MainView() {
  const activeView = {
    search: false,
    analytics: true,
  };

  return (
    <div className="main-view">
      {activeView['search'] && <DataTable></DataTable>}
      {activeView['analytics'] && <BarChart></BarChart>}
    </div>
  );
}

export default MainView;
