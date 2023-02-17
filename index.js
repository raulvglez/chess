$(document).ready(function () {
  var selected = "";
  var allowedMovements = [];
  var counter = 0;
  var regex = /^[./assets/]*|[_]/g;

  console.log($("#black_king").length);

  turnInfo();

  $("img").mousedown(function () {
    if ((counter % 2 == 0 && $(this).attr("src").split(regex)[1] == "white") || (counter % 2 !== 0 && $(this).attr("src").split(regex)[1] == "black")){
    selected = this;
    getAllowedMovements(
      $(this).attr("src").split(regex)[2],
      $(this).attr("src").split(regex)[1]
    ).forEach((element) => {
      $("#" + element).css("background-color", "green");
    });
  }});

  $(".tile").mouseover(function () {
    if (
      selected !== "" &&
      allowedMovements.includes(parseInt($(this).attr("id")))
    ) {
      $(this).html(selected);
      allowedMovements.forEach((element) => {
        $("#" + element).css("background-color", "");
      });
      allowedMovements = [];
      selected = "";
      counter++;
      turnInfo();
      checkIfMatchEnded();
    } else if (
      selected !== "" &&
      !allowedMovements.includes(parseInt($(this).attr("id")))
    ) {
      allowedMovements.forEach((element) => {
        $("#" + element).css("background-color", "");
      });
      allowedMovements = [];
    }
  });

  function getAllowedMovements(ficha, color) {
    switch (ficha) {
      case "pawn":
        return getPawnAllowedMovements(color);
      case "knight":
        return getKnightAllowedMovements(color);
      case "rook":
        return getRookAllowedMovements(color);
      case "bishop":
        return getBishopAllowedMovements(color);
      case "queen":
        return getQueenAllowedMovements(color);
      case "king":
        return getKingAllowedMovements(color);
    }
  }

  function getPawnAllowedMovements(color) {
    if (color == "white") {
      if (48 < getParentId(selected) && getParentId(selected) < 57) {
        pushIntoAllowed(getParentId(selected) - 8);
        pushIntoAllowed(getParentId(selected) - 16);
      } else {
        pushIntoAllowed(getParentId(selected) - 8);
      }
      if (
        getChildrenImgSrc(getParentId(selected) - 9) !== undefined &&
        getChildrenImgSrc(getParentId(selected) - 9).split(regex)[1] == "black" &&
        (getParentId(selected) - 9) % 8 !== 0
      ) {
        allowedMovements.push(getParentId(selected) - 9);
      }
      if (
        getChildrenImgSrc(getParentId(selected) - 7) !== undefined &&
        getChildrenImgSrc(getParentId(selected) - 7).split(regex)[1] == "black" &&
        (getParentId(selected) - 7 - 1) % 8 !== 0
      ) {
        allowedMovements.push(getParentId(selected) - 7);
      }
      return allowedMovements;
    } else {
      if (8 < getParentId(selected) && getParentId(selected) < 17) {
        pushIntoAllowed(getParentId(selected) + 8);
        pushIntoAllowed(getParentId(selected) + 16);
      } else {
        pushIntoAllowed(getParentId(selected) + 8);
      }
      if (
        getChildrenImgSrc(getParentId(selected) + 9) !== undefined &&
        getChildrenImgSrc(getParentId(selected) + 9).split(regex)[1] == "white" &&
        (getParentId(selected) + 9) % 8 !== 0
      ) {
        allowedMovements.push(getParentId(selected) + 9);
      }
      if (
        getChildrenImgSrc(getParentId(selected) + 7) !== undefined &&
        getChildrenImgSrc(getParentId(selected) + 7).split(regex)[1] == "white" &&
        (getParentId(selected) + 7 - 1) % 8 !== 0
      ) {
        allowedMovements.push(getParentId(selected) + 7);
      }
      return allowedMovements;
    }
  }

  function getKingAllowedMovements(color) {
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 1);
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 1);
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 7);
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 8);
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 9);
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 7);
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 8);
    pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 9);
    return allowedMovements;
  }

  function getQueenAllowedMovements(color) {
    getTilesUntilPieceOfDifferentColor(color, "top");
    getTilesUntilPieceOfDifferentColor(color, "bottom");
    getTilesUntilPieceOfDifferentColor(color, "left");
    getTilesUntilPieceOfDifferentColor(color, "right");
    getTilesUntilPieceOfDifferentColor(color, "top-left");
    getTilesUntilPieceOfDifferentColor(color, "top-right");
    getTilesUntilPieceOfDifferentColor(color, "bottom-left");
    getTilesUntilPieceOfDifferentColor(color, "bottom-right");
    return allowedMovements;
  }

  function getKnightAllowedMovements(color) {
    if ((getParentId(selected) - 1) % 8 == 0) {
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 10);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 6);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 15);
    } else if ((getParentId(selected) - 2) % 8 == 0) {
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 10);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 6);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 15);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 15);
    } else if (getParentId(selected) % 8 == 0) {
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 10);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 6);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 15);
    } else if ((getParentId(selected) + 1) % 8 == 0) {
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 10);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 6);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 15);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 15);
    } else {
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 10);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 6);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) + 15);

      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 10);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 6);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 17);
      pushIntoAllowedIfNotSameColor(color, getParentId(selected) - 15);
    }
    return allowedMovements;
  }

  function getRookAllowedMovements(color) {
    getTilesUntilPieceOfDifferentColor(color, "top");
    getTilesUntilPieceOfDifferentColor(color, "bottom");
    getTilesUntilPieceOfDifferentColor(color, "left");
    getTilesUntilPieceOfDifferentColor(color, "right");
    return allowedMovements;
  }

  function getBishopAllowedMovements(color) {
    getTilesUntilPieceOfDifferentColor(color, "top-left");
    getTilesUntilPieceOfDifferentColor(color, "top-right");
    getTilesUntilPieceOfDifferentColor(color, "bottom-left");
    getTilesUntilPieceOfDifferentColor(color, "bottom-right");
    return allowedMovements;
  }

  function getTilesUntilPieceOfDifferentColor(color, direction) {
    switch (direction) {
      case "top":
        for (let i = getParentId(selected) - 8; i > 0; i = i - 8) {
          if (getChildrenImgSrc(i) == undefined) {
            allowedMovements.push(i);
          } else if (getChildrenImgSrc(i).split(regex)[1] !== color) {
            allowedMovements.push(i);
            return allowedMovements;
          } else if (getChildrenImgSrc(i).split(regex)[1] == color) {
            return allowedMovements;
          }
        }
        return allowedMovements;
      case "bottom":
        for (let i = getParentId(selected) + 8; i < 65; i = i + 8) {
          if (getChildrenImgSrc(i) == undefined) {
            allowedMovements.push(i);
          } else if (getChildrenImgSrc(i).split(regex)[1] !== color) {
            allowedMovements.push(i);
            return allowedMovements;
          } else if (getChildrenImgSrc(i).split(regex)[1] == color) {
            return allowedMovements;
          }
        }
        return allowedMovements;
      case "left":
        for (
          let i = getParentId(selected) - 1;
          i >=
          $(
            $("#" + getParentId(selected))
              .parent()
              .children("div")[1]
          ).attr("id");
          i--
        ) {
          if (getChildrenImgSrc(i) == undefined) {
            allowedMovements.push(i);
          } else if (getChildrenImgSrc(i).split(regex)[1] !== color) {
            allowedMovements.push(i);
            return allowedMovements;
          } else if (getChildrenImgSrc(i).split(regex)[1] == color) {
            return allowedMovements;
          }
        }
        return allowedMovements;
      case "right":
        for (
          let i = getParentId(selected) + 1;
          i <=
          $(
            $("#" + getParentId(selected))
              .parent()
              .children("div")[7]
          ).attr("id");
          i++
        ) {
          if (getChildrenImgSrc(i) == undefined) {
            allowedMovements.push(i);
          } else if (getChildrenImgSrc(i).split(regex)[1] !== color) {
            allowedMovements.push(i);
            return allowedMovements;
          } else if (getChildrenImgSrc(i).split(regex)[1] == color) {
            return allowedMovements;
          }
        }
        return allowedMovements;
      case "top-left":
        for (let i = getParentId(selected) - 9; i > 0; i = i - 9) {
          if ((getParentId(selected) - 1) % 8 !== 0) {
            if (getChildrenImgSrc(i) == undefined && (i - 1) % 8 !== 0) {
              allowedMovements.push(i);
            } else if (getChildrenImgSrc(i) == undefined && (i - 1) % 8 == 0) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] !== color &&
              i % 8 !== 0
            ) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] == color &&
              i % 8 !== 0
            ) {
              return allowedMovements;
            }
          }
        }
        return allowedMovements;
      case "top-right":
        for (let i = getParentId(selected) - 7; i > 1; i = i - 7) {
          if (getParentId(selected) % 8 !== 0) {
            if (getChildrenImgSrc(i) == undefined && i % 8 !== 0) {
              allowedMovements.push(i);
            } else if (getChildrenImgSrc(i) == undefined && i % 8 == 0) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] !== color &&
              (i - 1) % 8 !== 0
            ) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] == color &&
              (i - 1) % 8 !== 0
            ) {
              return allowedMovements;
            }
          }
        }
        return allowedMovements;
      case "bottom-right":
        for (let i = getParentId(selected) + 9; i < 65; i = i + 9) {
          if (getParentId(selected) % 8 !== 0) {
            if (getChildrenImgSrc(i) == undefined && i % 8 !== 0) {
              allowedMovements.push(i);
            } else if (getChildrenImgSrc(i) == undefined && i % 8 == 0) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] !== color &&
              (i - 1) % 8 !== 0
            ) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] == color &&
              (i - 1) % 8 !== 0
            ) {
              return allowedMovements;
            }
          }
        }
      case "bottom-left":
        for (let i = getParentId(selected) + 7; i < 65; i = i + 7) {
          if ((getParentId(selected) - 1) % 8 !== 0) {
            if (getChildrenImgSrc(i) == undefined && (i - 1) % 8 !== 0) {
              allowedMovements.push(i);
            } else if (getChildrenImgSrc(i) == undefined && (i - 1) % 8 == 0) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] !== color &&
              i % 8 !== 0
            ) {
              allowedMovements.push(i);
              return allowedMovements;
            } else if (
              getChildrenImgSrc(i).split(regex)[1] == color &&
              i % 8 !== 0
            ) {
              return allowedMovements;
            }
          }
        }
    }
  }

  function pushIntoAllowed(destiny) {
    if (getChildrenImgSrc(destiny) == undefined) {
      allowedMovements.push(destiny);
    }
  }

  function pushIntoAllowedIfNotSameColor(color, destiny) {
    if (getChildrenImgSrc(destiny) == undefined) {
      allowedMovements.push(destiny);
    } else if (getChildrenImgSrc(destiny).split(regex)[1] !== color) {
      allowedMovements.push(destiny);
    }
  }

  function getParentId(element) {
    return parseInt($(element).parent().attr("id"));
  }

  function getChildrenImgSrc(id) {
    return $("#" + id)
      .children("img")
      .attr("src");
  }

  function checkIfMatchEnded() {
    if ($("#black_king").length == 0) {
      alert("Ganan las blancas. Reiniciando");
      location.reload();
    } else if ($("#white_king").length == 0) {
      alert("Ganan las negras. Reiniciando");
      location.reload();
    }    
  }

  function turnInfo() {
    if (counter % 2 == 0) {
      $("#info").html("blancas");
    } else {
      $("#info").html("negras");
    }
  }
});