let emailAddress = document.getElementById("email_address_input");
let fullName = document.getElementById("fullname_input");
const submitWaitlistBtn = document.getElementById("sub_waitlist_btn");
const successMessage = document.getElementById("success");

function preparePage() {
  const db = firebase.firestore();
  submitWaitlistBtn.addEventListener("click", (e) => {
    emailAddress = emailAddress.value;
    fullName = fullName.value;
    if (emailAddress && fullName) {
      submitWaitlistBtn.innerText = "sending......";
      submitWaitlistBtn.setAttribute("disabled", true);
      db.collection("users")
        .add({
          fullName,
          emailAddress,
        })
        .then((docRef) => {
          submitWaitlistBtn.innerText = "Join Waitlist";
          submitWaitlistBtn.removeAttribute("disabled");

          successMessage.innerText =
            "Congratulations!! , You have successfully joined our Waitlist";
          successMessage.style.color = "green";
          setTimeout(() => {
            location.reload();
          }, 3000);
        })
        .catch((error) => {
          successMessage.innerText = error.message.toString();
          successMessage.style.color = "red";
          setTimeout(() => {
            successMessage.innerText = "";
          }, 3000);
        });
    }
  });
}
