import React from 'react';
import noData from "../../src/assets/noData.png";

export default function NoData() {
  return (
   <>
    <div className="mt-3">
              <img src={noData} alt="noData" />
              <h5>No Data !</h5>
              <p className="text-muted">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
   </>
  )
}
