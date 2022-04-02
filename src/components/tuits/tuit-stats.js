import React from "react";

const TuitStats = ({tuit, likeTuit = () => {}}) => {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">

          <span onClick={() => likeTuit(tuit)}>
              {
                 <h6><i className="fas fa-thumbs-up me-1" style={{color: 'red'}}></i>{tuit.stats.likes}</h6>
              }

          </span>
        </div>
          <div className="col">
          <span onClick={() => likeTuit(tuit)}>
               {
                   <h6><i className="fas fa-thumbs-down me-1" style={{color: 'black'}}></i>{tuit.stats.likes}</h6>
               }
          </span>
          </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;