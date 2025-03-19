let cart = [];
let books = [
  {
    id: 1,
    name: "Cẩm Nang Phát Triển Bản Thân",
    price: 150000,
    quantity: 20,
    category: "Phát triển bản thân",
  },
  {
    id: 2,
    name: "Sức Mạnh Của Thói Quen",
    price: 180000,
    quantity: 15,
    category: "Phát triển bản thân",
  },
  {
    id: 3,
    name: "Kinh Tế Học Dễ Hiểu",
    price: 200000,
    quantity: 10,
    category: "Kinh tế",
  },
  {
    id: 4,
    name: "Tư Duy Tinh Gọn",
    price: 220000,
    quantity: 18,
    category: "Kinh tế",
  },
];

let menu = `
    1. Hiển thị danh sách sách theo thể loại (Người dùng chọn thể loại để xem sách trong danh mục đó).
    2. Thêm sách mới vào kho
    3. Tìm kiếm sách theo tên hoặc id.
    4. Mua sách (Nhập id sách cần mua và số lượng, cập nhật lại kho).
    5. Sắp xếp sách theo giá:
    6. Tính tổng số lượng sách đã mua và in ra tổng tiền trong giỏ hàng
    7. Hiển thị tổng số lượng sách trong kho.
    8. Thoát chương trình.
`;

let choice;

while (choice !== 8) {
  choice = +prompt(menu);
  switch (choice) {
    case 1:
      displayBooksByCategory();
      break;
    case 2:
      addNewBook();
      break;
    case 3:
      searchBookById();
      break;
    case 4:
      purchaseBook();
      break;
    case 5:
      sortBooksByPrice();
      break;
    case 6:
      calculateTotalCartValue();
      break;
    case 7:
      displayTotalBooksInStock();
      break;
    case 8:
      console.log("Thoát");
      break;
    default:
      console.log("Lựa chọn không hợp lệ");
      break;
  }
}

function displayBooksByCategory() {
  let input = prompt(
    `Lựa chọn thể loại sách
       a: Phát triển bản thân
       b: Kinh tế`
  );

  let category = "";
  if (input === "a") {
    category = "Phát triển bản thân";
  } else if (input === "b") {
    category = "Kinh tế";
  } else {
    console.log("Lựa chọn thể loại không hợp lệ");
    return;
  }

  for (let i = 0; i < books.length; i++) {
    if (books[i].category === category) {
      console.log("Id: ", books[i].id);
      console.log("Name: ", books[i].name);
      console.log("Price: ", books[i].price);
      console.log("Quantity: ", books[i].quantity);
      console.log("Category: ", books[i].category);
    }
  }
}

function addNewBook() {
  let name = prompt("Nhập tên sách muốn thêm");
  let price = +prompt("Nhập giá sách muốn thêm");
  let quantity = +prompt("Nhập số lượng sách muốn thêm");
  let categorys = prompt("Nhập thể loại sách muốn thêm");
  let newBooks = {
    id: books.length + 1,
    name: name,
    price: price,
    quantity: quantity,
    category: categorys,
  };
  books.push(newBooks);
  console.log("Thêm sách thành công");
}

function searchBookById() {
  let searchId = +prompt("Nhập Id sách muốn tìm kiếm");
  let checkId = -1;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === searchId) {
      checkId = i;
      break;
    }
  }
  if (checkId === -1) {
    console.log("Không tìm thấy sách với Id: ", searchId);
  } else {
    console.log("Đã tìm thấy sách");
    console.table(books[checkId]);
  }
}

function purchaseBook() {
  let idBuy = +prompt("Nhập id sách muốn mua");
  let testId = -1;
  for (let i in books) {
    if (books[i].id === idBuy) {
      testId = i;
      break;
    }
  }
  if (testId === -1) {
    console.log("Không tìm thấy sách với id: ", idBuy);
  } else {
    let purchaseQuantity = +prompt("Nhập số lượng muốn mua");
    if (purchaseQuantity <= 0) {
      console.log("Số lượng sách không hợp lệ");
    } else if (
      purchaseQuantity > books[testId].quantity ||
      books[testId].quantity <= 0
    ) {
      console.log("Số lượng sách không đủ");
    } else {
      books[testId].quantity = books[testId].quantity - purchaseQuantity;
      cart.push({
        name: books[testId].name,
        price: books[testId].price,
        quantity: purchaseQuantity,
        category: books[testId].category,
      });
    }
    console.log("Mua hàng thành công!");
    console.log(`Bạn đã mua ${purchaseQuantity} ${books[testId].name}`);
    console.log(`Số lượng còn lại trong kho: ${books[testId].quantity}`);
  }
  console.log("Giỏ hàng của bạn bao gồm");
  console.table(cart);
}

function sortBooksByPrice() {
  let luachon = prompt(`
        Nhập lựa chọn sắp xếp theo giá:
            a. Tăng dần
            b. Giảm dần
      `);
  if (luachon === "a") {
    for (let i = 0; i < books.length - 1; i++) {
      for (let j = 0; j < books.length - 1 - i; j++) {
        if (books[j].price > books[j + 1].price) {
          let temp = books[j];
          books[j] = books[j + 1];
          books[j + 1] = temp;
        }
      }
    }
    console.log("Sắp xếp tăng dần theo giá:");
  } else if (luachon === "b") {
    for (let i = 0; i < books.length - 1; i++) {
      for (let j = 0; j < books.length - 1 - i; j++) {
        if (books[j].price < books[j + 1].price) {
          let temp = books[j];
          books[j] = books[j + 1];
          books[j + 1] = temp;
        }
      }
    }
    console.log("Sắp xếp giảm dần theo giá:");
  } else {
    console.log("Lựa chọn không hợp lệ.");
    return;
  }
  console.table(books);
  return;
}

function calculateTotalCartValue() {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].price * cart[i].quantity;
  }
  console.log(
    "Tổng số tiền trong giỏ hàng là: " + sum.toLocaleString("vi-VN") + " VND"
  );
}

function displayTotalBooksInStock() {
  let sumBooks = 0;
  for (let i = 0; i < books.length; i++) {
    sumBooks += books[i].quantity;
  }
  console.log("Tổng số lượng sách trong kho là: ", sumBooks);
}
