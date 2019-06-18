import React from "react";
  var added = [];
  //setup account en account edit
function fillAddedInterests (chosenInterest) {
  if(chosenInterest !== "") {
    if (!(added.includes(chosenInterest))) {
      added.push(chosenInterest);
      document.getElementById("intrestErrorMessage").classList.add("hideErrorMessageSetUp");
      console.log(added[added.length-1])
    } else if(!(added[added.length-1] === chosenInterest)) {
      //Error messages tonen als de interesse al is toegevoegd
      document.getElementById("intrestErrorMessage").classList.remove("hideErrorMessageSetUp");
    }
    return (
        added.map((addedInterest) =>
        <p id="added--interests" value={addedInterest} key={addedInterest}> {addedInterest}</p>
        )
      );
    }
}


export{fillAddedInterests};
