const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc1QQk-iUtZNdhn6VbUoKJjRpLTtbAtvTe3IrY-exDm9XNCVQ/formResponse";

const toggleFeedback = function() {
  const knightsStuff = document.getElementsByClassName("knightsStuff") || [];
  const clsList = knightsStuff[0].classList || null;
  if (clsList) {
    if (clsList.contains("show")) {
      clsList.remove("show");
      clsList.add("hide");
    } else if (clsList.contains("hide")) {
      clsList.remove("hide");
      clsList.add("show");
    }
  }
}

const notifyUser = function() {
  try {
    const name = document.getElementById("name");
    name.style.border = "1px solid #C62828";
    const error = document.getElementById("error");
    if (!error) {
      const info = document.createElement("div");
      info.className = "error";
      info.textContent = "* Name id required";
      info.id = "error";
      name && name.parentElement.insertBefore(info, name.nextSibling);
    }
  } catch(ex) {
    console.warn(ex);
  }
}

const _formUpload = function() {
  const name = document.forms["upload-form"]["reader-name"].value || "";
  const mail = document.forms["upload-form"]["reader-mail"].value || "*** No Mail ***";
  const message = document.forms["upload-form"]["reader-message"].value || "*** No Message ***";
  if (name.length < 3) {
    notifyUser();
  } else {
    const formsContent = new FormData();
    formsContent.append("entry.257825837", name);
    formsContent.append("entry.28761927", message);
    formsContent.append("entry.1548109237", mail);
    fetch(FORM_URL, {
      method: "POST",
      body: formsContent
    });
    setTimeout(() => {
      const button = document.querySelectorAll(".userform button")[0];
      const successMessage = document.createElement("div");
      successMessage.textContent = "Whoa! Thanks for the message. Your can also reach me on twitter at @srsandeepkumar";
      successMessage.style.fontSize = "x-small";
      successMessage.style.textAlign = "center";
      successMessage.style.marginTop = "10px";
      button.parentElement.append(successMessage);
      toggleFeedback();
    }, 500);
  }
};

var knight = function() {
  return {
    uploadForm: _formUpload,
    toggleFeedback
  };
};

if (knight) {
  window.KNIGHTS = knight();
}
