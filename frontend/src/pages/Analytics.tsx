import PieChartVC from "../components/PieChartVC";
import PieChartCB from "../components/PieChartCB";
import LineGraphTOD from "../components/LineGraphTOD";
import PieChartVPC from "../components/PieChartVPC";
import BarChartRO from "../components/BarChartRO";
import BarChartMOY from "../components/BarChartMOY";

function Analytics() {
  return (
    <section className="bg-dark p-2">
      <div className="container">
        <div className="row text-center g-3 m-3">
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <PieChartVC />
              </div>
            </div>
          </div>
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <PieChartCB />
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center g-3 m-3">
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <LineGraphTOD />
              </div>
            </div>
          </div>
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <PieChartVPC />
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center g-4 m-3">
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <BarChartRO />
              </div>
            </div>
          </div>
          <div className="col-xl m-3 align-items-stretch">
            <div className="card bg-light text-dark">
              <div className="card-body text-center">
                <BarChartMOY />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analytics;