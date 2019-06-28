//React importeren
import React from "react";
//CSS importeren
import "./methods.css";

var added = [];
//setup account en account edit
function fillAddedInterests (chosenInterest) {
  if(chosenInterest !== "") {
    if (!(added.includes(chosenInterest))) {
      added.push(chosenInterest);
      document.getElementById("interestErrorMessage").classList.add("errorMessage--hide");
    } else if(!(added[added.length-1] === chosenInterest)) {
      //Error messages tonen als de interesse al is toegevoegd
      document.getElementById("interestErrorMessage").classList.remove("errorMessage--hide");
    }
    return (
        added.map((addedInterest) =>
        <div>
          <div className="errorMessage errorMessage--hide" id="interestErrorMessage">
            <p className="errorMessage__text">Interesse is al toegevoegd</p>
          </div>
          <p id="added--interests" value={addedInterest} key={addedInterest}> {addedInterest}</p>
        </div>
        )
      );
    }
    added = [];
}


export{fillAddedInterests};
