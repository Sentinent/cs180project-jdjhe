import PieChartVCS from "../components/PieChartVCS";
import PieChartCBS from "../components/PieChartCBS";
import BarChartTODS from "../components/BarChartTODS";
import PieChartVPCS from "../components/PieChartVPCS";
import BarChartHorS from "../components/BarChartHorS";
import BarChartMOYS from "../components/BarChartMOYS";
  
function Analytics() {
  return (
    <section className="bg-dark p-2">
      <div className="container">
        <div className="row text-center g-3 m-3">
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <PieChartVCS />
              </div>
            </div>
          </div>
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <PieChartCBS />
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center g-3 m-3">
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <BarChartTODS />
              </div>
            </div>
          </div>
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <PieChartVPCS />
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center g-4 m-3">
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <BarChartHorS />
              </div>
            </div>
          </div>
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <BarChartMOYS />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analytics;