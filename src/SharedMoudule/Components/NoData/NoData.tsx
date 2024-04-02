import noData from "../../../assets/noData.jpg";

export default function NoData() {
  return <>
  <div className="text-center mt-3">
              <img src={noData} className="w-25 "/>
              <h5 className="mt-3 fw-bold text-warning">No Data</h5>
            </div>
  </>
}
