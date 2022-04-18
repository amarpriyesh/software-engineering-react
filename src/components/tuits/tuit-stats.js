import React from "react";

const likeSymbol = (tuit) => {
    if(tuit.stats.likes ==0) {
        return <h6><i className="fa-light fa-thumbs-up" style={{color: 'red'}}></i>{tuit.stats.likes}</h6>
    }
    else {
        return <h6><i className="fas fa-thumbs-up me-1" style={{color: 'red'}}></i>{tuit.stats.likes}</h6>
    }
}
const dislikeSymbol = (tuit) => {
    if(tuit.stats.dislikes ==0) {
        return <h6><i className="fa-light fa-thumbs-down" style={{color: 'black'}}></i>{tuit.stats.dislikes}</h6>
    }
    else {
        return <h6><i className="fas fa-thumbs-down me-1" style={{color: 'black'}}></i>{tuit.stats.dislikes}</h6>
    }
}
const TuitStats = ({tuit, likeTuit = () => {},dislikeTuit = () => {}}) => {
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
            {likeSymbol(tuit=tuit) }

          </span>
        </div>
          <div className="col">
          <span onClick={() => dislikeTuit(tuit)}>
               {
                   dislikeSymbol(tuit=tuit)
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