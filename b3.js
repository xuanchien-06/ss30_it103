let cart = [];
let stores = [
    {
        id: 1,
        name: "Samsung Galaxy S23",
        price: 20000,
        quantity: 10,
        company: "Samsung"
    },
    {
        id: 2,
        name: "Samsung Galaxy A54",
        price: 15000,
        quantity: 15,
        company: "Samsung"
    },
    {
        id: 3,
        name: "iPhone 14 Pro",
        price: 35000,
        quantity: 5,
        company: "Apple"
    },
    {
        id: 4,
        name: "iPhone 13",
        price: 28000,
        quantity: 8,
        company: "Apple"
    }
];

let menu =`
    1. Hiển thị danh sách điện thoại theo hãng (Ví dụ: Samsung, Apple, Xiaomi…)
    2. Thêm điện thoại mới vào cửa hàng (Nhập thông tin: id, tên điện thoại, giá, số lượng, hãng)
    3. Tìm kiếm điện thoại theo tên hoặc id
    4. Mua điện thoại (Nhập id điện thoại cần mua và số lượng, cập nhật lại cửa hàng)
    5. Thanh toán tất cả điện thoại trong giỏ hàng (Thông báo thanh toán thành công, và xóa toàn bộ giỏ hàng)
    6. Sắp xếp điện thoại theo giá:
    a. Tăng dần
    b. Giảm dần
    7. Hiển thị tổng số tiền của các điện thoại trong kho
    8. Hiển thị tổng số lượng điện thoại theo từng hàng (VD: samsung - 5,iphone - 3,...)
    9. Thoát chương trình
`;

let choice;
while(choice !== 9){
    choice = +prompt(menu);
    switch(choice){
        case 1:
            displayStore();
            break;

        case 2:
            addNewStore();
            break;

        case 3:
            searchPhoneById();
            break;

        case 4:
            purchasePhone();
            break;

        case 9:
            console.log("Thoát");
            break;

        default:
            console.log("Lựa chọn không hợp lệ");
            break;
    }
}

function displayStore() {
    let input = prompt(
        `Lựa chọn thể loại điện thoại
         a: Samsung
         b: Apple`
    );

    let company = "";
    if (input === "a") {
        company = "Samsung";
    } else if (input === "b") {
        company = "Apple";
    } else {
        console.log("Lựa chọn thể loại không hợp lệ");
        return;
    }

    for (let i = 0; i < stores.length; i++) {
        if (stores[i].company === company) {
            console.log("Id: ", stores[i].id);
            console.log("Name: ", stores[i].name);
            console.log("Price: ", stores[i].price);
            console.log("Quantity: ", stores[i].quantity);
            console.log("Company: ", stores[i].company);
        }
    }
}

function addNewStore() {
    let name = prompt("Nhập tên điện thoại muốn thêm");
    let price = +prompt("Nhập giá điện thoại muốn thêm");
    let quantity = +prompt("Nhập số lượng điện thoại muốn thêm");
    let company = prompt("Nhập hãng điện thoại muốn thêm");

    let newStore = {
        id: stores.length + 1,
        name: name,
        price: price,
        quantity: quantity,
        company: company,
    };

    stores.push(newStore);
    console.log("Thêm điện thoại thành công");
}

function searchPhoneById() {
    let searchId = +prompt("Nhập Id điện thoại muốn tìm kiếm");
    let checkId = -1;
    for (let i = 0; i < stores.length; i++) {
        if (stores[i].id === searchId) {
            checkId = i;
            break;
        }
    }
    if (checkId === -1) {
        console.log("Không tìm thấy điện thoại với Id: ", searchId);
    } else {
        console.log("Đã tìm thấy điện thoại");
        console.table(stores[checkId]);
    }
}

function purchasePhone() {
    let idBuy = +prompt("Nhập id điện thoại muốn mua");
    let testId = -1;
    for (let i in stores) {
        if (stores[i].id === idBuy) {
            testId = i;
            break;
        }
    }
    if (testId === -1) {
        console.log("Không tìm thấy điện thoại với id: ", idBuy);
    } else {
        let purchaseQuantity = +prompt("Nhập số lượng muốn mua");
        if (purchaseQuantity <= 0) {
            console.log("Số lượng điện thoại không hợp lệ");
        } else if (
            purchaseQuantity > stores[testId].quantity ||
            stores[testId].quantity <= 0
        ) {
            console.log("Số lượng điện thoại không đủ");
        } else {
            stores[testId].quantity = stores[testId].quantity - purchaseQuantity;
            cart.push({
                name: stores[testId].name,
                price: stores[testId].price,
                quantity: purchaseQuantity,
                company: stores[testId].company,
            });
            console.log("Mua điện thoại thành công!");
            console.log(`Bạn đã mua ${purchaseQuantity} ${stores[testId].name}`);
            console.log(`Số lượng còn lại trong kho: ${stores[testId].quantity}`);
        }
    }
    console.log("Giỏ hàng của bạn bao gồm:");
    console.table(cart);
}
