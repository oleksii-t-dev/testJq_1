$(document).ready(function () {
  let usersDatabase = [
    {
      id: 1,
      username: "alex",
      email: "alex@gmail.com",
      role: "admin",
      created_at: "2024-08-01",
    },
    {
      id: 2,
      username: "tom",
      email: "tom@gmail.com",
      role: "user",
      created_at: "2024-08-03",
    },
    {
      id: 3,
      username: "john",
      email: "john@gmail.com",
      role: "user",
      created_at: "2024-08-05",
    },
    {
      id: 4,
      username: "bill",
      email: "bill@gmail.com",
      role: "admin",
      created_at: "2024-08-07",
    },
    {
      id: 5,
      username: "jack",
      email: "jack@gmail.com",
      role: "user",
      created_at: "2024-08-10",
    },
  ];

  let table = $("#user-table");
  function checkTableData() {
    let hasData = false;
    table.find("tr").each(function () {
      let $row = $(this);
      if ($row.find("td").text().trim() !== "") {
        hasData = true;
        $("#no-data").remove();
        return false;
      }
    });

    if (!hasData) {
      table.after('<p id="no-data">No data available</p>');
    }
  }

  function loadUsers() {
    $("#user-table tbody").empty();

    usersDatabase.forEach(function (user) {
      let row =
        '<tr class="border p-4" data-id="' +
        user.id +
        '">' +
        '<td class="border p-4">' +
        user.username +
        "</td>" +
        '<td class="border p-4">' +
        user.email +
        "</td>" +
        '<td class="border p-4">' +
        user.role +
        "</td>" +
        '<td class="border p-4">' +
        user.created_at +
        "</td>" +
        '<td class="border p-4">' +
        '<button class="edit-btn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit</button>' +
        '<button class="delete-btn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Delete</button>' +
        "</td>" +
        "</tr>";
      $("#user-table tbody").append(row);
    });

    checkTableData();
  }

  loadUsers();

  $("#add-user-btn").on("click", function () {
    $("#user-form").show();
    $("#form-title").text("Add user:");
    $("#user-id").val("");
    $("#user-form-data")[0].reset();
  });

  $("#cancel-form").on("click", function () {
    $("#user-form").hide();
  });

  $("#user-form-data").on("submit", function (e) {
    e.preventDefault();

    let userId = $("#user-id").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let role = $("#role").val();

    const findUser = (user) => {
      return usersDatabase.find((key) => key.username == user);
    };
    const findiD = (userId) => {
      return usersDatabase.find((key) => key.id == userId);
    };

    if (userId === "" && findUser(username)) {
      $("#user-form-data")[0].reset();
      confirm("This user already exists!");
    } else if (userId === "" && !findUser(username)) {
      let newUser = {
        id: usersDatabase.length + 3,
        username: username,
        email: email,
        role: role,
        created_at: new Date().toISOString().split("T")[0],
      };
      usersDatabase.push(newUser);
      loadUsers();
      $("#user-form").hide();
    } else if (findiD(userId) && !findUser(username)) {
      let user = usersDatabase.find((u) => u.id == userId);
      if (user) {
        user.username = username;
        user.email = email;
        user.role = role;
        loadUsers();
        $("#user-form").hide();
      }
    } else if (findUser(username)) {
      $("#username").val("");
      confirm("This user already exists!");
    }
  });

  $("#user-table").on("click", ".edit-btn", function () {
    let row = $(this).closest("tr");
    let userId = row.data("id");
    let user = usersDatabase.find((u) => u.id == userId);

    if (user) {
      $("#user-form").show();
      $("#form-title").text("Edit user:");
      $("#user-id").val(user.id);
      $("#username").val(user.username);
      $("#email").val(user.email);
      $("#role").val(user.role);
    }
  });

  $("#user-table").on("click", ".delete-btn", function () {
    let userId = $(this).closest("tr").data("id");
    let username = $(this).closest("tr").find("td").eq(0).text();

    let confirmDelete = confirm(
      `Are you sure you want to delete the user - ${username}?`
    );

    if (confirmDelete) {
      usersDatabase = usersDatabase.filter(function (user) {
        return user.id != userId;
      });
      loadUsers();
    }
  });

  $("#search").on("input", function () {
    let searchText = $(this).val().toLowerCase();
    $("#user-table tbody tr").filter(function () {
      let username = $(this).find("td").eq(0).text().toLowerCase();
      let email = $(this).find("td").eq(1).text().toLowerCase();
      $(this).toggle(
        username.indexOf(searchText) > -1 || email.indexOf(searchText) > -1
      );
    });
  });
});
