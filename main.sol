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
        structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].Products.push("Vodka");
        addProductShop_idProduct++;

        structProducts["Bannana"] = structProduct(0x49C364fedaD517382ee5A776d3071f11CfDE4C5c, "asd", 100*(10**18), addProductShop_idProduct);
        structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c].Products.push("Bannana");
        addProductShop_idProduct++;
        //Отзывы
        string[] memory zerroArray;
        complaintBooks.push(complaintBook(0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004, 0xAdA67460CF329D12c1ed898710CC8Da5D40d8025, "Pooooop!", 5, zerroArray));

    }
//END CONSTRUCTOR

//BEGIN REACT FUNCTON
    //BEGIN REACT FUNCTON SHOP
        //Функция получения списка МАГАЗИНОВ
        function get_shop_list() public view returns(string[] memory) {
            return shopList;
        }
        //Функция получения списка продуктов
        function get_product_list(string memory login) public view returns(string[] memory) {
            address shopAdr = get_address(login);
            return structShops[shopAdr].Products;
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
    //END REACT FUNCTON SHOP

    //BEGIN REACT FUNCTON USER
        //Функция проверка онлайн-статуса ПОЛЬЗОВАТЕЛЯ
        function check_logged_user(string memory login) public view returns(bool) {
            return(structUsers[structUserLogins[login]].logged);
        }
        //Функция получения роли для ПОЛЬЗОВАТЕЛЯ
        function get_role_user(string memory login) public view returns(uint) {
            return(structUsers[structUserLogins[login]].role);
        }
    //END REACT FUNCTON USER
    function get_complaintBooks(address shopAdr) public view returns(uint[] memory) {
        // for(uint i = 0; i < complaintBooks.length; i++) {
        //     if(shopAdr == complaintBooks[i].shop) {
                // return complaintBooks;
        //     }
        // }
    }
    //Получение баланса
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
//END REACT FUNCTON

//BEGIN STRUCT
    //Структура МАГАЗИНА
    struct structShop {
        string shopName;
        bytes32 password;
        uint role;          //1 - гость, 2 - пользователь, 3 - магазин
        bool logged;
        string number;
        string city;
        uint256 rating;
        string [] Products;
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
        string[] comments;
    }
    //mapping(uint => complaintBook) public complaintBooks;
    complaintBook[] public complaintBooks;

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
    //Функция получения рейтинга МАГАЗИНА
    function getStoryRating(string memory shopName) public view returns(uint) {
        uint totalAverageValue = 0;
        uint countArrayRating = 0;
        for(uint i = 0; i < shopList.length; i++) {
            string memory tempShopName = shopList[i];
            if(keccak256(abi.encodePacked(tempShopName)) == keccak256(abi.encodePacked(shopName))) {                    
                for (i = 0; i <= complaintBooks.length; i++) {
                    if(keccak256(abi.encodePacked(shopName)) == keccak256(abi.encodePacked(complaintBooks[i].shop))) {
                        countArrayRating += complaintBooks[i].rating;
                        totalAverageValue;
                    }
                }
            }
        }
        countArrayRating += countArrayRating / totalAverageValue;
        return countArrayRating;
    }
    //Функция для оформления отзыва
    function leaveFeedback (string memory shop, string memory feedback, uint rating) public {
        require(rating <= 10,"error: rating can be from 1 to 10");
        bool yes = false;
        for(uint i = 0; i < shopList.length; i++) {
            string memory tempShopName = shopList[i];
            address tempShopAdr = get_address(tempShopName);
            if(keccak256(abi.encodePacked(tempShopName)) == keccak256(abi.encodePacked(shop))) {                    
                string[] memory zerroArray;
                complaintBooks.push(complaintBook(tempShopAdr, msg.sender, feedback, rating, zerroArray));
                yes = true;
            }
        }
        require(yes == true, "error: shop name not!");
    }
    //Функция для оставления комментария к отзыву
    function leaveComment (string[] memory comment) public {
        for(uint i = 0; i < complaintBooks.length; i++) {
            address tempUserAdr = complaintBooks[i].user;
            if(keccak256(abi.encodePacked(tempUserAdr)) == keccak256(abi.encodePacked(msg.sender))) {                    
                complaintBooks[i].comments = comment;
            }
        }
    }
    //Функция добавления продукта
    uint256 addProductShop_idProduct = 0;
    function addProductShop (string memory title, uint256 price, string memory description) public {
        structProducts[title] = structProduct(msg.sender, description , price*(10**18), addProductShop_idProduct);
        structShops[msg.sender].Products.push(title);
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
    //Фукнция отказа отказа от ПОКУПКИ
    function refusalToPurchase (uint idPurchase) public payable {
        require(msg.sender == structStatusPurchases[idPurchase].userLogin, "error: yor not msg.sender");
        payable(msg.sender).transfer(structStatusPurchases[idPurchase].price);
        structStatusPurchases[idPurchase].status = false;
    }
    //Функция оформления ВОЗВРАТА
    function productReturn(string memory titleProduct) public {
        bool tempRequire;
        address shopAdr = structProducts[titleProduct].shop;
        for(uint i = 0; i < structShops[shopAdr].Products.length; i++) {
            string memory tempProductName = structShops[shopAdr].Products[i];
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
        for(uint i = 0; i < structShops[shopAdr].Products.length; i++) {
            string memory tempProductName = structShops[shopAdr].Products[i];
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