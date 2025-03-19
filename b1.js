let cart = []; // Giỏ hàng
let products = [
  {
    id: 1,
    name: "mèn mén",
    price: 20000,
    quantity: 20,
    category: "món ăn dân tộc mông",
  },
  {
    id: 2,
    name: "mứt",
    price: 80000,
    quantity: 21,
    category: "món ăn dân tộc kinh",
  },
  {
    id: 3,
    name: "cơm lam",
    price: 40000,
    quantity: 15,
    category: "món ăn dân tộc mông",
  },
  {
    id: 4,
    name: "bánh đậu xanh",
    price: 60000,
    quantity: 30,
    category: "món ăn dân tộc kinh",
  },
];

let menu = `
    1. Hiển thị các sản phẩm theo tên danh mục.
    2. Chọn sản phẩm để mua bằng cách nhập id sản phẩm.
    3. Sắp xếp các sản phẩm trong cửa hàng theo giá:
    4.. Tính số tiền thanh toán trong giỏ hàng.
    5. Thoát.
`;

let choice;
while (choice !== 5) {
  choice = +prompt(menu);
  switch (choice) {
    case 1:
      displayProducts();
      break;
    case 2:
      buy();
    break;
    case 3:
      sapxep();
      break;
    case 4:
      tinhtien();
      break;
      case 5:
        console.log("Thoát");
        break;
      default:
        console.log("Lừa chọn không hợp lệ");
  }
}

function displayProducts() {
  let input = prompt(
    `Lựa chọn danh mục
     a: món ăn dân tộc mông 
     b: món ăn dân tộc kinh`
  );

  let category = "";
  if (input === "a") {
    category = "món ăn dân tộc mông";
  } else if (input === "b") {
    category = "món ăn dân tộc kinh";
  } else {
    console.log("Lựa chọn danh mục không hợp lệ");
    return;
  }

  for (let i = 0; i < products.length; i++) {
    if (products[i].category === category) {
      console.log("Id: ", products[i].id);
      console.log("Name: ", products[i].name);
      console.log("Price: ", products[i].price);
      console.log("Quantity: ", products[i].quantity);
      console.log("Category: ", products[i].category);
    }
  }
}


function buy(){
    let idBuy = +prompt("Nhập Id món ăn");
      let checkId = -1;
      for (let i in products) {
        if (idBuy === products[i].id) {
          console.log("Sản phẩm có trong cửa hàng");
          checkId = i;
          break;
        }
      }
      if (checkId === -1) {
        console.log("Sản phẩm không có trong cửa hàng");
      } else {
        let purchaseQuantity = +prompt("Nhập số lượng muốn mua");
        if (purchaseQuantity <= 0) {
          console.log("Số lượng mua không hợp lệ");
        } else if (purchaseQuantity > products[checkId].quantity) {
          console.log("Số lượng hàng không đủ");
        } else {
          products[checkId].quantity =
            products[checkId].quantity - purchaseQuantity;
          cart.push({
            name: products[checkId].name,
            price: products[checkId].price,
            category: products[checkId].category,
            quantity: purchaseQuantity,
          });
          console.log("Mua hàng thành công!");
          console.log(
            `Bạn đã mua ${purchaseQuantity} ${products[checkId].name}`
          );
          console.log(
            `Số lượng còn lại trong kho: ${products[checkId].quantity}`
          );
        }
      }
      console.log("Giỏ hàng của bạn gồm");
      console.table(cart);
}

function sapxep(){
    let luachon = prompt(
        `Nhập lựa chọn sắp xếp theo giá:
            a. Tăng dần
            b. Giảm dần`
      );
      if (luachon === "a") {
        for (let i = 0; i < products.length - 1; i++) {
          for (let j = 0; j < products.length - 1 - i; j++) {
            if (products[j].price > products[j + 1].price) {
              let temp = products[j];
              products[j] = products[j + 1];
              products[j + 1] = temp;
            }
          }
        }
        console.log("Sắp xếp tăng dần theo giá:");
      } else if (luachon === "b") {
        for (let i = 0; i < products.length - 1; i++) {
          for (let j = 0; j < products.length - 1 - i; j++) {
            if (products[j].price < products[j + 1].price) {
              let temp = products[j];
              products[j] = products[j + 1];
              products[j + 1] = temp;
            }
          }
        }
        console.log("Sắp xếp giảm dần theo giá:");
      } else {
        console.log("Lựa chọn không hợp lệ.");
        return;
      }
      console.table(products);
}

function tinhtien(){
    let sum = 0;
      for (let i = 0; i < cart.length; i++) {
        sum = sum + cart[i].price * cart[i].quantity;
      }
    console.log("Tổng số tiền trong giỏ hàng là: " + sum.toLocaleString('vi-VN') + ' VND');
}