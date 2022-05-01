// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract coursepaper {

//BEGIN CONSTRUCTOR
    constructor() {

        //Магазины
        shopLists["Beer"] = 0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004;
        structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004] = structShop("Beer", get_hash("2"), 1000, 3, false, "1", "Moscow", 0);
        shopList.push(structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].shopName);
        shopLists["Product"] = 0x49C364fedaD517382ee5A776d3071f11CfDE4C5c;
        structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c] = structShop("Product", get_hash("2"), 1000, 3, false, "2", "Petersburg", 0);
        shopList.push(structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c].shopName);

        //Юзеры
        structUserLogins["Peta"] = 0xAdA67460CF329D12c1ed898710CC8Da5D40d8025;
        structUsers[0xAdA67460CF329D12c1ed898710CC8Da5D40d8025] = structUser("Peta", get_hash("3"), 1000, 2, false);
        userLoginsArray.push("Peta");
        userAddressArray.push(0xAdA67460CF329D12c1ed898710CC8Da5D40d8025);
    }
//END CONSTRUCTOR

//BEGIN REACT FUNCTON
    //BEGIN REACT FUNCTON SHOP
        //Функция получения списка МАГАЗИНОВ
        function get_shop_list() public view returns(string[] memory) {
            return shopList;
        }
        //Функция получения списка продуктов
        function get_product_list() public view returns(string[] memory) {
            return productList;
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
        //Функция получения баланса МАГАЗИНА
        function get_ballance_shop(address adr) public view returns(uint) {
            return(structShops[adr].ballance);
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
        //Функция получения баланса ПОЛЬЗОВАТЕЛЯ
        function get_ballance_user(address adr) public view returns(uint) {
            return(structUsers[adr].ballance);
        }
    //END REACT FUNCTON USER
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
        uint256 ballance;
        uint role;          //1 - гость, 2 - пользователь, 3 - магазин
        bool logged;
        string number;
        string city;
        uint256 rating;
    }
    mapping (address => structShop) public structShops;
    mapping(string => address) public shopLists;
    string[] shopList;
    
    //Структура книга ЖАЛОБ
    struct complaintBook {
        string shop;
        string userName;
        string feedback;
        uint rating;
        string[] comments;
    }
    //mapping(uint => complaintBook) public complaintBooks;
    complaintBook[] complaintBooks;

    //Структура ЮЗЕРА
    struct structUser {
        string userName;
        bytes32 password;
        uint256 ballance;
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
        uint256 id;
    }
    mapping(string => structProduct) public structProducts;
    string [] productList;

    //Структура статуса ПРОДУКТА
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
    //Функция добавления продукта
    uint256 addProductShop_idProduct = 0;
    function addProductShop (string memory title, uint256 price, string memory description) public {
        structProducts[title] = structProduct(msg.sender, description , price, addProductShop_idProduct);
        productList.push(title);
        addProductShop_idProduct++;
    }
    
    //Функция для оставления отзыва
    function leaveFeedback (string memory shop, string memory feedback, uint256 rating) public {
        require(rating <= 10,"error: rating can be from 1 to 10");
        for(uint i = 0; i <= shopList.length; i++) {
            string memory tempShopName = shopList[i];
            if(keccak256(abi.encodePacked(tempShopName)) == keccak256(abi.encodePacked(shop))) {                    
                string[] memory zerroArray;
                complaintBooks.push(complaintBook(shop, structUsers[msg.sender].userName, feedback, rating, zerroArray));
            }
        }
    }

    //Функция принятия покупки
    function acceptPurchase (uint idPurchase, bool confirmation) public payable {
        if (confirmation == true) {
            payable(msg.sender).transfer(structStatusPurchases[idPurchase].price*(10**18));
            structStatusPurchases[idPurchase].status = false;
        } else {
            payable(structStatusPurchases[idPurchase].userLogin).transfer(structStatusPurchases[idPurchase].price*(10**18));
            structStatusPurchases[idPurchase].status = false;
        }
    }

    //Функция принятия возврата
    function acceptReturn(uint idReturn, bool confirmation) public payable {
        if(confirmation == true) {
            payable(structStatusReturns[idReturn].userLogin).transfer(structProducts[structStatusReturns[idReturn].titleProduct].price*(10**18));
            structStatusReturns[idReturn].status = false;
        } else {
            structStatusReturns[idReturn].status = false;
        }
    }

    //Функция принятия возврата товара
    function acceptMarriage(uint idMarriage, bool confirmation) public {
        if(confirmation == true) {
            payable(structStatusMarriages[idMarriage].userLogin).transfer(structProducts[structStatusMarriages[idMarriage].titleProduct].price*(10**18));
            structStatusReturns[idMarriage].status = false;
        } else {
            structStatusReturns[idMarriage].status = false;
        }
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

    //Функция для оставления комментария к отзыву
    function leaveComment (string memory userName, string[] memory comment) public {
        for(uint i = 0; i < complaintBooks.length; i++) {
            string memory tempUserName = complaintBooks[i].userName;
            if(keccak256(abi.encodePacked(tempUserName)) == keccak256(abi.encodePacked(userName))) {                    
                complaintBooks[i].comments = comment;
            }
        }
    }
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
//END SHOP FUNCTION

//BEGIN USER FUNCTION
    //Функция ПОКУПКИ
    function productPurchases (string memory titleProduct) public payable {
        require(msg.value == (structProducts[titleProduct].price*(10**18)), "error: not money");
        structStatusPurchases.push(structStatusPurchase(msg.sender, titleProduct, msg.value, true));
    }
    //Функция оформления ВОЗВРАТА
    function productReturn (string memory titleProduct) public {
        structStatusReturns.push(structStatusReturn(msg.sender, titleProduct, true));
    }
    // //Функция оформления БРАКА
    function productMarriage (string memory titleProduct) public {
        structStatusMarriages.push(structStatusMarriage(msg.sender, titleProduct, true));
    }
    //Функция создания ПОЛЬЗОВАТЕЛЯ
    function create_user(address addr, string memory login, bytes32 password) public {
        require(structUserLogins[login] == address(0), "Error: User already exist");
        structUsers[addr] = structUser(login, password, 1000, 2, false);
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