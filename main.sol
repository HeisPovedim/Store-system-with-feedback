// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract coursepaper {

//BEGIN CONSTRUCTOR
    constructor() {

        //Магазины
        shopLists["Beer"] = 0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004;
        structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004] = structShop("Beer", get_hash("2"), 3, false, "1", "Moscow", 0, Products);
        shopList.push(structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].shopName);
        shopLists["Product"] = 0x49C364fedaD517382ee5A776d3071f11CfDE4C5c;
        structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c] = structShop("Product", get_hash("2"), 3, false, "2", "Petersburg", 0, Products);
        shopList.push(structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c].shopName);

        //Юзеры
        structUserLogins["Peta"] = 0xAdA67460CF329D12c1ed898710CC8Da5D40d8025;
        structUsers[0xAdA67460CF329D12c1ed898710CC8Da5D40d8025] = structUser("Peta", get_hash("3"), 2, false);
        userLoginsArray.push("Peta");
        userAddressArray.push(0xAdA67460CF329D12c1ed898710CC8Da5D40d8025);

        //Товары
        structProducts["Vodka"] = structProduct(0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004, "asd", 100*(10**18), addProductShop_idProduct);
        structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].products.push("Vodka");
        addProductShop_idProduct++;

        structProducts["Bannana"] = structProduct(0x49C364fedaD517382ee5A776d3071f11CfDE4C5c, "asd", 100*(10**18), addProductShop_idProduct);
        structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c].products.push("Bannana");
        addProductShop_idProduct++;

        //Отзывы
        complaintBooks[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].push(complaintBook(0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004, 0xAdA67460CF329D12c1ed898710CC8Da5D40d8025, "bad!", 5, "good", true));
        complaintBooks[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].push(complaintBook(0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004, 0xAdA67460CF329D12c1ed898710CC8Da5D40d8025, "very bad!", 2, "very good", true));
        complaintBooks[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].push(complaintBook(0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004, 0xAdA67460CF329D12c1ed898710CC8Da5D40d8025, "cool bad!", 7, "cool good", true));

    }
//END CONSTRUCTOR

//BEGIN GET FUNCTION
    //BEGIN GET FUNCTION SHOP
        //Функция получения списка МАГАЗИНОВ
        function get_shop_list() public view returns(string[] memory) {
            return shopList;
        }
        //Функция получения списка продуктов
        function get_product_list(string memory login) public view returns(string[] memory) {
            address shopAdr = get_address(login);
            return structShops[shopAdr].products;
        }
        //Функция проверка онлайн-статуса МАГАЗИНА
        function check_logged_shop(string memory login) public view returns(bool) {
            return(structShops[shopLists[login]].logged);
        }
        //Функция получения роли для МАГАЗИНА
        function get_role_shop(string memory login) public view returns(uint) {
            return(structShops[shopLists[login]].role);
        }
        //Функция получения города для МАГАЗИНА
        function get_city(string memory login) public view returns(string memory) {
        return(structShops[shopLists[login]].city);
        }
        //Функция получения рейтинга МАГАЗИНА
        function get_story_rating(string memory shopName) public view returns(uint) {
        address shopAdr = get_address(shopName);
        uint rating = 0;
        for(uint i = 0; i < complaintBooks[shopAdr].length; i++) {
            rating += complaintBooks[shopAdr][i].rating;
        }
        rating = rating / complaintBooks[shopAdr].length;
        return rating;
    }
    //END GET FUNCTION SHOP

    //BEGIN GET FUNCTION USER
        //Функция проверка онлайн-статуса ПОЛЬЗОВАТЕЛЯ
        function check_logged_user(string memory login) public view returns(bool) {
            return(structUsers[structUserLogins[login]].logged);
        }
        //Функция получения роли для ПОЛЬЗОВАТЕЛЯ
        function get_role_user(string memory login) public view returns(uint) {
            return(structUsers[structUserLogins[login]].role);
        }
    //END GET FUNCTION USER

    //Функция получения книги жалоб и предложений
    function get_complaintBooks(string memory shop) public view returns(uint) {
        address shopAdr = get_address(shop);
        return complaintBooks[shopAdr].length;
    }
    //Функция получения отзыва по книге жалоб
    function get_complaintBooks_feedback(string memory shop, uint idFeedbach) public view returns(string memory) {
        address shopAdr = get_address(shop);
        return complaintBooks[shopAdr][idFeedbach].feedback;
    }
    //Функция получения адреса того, кто оставил отзыв
    function get_complaintBooks_user(string memory shop, uint idFeedbach) public view returns(address) {
        address shopAdr = get_address(shop);
        return complaintBooks[shopAdr][idFeedbach].user;
    }
    //Функция получения баланса
    function get_balance(address adr) public view returns (uint) {
        uint curBalance = adr.balance;
        return curBalance;
    }
    //Функция получения хэш-пароля
    function get_hash(string memory password) public pure returns(bytes32) {
            return(keccak256(abi.encodePacked(password)));
    }
    //Функция получения адреса по логину
    function get_address(string memory login) public view returns(address) {
        address adr;
        if (structUserLogins[login] != address(0)) {
            adr = structUserLogins[login];
        } else {
            adr = shopLists[login];
        }
        return(adr);
    }
    //Функция получения логина по адресу
    function get_login(address adr) public view returns(string memory) {
        string memory login;
        if (get_hash(structUsers[adr].userName) != get_hash("")) {
            login = structUsers[adr].userName;
        } else {
            login = structShops[adr].shopName;
        }
        return(login);
    }
    //Функция получения списка книги отзывов по адресу
    function get_complaintBooks_adrShop(string memory login) public view returns(complaintBook[] memory) {
        address shopAdr = get_address(login);
        return complaintBooks[shopAdr];
    }
//END GET FUNCTION

//BEGIN STRUCT
    //Структура МАГАЗИНА
    struct structShop {
        string shopName;
        bytes32 password;
        uint role;          //1 - гость, 2 - пользователь, 3 - магазин
        bool logged;
        string number;
        string city;
        uint rating;
        string [] products;
    }
    mapping (address => structShop) public structShops;
    mapping(string => address) public shopLists;
    string[] shopList;
    string [] Products;

    
    //Структура книга ЖАЛОБ
    struct complaintBook {
        address shop;
        address user;
        string feedback;
        uint rating;
        string comment;
        bool status;
    }
    mapping (address => complaintBook[]) public complaintBooks;
    // complaintBook[] public complaintBooks;

    //Структура ЮЗЕРА
    struct structUser {
        string userName;
        bytes32 password;
        uint role;          //1 - гость, 2 - пользователь, 3 - магазин
        bool logged;
    }
    mapping(address => structUser) public structUsers;
    mapping(string => address) public structUserLogins;
    string[] userLoginsArray;
    address[] userAddressArray;

    //Структура ПРОДУКТОВ
    struct structProduct {
        address shop;
        string description;
        uint256 price;
        uint id;
    }
    mapping(string => structProduct) public structProducts;

    //Структура статуса ПОКУПКИ ПРОДУКТА
    struct structStatusPurchase {
        address userLogin;
        string titleProduct;
        uint price;
        bool status;
    }
    structStatusPurchase[] public structStatusPurchases;

    //Структура статуса ВОЗВРАТА
    struct structStatusReturn {
        address userLogin;
        string titleProduct;
        bool status;
    }
    structStatusReturn[] public structStatusReturns;

    //Структура статуса РЕГИСТРАЦИИ БРАКА
    struct structStatusMarriage {
        address userLogin;
        string titleProduct;
        bool status;
    }
    structStatusMarriage[] public structStatusMarriages;
//END STRUCT

//BEGIN SHOP FUNCTION
//Функция онлайн-статуса МАГАЗИНА - true
    function login_shop(string memory login, bytes32 password) public {
        require(structShops[shopLists[login]].logged == false, "Error: You are already logged");
        require(shopLists[login] != address(0), "Error: User doesn't exist");
        require(structShops[shopLists[login]].password == password, "Error: Invalid password");
        structShops[shopLists[login]].logged = true;
    }
    //Функция онлайн-статуса МАГАЗИНА - false
    function login_out_shop(string memory login) public {
        structShops[shopLists[login]].logged = false;
    }
    //Функция для оформления отзыва
    function leaveFeedback (string memory shop, string memory feedback, uint rating) public {
        require(rating <= 10,"error: rating can be from 1 to 10");
        address shopAdr = get_address(shop);
        bool yes = false;
        for(uint i = 0; i < shopList.length; i++) {
            string memory tempShopName = shopList[i];
            if(keccak256(abi.encodePacked(tempShopName)) == keccak256(abi.encodePacked(shop))) {                    
                complaintBooks[shopAdr].push(complaintBook(shopAdr, msg.sender, feedback, rating, "No review", true));
                yes = true;
            }
        }
        require(yes == true, "error: shop name not found!");
    }
    //Функция для оставления комментария к отзыву - МАГАЗИН
    function leaveComment (string memory comment, uint idFeedbach) public {
        require(msg.sender == complaintBooks[msg.sender][idFeedbach].shop, "error: your not msg.sender");
        require(complaintBooks[msg.sender][idFeedbach].status == true, "error: feedback is closed");
        complaintBooks[msg.sender][idFeedbach].comment = comment;
        complaintBooks[msg.sender][idFeedbach].status = false;
    }
    //Функция добавления продукта
    uint256 addProductShop_idProduct = 0;
    function addProductShop (string memory title, uint256 price, string memory description) public {
        structProducts[title] = structProduct(msg.sender, description , price*(10**18), addProductShop_idProduct);
        structShops[msg.sender].products.push(title);
        addProductShop_idProduct++;
    }
    //Функция принятия ПОКУПКИ
    function acceptPurchase (uint idPurchase, bool confirmation) public payable {
        require(msg.sender == structProducts[structStatusPurchases[idPurchase].titleProduct].shop, "error: this is not your product");
        if (confirmation == true) {
            payable(msg.sender).transfer(structStatusPurchases[idPurchase].price);
            structStatusPurchases[idPurchase].status = false;
        } else if (confirmation == false) {
            payable(structStatusPurchases[idPurchase].userLogin).transfer(structStatusPurchases[idPurchase].price);
            structStatusPurchases[idPurchase].status = false;
        }
    }

    //Функция принятия ВОЗВРАТА
    function acceptReturn(uint idReturn, bool confirmation) public payable {
        require(msg.sender == structProducts[structStatusReturns[idReturn].titleProduct].shop, "error: this is not your product");
        if(confirmation == true) {
            payable(structStatusReturns[idReturn].userLogin).transfer(msg.value);
            structStatusReturns[idReturn].status = false;
        } else if(confirmation == false) {
            structStatusReturns[idReturn].status = false;
        }
    }

    //Функция принятия БРАКА
    function acceptMarriage(uint idMarriage, bool confirmation) public payable {
        require(msg.sender == structProducts[structStatusMarriages[idMarriage].titleProduct].shop, "error: this is not your product");
        if(confirmation == true) {
            payable(structStatusMarriages[idMarriage].userLogin).transfer(msg.value);
            structStatusMarriages[idMarriage].status = false;
        } else if(confirmation == false) {
            structStatusMarriages[idMarriage].status = false;
        }
    }
//END SHOP FUNCTION

//BEGIN USER FUNCTION
    //Функция ПОКУПКИ
    function productPurchases(string memory titleProduct) public payable {
        require(msg.value == (structProducts[titleProduct].price), "error: not money");
        structStatusPurchases.push(structStatusPurchase(msg.sender, titleProduct, msg.value, true));
    }
    //Фукнция отказа от ПОКУПКИ
    function refusalToPurchase (uint idPurchase) public payable {
        require(msg.sender == structStatusPurchases[idPurchase].userLogin, "error: yor not msg.sender");
        payable(msg.sender).transfer(structStatusPurchases[idPurchase].price);
        structStatusPurchases[idPurchase].status = false;
    }
    //Функция оформления ВОЗВРАТА
    function productReturn(string memory titleProduct) public {
        bool tempRequire;
        address shopAdr = structProducts[titleProduct].shop;
        for(uint i = 0; i < structShops[shopAdr].products.length; i++) {
            string memory tempProductName = structShops[shopAdr].products[i];
            if(keccak256(abi.encodePacked(tempProductName)) == keccak256(abi.encodePacked(titleProduct))) {                    
                structStatusReturns.push(structStatusReturn(msg.sender, titleProduct, true));
                tempRequire = true;
            }
        }
        require(tempRequire == true, "error: there is no such product");
    }
    //Функция оформления БРАКА
    function productMarriage(string memory titleProduct) public {
        bool tempRequire;
        address shopAdr = structProducts[titleProduct].shop;
        for(uint i = 0; i < structShops[shopAdr].products.length; i++) {
            string memory tempProductName = structShops[shopAdr].products[i];
            if(keccak256(abi.encodePacked(tempProductName)) == keccak256(abi.encodePacked(titleProduct))) {                    
                structStatusMarriages.push(structStatusMarriage(msg.sender, titleProduct, true));
                tempRequire = true;
            }
        }
        require(tempRequire == true, "error: there is no such product");
    }
    //Функция создания ПОЛЬЗОВАТЕЛЯ
    function create_user(address addr, string memory login, bytes32 password) public {
        require(structUserLogins[login] == address(0), "Error: User already exist");
        structUsers[addr] = structUser(login, password, 2, false);
        structUserLogins[login] = addr;
        userAddressArray.push(addr);
    }
    //Функция онлайн-статуса ПОЛЬЗОВАТЕЛЯ - true
    function login_user(string memory login, bytes32 password) public {
        require(structUsers[structUserLogins[login]].logged == false, "Error: You are already logged");
        require(structUserLogins[login] != address(0), "Error: User doesn't exist");
        require(structUsers[structUserLogins[login]].password == password, "Error: Invalid password");
        structUsers[structUserLogins[login]].logged = true;
    }
    //Функция онлайн-статуса ПОЛЬЗОВАТЕЛЯ - false
    function login_out_user(string memory login) public {
        structUsers[structUserLogins[login]].logged = false;
    }
//END USER FUNCTION
}