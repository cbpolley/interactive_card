let url = 'https://leads.beta.openstudycollege.info/getTopLeads';

const users_array = [];
let user_iteration = 1;

const user_details = {
  "position_id": 0,
  "advisor_id": null,
  "clicksend_contact_id": null,
  "country": null,
  "course_title": "",
  "created": null,
  "created_at": "",
  "current_order_id": null,
  "date_of_birth": null,
  "dead_reason": null,
  "email": "",
  "enquiry": "",
  "entry_date": "",
  "failed_basket_SMS_sent": 0,
  "firstname": null,
  "gclid": null,
  "id": null,
  "initialized_pending_SMS_sent": 0,
  "last_entry": null,
  "lastname": null,
  "name": "",
  "owner": null,
  "phase_id": 0,
  "postpone_date": null,
  "previous_course": null,
  "previous_orderID": null,
  "source": "",
  "status": "",
  "studentID": null,
  "telephone": "",
  "title": null,
};

const img_gallery = new Array();


function decodeJSON(json) {
  let i = 0;
  for (const item of json) {
    i++;
    let new_user = Object.create(user_details);

    for (let key of Object.keys(item)) {
      new_user[key] = item[key]
    }
    new_user['position_id'] = i;
    users_array.push(new_user);
  }
  console.log(users_array)
  passDetailsToForm(users_array[user_iteration]);
  loadUserImages();
}

function passDetailsToForm(details) {
  console.log(details);
  document.getElementById('name_tag').innerText = details['name'] || "No Name"
  document.getElementById('job_tag').innerText = (details['title']) || "No title"
  document.getElementById('id_number_tag').innerText = "ID: " + details['id'] || "No id"

  document.getElementById('enrolement_status').innerText = details['status'] || "No status"
  document.getElementById('course_amount').innerText = details['initialized_pending_SMS_sent'] || "0"

  document.getElementById('email_details').innerText = "Email: " + details['email'] || "No email"
  document.getElementById('phone_details').innerText = "Tel: " + details['telephone'] || "No number"

  document.getElementById('about_details').innerText = details['enquiry'] || "No enquiry"

  document.getElementById('current_course').innerText = (details['course_title']) || "No title"

  document.getElementById('left_browse').addEventListener("click", browseProfilesDown);
  document.getElementById('right_browse').addEventListener("click", browseProfilesUp);
}

function loadUserImages() {
  for (i = 1; i < 5; i++) {
    img_gallery[i] = "./assets/gallery/img_" + i + ".png"
    console.log(img_gallery[i])
  }

  document.getElementById('gallery_img_lrg').src = img_gallery[1];
  document.getElementById('gallery_img_lrg').classList.remove('hide');
  document.getElementById('gallery_img_med').src = img_gallery[2];
  document.getElementById('gallery_img_med').classList.remove('hide');
  document.getElementById('gallery_img_sml').src = img_gallery[3];
  document.getElementById('gallery_img_sml').classList.remove('hide');
  document.getElementById('gallery_img_sml_2').src = img_gallery[4];
  document.getElementById('gallery_img_sml_2').classList.remove('hide');
}

function browseProfilesDown() {
  if (user_iteration == 0) {
    user_iteration = users_array.length;
  }
  user_iteration--;
  passDetailsToForm(users_array[user_iteration]);
}

function browseProfilesUp() {
  if (user_iteration == users_array.length) {
    user_iteration = 0;
  }
  user_iteration++;
  passDetailsToForm(users_array[user_iteration]);
}


fetch(url)
  .then(
    response => response.json()
  )
  .then((out) => {
    decodeJSON(out);
  })
  .catch(
    error => callback(error, null)
  )

function callback(error) {
  console.log(error)
}
