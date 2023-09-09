const table = document.getElementById("table-container");
const Axios = axios.create({
  baseURL: "http://localhost:3000",
});
const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
let rowData = [];

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = {
    name: event.target.name.value,
    email: event.target.email.value,
    phone: event.target.phone_no.value,
  };
  Axios.post("/api/", formData)
    .then(() => {
      Swal.fire("Appointment Booked!", "", "success");
      showData();
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

const showData = () => {
  let html = "";
  Axios.get("/api/")
    .then((result) => {
      const tableBody = document.getElementById("table-body");
      const data = result.data.Users;
      rowData = data;
      if (data.length > 0) {
        data.forEach((row, index) => {
          html += `<tr>
          <th scope="row">${index + 1}</th>
          <td>${row.name}</td>
          <td>${row.email}</td>
          <td>${row.phone}</td>
          <td class="d-flex align-items-center gap-2">
             <button class="btn btn-sm btn-primary" onclick="handleEdit('${
               row.id
             }')"><i class='bx bx-edit'></i></button>
           <button class="btn btn-sm btn-danger" onclick="handleDelete('${
             row.id
           }')"><i class='bx bx-trash'></i></button>
          </td>
        </tr>
        `;
        });
        tableBody.innerHTML = html;
      }
      const tableContainer = document.getElementById("table-container");
      if (data.length > 0) {
        tableContainer.classList.remove("d-none"); // Show table
      } else {
        tableContainer.classList.add("d-none"); // Hide table
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", showData);

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This Appointment will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#35A29F",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`/api/${id}`)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Deletion Successful!",
          });
          showData();
        })
        .catch((err) => {
          Swal.fire("Something went Wrong!", "", "error");
        });
    }
  });
};

const handleEdit = (id) => {
  $("#editModal").modal("show");
  const row = rowData.find((item) => item.id == id);
  document.getElementById("Name").value = row.name;
  document.getElementById("Email").value = row.email;
  document.getElementById("phone_no").value = row.phone;
  document.getElementById("itemId").value = row.id;
};

const editItem = () => {
  const data = {
    name: document.getElementById("Name").value,
    email: document.getElementById("Email").value,
    phone: document.getElementById("phone_no").value,
  };
  const endPointId = document.getElementById("itemId").value;
  Axios.put(`/api/${endPointId}`, data)
    .then(() => {
      $("#editModal").modal("hide"); // Hide the modal

      Toast.fire({
        icon: "success",
        title: "Updation Successful!",
      });

      showData(); // Refresh the data
    })
    .catch(() => {
      Swal.fire("Something went Wrong!", "", "error");
    });
};
